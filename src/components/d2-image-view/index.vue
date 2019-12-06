<template>
  <div class="image-view">
    <div class="header">
      <span class="numbers">1/10</span>
      <i @click="downloadIamge(imgUrl, 'lx')" class="el-icon-download icon"></i>
      <i @click="shrinkImage" class="el-icon-zoom-out icon"></i>
      <i @click="magnifyImage" class="el-icon-zoom-in icon"></i>
      <i @click="transformImage" class=" el-icon-refresh-left icon"></i>
      <i v-if="isFull" @click="handleFullscreen" class="el-icon-aim icon"></i>
      <i v-else @click="handleFullscreen" class="el-icon-full-screen icon"></i>
      <i @click="closeImage" class="el-icon-switch-button icon"></i>
    </div>
    <div class="content">
      <div class="pop-img"></div>
      <i class="el-icon-back last-img"></i>
      <i class="el-icon-right next-img"></i>
      <img ref="bigImage"  @mousewheel="rollImage(this)" v-drag :style="style" :src="imgUrl" alt="">
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "imageView",
  data() {
    return {
      imgUrl: "https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png",
      isFull: false,
      scale: 0.8,
      degs: 0,
      times: 1
    };
  },
  computed: {
    style() {
      return {
        transform: "rotate(" + this.degs + "deg) scale(" + this.scale + ")"
      };
    }
  },
  methods: {
    downloadIamge(imgsrc, name) {
      let image = new Image();
      image.onload = () => {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        let a = document.createElement("a"); // 生成一个a元素
        let event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "bimcc"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.src = imgsrc;
    },
    closeImage() {
      this.$store.commit("d2admin/image/setImageArray", { data: [] });
    },
    shrinkImage() {
      if (this.scale > 0.4) {
        this.scale -= 0.2;
      }
    },
    magnifyImage() {
      this.scale += 0.2;
    },
    transformImage() {
      this.degs = 90 * this.times;
      this.times++;
    },
    handleFullscreen() {
      let screen = document.getElementsByClassName("image-view")[0];
      if (this.isFull) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (screen.requestFullscreen) {
          screen.requestFullscreen();
        } else if (screen.mozRequestFullScreen) {
          screen.mozRequestFullScreen();
        } else if (screen.webkitRequestFullScreen) {
          screen.webkitRequestFullScreen();
        } else if (screen.msRequestFullscreen) {
          screen.msRequestFullscreen();
        }
      }
      this.isFull = !this.isFull;
    },
    rollImage() {
      /* 获取当前页面的缩放比
        若未设置zoom缩放比，则为默认100%，即1，原图大小
      */
      let zoom = parseInt(this.$refs.bigImage.style.zoom) || 100;
      /* event.wheelDelta 获取滚轮滚动值并将滚动值叠加给缩放比zoom
        wheelDelta统一为±120，其中正数表示为向上滚动，负数表示向下滚动
      */
      zoom += event.wheelDelta / 12;
      /* 最小范围 和 最大范围 的图片缩放尺度 */
      if (zoom >= 100 && zoom < 280) {
        this.$refs.bigImage.style.zoom = zoom + "%";
      }
      return false;
    },
    init() {
      let height = Number(this.$refs.bigImage.height);
      let width = Number(this.$refs.bigImage.width);
      let screenH = Number(document.body.clientHeight);
      let screenW = Number(document.body.clientWidth);
      if (height >= width && height > screenH && height > 800) {
        this.scale = Number((screenH / height).toFixed(1)) - 0.1;
        return;
      } else {
        this.scale = 0.8;
        return;
      }
      if (800 < height < width && width > screenW) {
        this.scale = Number((screenW / width).toFixed(1)) - 0.1;
        return;
      } else {
        this.scale = 0.8;
        return;
      }
    }
  },
  mounted() {
    this.init()
  },
};
</script>

<style lang="scss" scoped>
.image-view {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  .header {
    position: relative;
    padding: 10px 15px;
    height: 40px;
    width: 100%;
    text-align: right;
    line-height: 40px;
    z-index: 999;
    .numbers {
      position: absolute;
      left: 40px;
      line-height: 40px;
      font-size: 20px;
      color: #fff;
    }
    .icon {
      margin-right: 25px;
      font-size: 25px;
      color: #fff;
      cursor: pointer;
    }
  }
  .content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
    img {
      position: absolute;
      max-width: 1600px;
      margin: auto;
      z-index: 1000;
      cursor: pointer;
    }
    .last-img {
      font-size: 50px;
      position: absolute;
      top: 50%;
      margin-top: -25px;
      left: 0;
      color: #fff;
      z-index: 5015;
    }
    .next-img {
      font-size: 50px;
      position: absolute;
      margin-top: -25px;
      top: 50%;
      right: 0;
      color: #fff;
      z-index: 5015;
    }
    .pop-img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: transparent;
      z-index: 50;
    }
  }
}
</style>