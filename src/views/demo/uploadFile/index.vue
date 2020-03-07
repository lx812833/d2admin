<template>
  <d2-container better-scroll>
    <template slot="header">大文件上传</template>
    <div class="input-file">
      <input type="file" :disabled="status !== Status.wait" @change="handleFileChange" />
      <el-button @click="handleUpload" :disabled="uploadDisabled">上传</el-button>
      <el-button @click="handleResume" v-if="status === Status.pause">恢复</el-button>
      <el-button v-else :disabled="status !== Status.uploading || !container.hash" @click="handlePause">暂停</el-button>
    </div>
    <div>
      <div>计算文件 hash</div>
      <el-progress :percentage="hashPercentage"></el-progress>
      <div>总进度</div>
      <el-progress :percentage="fakeUploadPercentage"></el-progress>
    </div>
    <el-table :data="fileData">
      <el-table-column prop="hash" label="切片hash" align="center"></el-table-column>
      <el-table-column label="大小(KB)" align="center" width="120">
        <template v-slot="{ row }">{{ row.size | transformByte }}</template>
      </el-table-column>
      <el-table-column label="进度" align="center">
        <template v-slot="{ row }">
          <el-progress :percentage="row.percentage" color="#909399"></el-progress>
        </template>
      </el-table-column>
    </el-table>
  </d2-container> 
</template> 

<script>
import { verifyHash, chunkFile } from "@api/file";

const Status = {
  wait: "wait",
  pause: "pause",
  uploading: "uploading"
};
const SIZE = 1 * 1024 * 1024; // 1M
const LENGTH = 10; // 切片数量

export default {
  name: "uploadFile",
  data() {
    return {
      Status,
      container: {
        file: null,
        hash: "",
        worker: null
      },
      hashPercentage: 0,
      fileData: [],
      requestList: [],
      status: Status.wait,
      // 当暂停时会取消 xhr 导致进度条后退
      // 为了避免这种情况，需要定义一个假的进度条
      fakeUploadPercentage: 0
    };
  },
  filters: {
    transformByte(val) {
      return Number((val / 1024).toFixed(0));
    }
  },
  computed: {
    uploadDisabled() {
      return (
        !this.container.file ||
        [Status.pause, Status.uploading].includes(this.status)
      );
    },
    uploadPercentage() {
      if (!this.container.file || !this.fileData.length) return 0;
      const loaded = this.fileData
        .map(item => item.size * item.percentage)
        .reduce((acc, cur) => acc + cur);
      return parseInt((loaded / this.container.file.size).toFixed(2));
    }
  },
  watch: {
    uploadPercentage(now) {
      if (now > this.fakeUploadPercentage) {
        this.fakeUploadPercentage = now;
      }
    }
  },
  methods: {
    // 暂停
    handlePause() {
      this.status = Status.pause;
      this.resetData();
    },
    resetData() {
      this.requestList.forEach(xhr => xhr ? xhr.abort() : xhr.send());
      this.requestList = [];
      if (this.container.worker) {
        this.container.worker.onmessage = null;
      }
    },
    // 恢复上传
    async handleResume() {
      this.status = Status.uploading;
      const { uploadedList } = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      );
      await this.uploadChunks(uploadedList);
    },
    // 选择文件监听
    handleFileChange(e) {
      const [file] = e.target.files;
      if (!file) return;
      this.resetData();
      Object.assign(this.$data, this.$options.data());
      this.container.file = file;
    },

    // 上传
    async handleUpload(e) {
      if (!this.container.file) return;
      this.status = Status.uploading;
      const fileChunkList = this.createFileChunk(this.container.file);
      // 计算hash
      this.container.hash = await this.calculateHash(fileChunkList);
      // 上传验证（文件内容不变，其hash一致，验证是否已上传，避免上传多次）
      const { shouldUpload, uploadedList } = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      );

      if (!shouldUpload) {
        this.$message.success("秒传：已上传成功");
        this.status = Status.wait;
        return;
      }
      this.fileData = fileChunkList.map(({ file }, index) => ({
        fileHash: this.container.hash, // 文件hash
        index,
        hash: this.container.hash + "-" + index, // 用于排序，追踪
        chunk: file,
        size: file.size,
        percentage: uploadedList.includes(index) ? 100 : 0 // 当前切片是否已上传
      }));

      await this.uploadChunks(uploadedList); // 上传切片
    },
    createFileChunk(file, size = SIZE) {
      const fileChunkList = [];
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({
          file: file.slice(cur, cur + size)
        });
        cur += size;
      }
      return fileChunkList;
    },
    /**
     * vue 实现上传文件的细节
     *    无论是前端还是后端，在进行传输文件，特别是大文件时，都有可能发生丢失文件的情况。例如网络、服务器超时等，
     * 那如何避免丢失呢？
     *
     *    通过使用hash来传递：文件名并不是唯一的，不同文件名的文件其内容是一样的。
     * 针对文件内容进行前后端hash计算，当前端传递过去的hash与后端计算来的hash一致时，则不存在丢失情况；
     * 当不一致时，则丢失，重新上传。
     */
    async calculateHash(fileChunkList) {
      return new Promise((resolve, reject) => {
        // Web Worker: 允许主线程创建 Worker 线程，将一些任务分配给后者运行，优化前端性能
        this.container.worker = new Worker("hash.js");
        // 主线程调用worker.postMessage()方法，向 Worker 发消息
        this.container.worker.postMessage({ fileChunkList });
        // 主线程通过worker.onmessage指定监听函数，接收子线程发回来的消息。
        this.container.worker.onmessage = e => {
          console.log("worker", e.data);
          const { percentage, hash } = e.data;
          // 进度百分比
          this.hashPercentage = percentage;
          if (hash) {
            resolve(hash);
          }
        };
      });
    },

    // 根据 hash 验证文件是否曾经已经被上传过
    // 没有才进行上传
    verifyUpload(fileName, fileHash) {
      return new Promise((resolve, reject) => {
        let param = {
          fileName,
          fileHash
        };
        verifyHash(param).then(res => {
          resolve(res);
        });
      });
    },
    // 封装XML请求
    request({
      url,
      method = "post",
      data,
      headers = {},
      onProgress = e => e,
      requestList
    }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = onProgress;
        xhr.open(method, url);
        Object.keys(headers).forEach(key =>
          xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onload = e => {
          // 将请求成功的 xhr 从列表中删除
          if (requestList) {
            const xhrIndex = requestList.findIndex(item => item === xhr);
            requestList.splice(xhrIndex, 1);
          }
          resolve({
            data: e.target.response
          });
        };
        // 暴露当前 xhr 给外部
        requestList ? requestList.push(xhr) : [];
      });
    },

    // 上传切片，同时过滤已上传的切片
    async uploadChunks(uploadedList = []) {
      const requestList = this.fileData
        .filter(({ hash }) => !uploadedList.includes(hash))
        .map(({ chunk, hash, index }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", hash);
          formData.append("fileName", this.container.file.name);
          formData.append("fileHash", this.container.hash);
          return { formData, index };
        })
        .map(async ({ formData, index }) =>
          this.request({
            url: "http://localhost:3000/file",
            data: formData,
            onProgress: this.createProgressHandler(this.fileData[index]),
            requestList: this.requestList
          })
        );
      await Promise.all(requestList);
      // 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时
      // 合并切片
      // if (uploadedList.length + requestList.length === this.fileData.length) {
      //   await this.mergeRequest();
      // }
    },

    // 通知服务端合并切片
    async mergeRequest() {
      console.log("合并请求")
      await this.request({
        url: "http://localhost:3000/file/merge",
        headers: {
          "content-type": "application/json"
        },
        data: JSON.stringify({
          fileHash: this.container.hash,
          fileName: this.container.file.name
        })
      });
      this.$message.success("上传成功");
      this.status = Status.wait;
    },

    // 用闭包保存每个 chunk 的进度数据
    createProgressHandler(item) {
      console.log("每个chunk", item)
      return e => {
        item.percentage = parseInt(String((e.loaded / e.total) * 100));
      };
    }
  }
};
</script>

