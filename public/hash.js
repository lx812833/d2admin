// self代表子线程自身，即子线程的全局对象。Worker通过importScripts加载脚本

// 通过内容计算md5值
self.importScripts('spark-md5.min.js')

self.onmessage = e => {
  const { fileChunkList } = e.data;
  const spark = new self.SparkMD5.ArrayBuffer();
  let percentage = 0;
  let count = 0;
  // 计算hash值
  const loadNext = index => {
    const reader = new FileReader(); // 文件阅读对象
    reader.readAsArrayBuffer(fileChunkList[index].file);
    reader.onload = e => {
      count++;
      spark.append(e.target.result);
      if (count === fileChunkList.length) {
        self.postMessage({
          percentage: 100,
          hash: spark.end()
        });
        // 关闭当先线程，回收内存
        self.close();
      } else {
        // 还没读完，展示进度条功能
        percentage += 100 / fileChunkList.length;
        self.postMessage({
          percentage
        });
        loadNext(count);
      }
    }
  }
  loadNext(0);
}

