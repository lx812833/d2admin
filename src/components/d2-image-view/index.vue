<template>
  <div class="image-view">
    <div class="header">
      <span class="numbers">1/10</span>
      <i @click="downloadImage" class="el-icon-download icon"></i>
      <i class="el-icon-zoom-out icon"></i>
      <i class="el-icon-zoom-in icon"></i>
      <i class=" el-icon-refresh-left icon"></i>
      <i class="el-icon-full-screen icon"></i>
      <i @click="closeImage" class="el-icon-switch-button icon"></i>
    </div>
    <div class="content">
      <div class="pop-img"></div>
      <i class="el-icon-back last-img"></i>
      <i class="el-icon-right next-img"></i>
      <img ref="bigImage" v-drag src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" alt="">
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "imageView",
  data() {
    return {};
  },
  methods: {
    downloadImage() {},
    closeImage() {
      this.$store.commit('d2admin/image/setImageArray', { data: [] })
    }
  }
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