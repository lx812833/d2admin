<template>
  <d2-container better-scroll>
    <template slot="header">大文件上传</template>
    <input
      type="file"
      @change="handleFileChange"
    />
    <el-button
      type="primary"
      icon="el-icon-edit"
      @click="handleUploadFile"
    >上传</el-button>
  </d2-container>
</template>

<script>
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
      status: Status.wait
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
        };
      });
    }
  }
};
</script>
