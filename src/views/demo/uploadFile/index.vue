 <!-- 
<template>
  <d2-container better-scroll>
    <template slot="header">大文件上传</template>
    <div class="input-file">
      <i class="el-icon-s-cooperation">选择文件</i>
      <input type="file" @change="handleFileChange"/>
    </div>
    <el-button type="primary" icon="el-icon-edit" @click="handleUploadFile">上传</el-button>
    <div>文件上传进度hash</div>
    <el-progress :percentage="hashPercenttage"></el-progress>
  </d2-container> 
</template> 
-->

<template>
  <d2-container better-scroll>
    <template slot="header">大文件上传</template>
    <div class="input-file">
      <i class="el-icon-s-cooperation">选择文件</i>
      <input
        type="file"
        @change="handleFileChange"
      />
    </div>
    <el-button
      type="primary"
      icon="el-icon-edit"
      @click="handleUploadFile"
    >上传</el-button>
    <div>文件上传进度hash</div>
    <el-progress :percentage="hashPercenttage"></el-progress>
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
export default {
  name: "uploadFile",
  data() {
    return {
      container: {
        file: null,
        hash: ""
      },
      status: Status.wait,
      hashPercenttage: 0,
      fileData: [], // 上传的数据
      requestList: []
    };
  },
  methods: {
    handleFileChange(e) {
      const [file] = e.target.files;
      this.container.file = file;
    },
    async handleUploadFile(e) {
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
          this.hashPercenttage = percentage;
          if (hash) {
            resolve(hash);
          }
        };
      });
    },
    // async verifyUpload(fileName, fileHash) {
    //   const data = await this.request({
    //     url: "http://localhost:3000/verify",
    //     headers: {
    //       "content-type": "application/json"
    //     },
    //     data: JSON.stringify({ fileName, fileHash })
    //   });
    //   return data
    // },
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
      method = "POST",
      data,
      onProgress = e => e,
      headers = {},
      requestList //   上传的文件列表
    }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest(); // js ajax 对象
        xhr.open(method, url); // 请求
        xhr.upload.onprogress = onProgress;
        Object.keys(headers).forEach(
          key => xhr.setRequestHeader(key, headers[key]) // 请求加头
        );
        xhr.send(data);
        xhr.onload = e => {
          console.log(e.target.response, "+++++++++++");
          if (requestList) {
            // xhr 使命完成了
            const xhrIndex = requestList.findIndex(item => item === xhr);
            requestList.splice(xhrIndex, 1);
          }
          resolve({
            data: e.target.response
          });
        };
        if (requestList) {
          requestList.push(xhr); // 每个请求
          console.log("requestList", requestList);
        }
      });
    },
    async uploadChunks(uploadedList = []) {
      const resultList = this.fileData
        .map(({ chunk, hash, index }) => {
          const formData = new FormData(); // js form
          formData.append("chunk", chunk); // 文件 blob
          formData.append("hash", hash); // 切片 hash
          formData.append("filename", this.container.file.name);
          formData.append("fileHash", this.container.hash); // 文件hash
          return { formData, index };
        })
        .map(async ({ formData, index }) =>
          chunkFile({
            data: formData,
            index
          })
        );
      console.log("resultList", resultList);
      await Promise.all(resultList);
      // 合并请求
    }
  }
};
</script>

<style lang="scss" scoped>
.input-file {
  position: relative;
  width: 80px;
  height: 25px;
  line-height: 25px;
  margin-bottom: 15px;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
}
.input-file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.input-file:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}
</style>
