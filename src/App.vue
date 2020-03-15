<template>
  <div id="app">
    <router-view />
    <div v-if="imageLength !== 0" class="image-container">
      <image-view style="width: 100%; height: 100%;"></image-view>
    </div>
  </div>
</template>

<script>
import util from "@/libs/util";
import { mapGetters } from "vuex";
import imageView from "@/components/d2-image-view/index";
export default {
  name: "app",
  components: {
    imageView
  },
  computed: {
    ...mapGetters("d2admin", {
      imageLength: "image/length"
    })
  },
  watch: {
    "$i18n.locale": "i18nHandle"
  },
  created() {
    this.i18nHandle(this.$i18n.locale);
  },
  methods: {
    i18nHandle(val, oldVal) {
      util.cookies.set("lang", val);
      document.querySelector("html").setAttribute("lang", val);
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/style/public-class.scss";
.image-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 199999;
}
/*滚动条整体部分*/
.table-scrollbar div::-webkit-scrollbar,
.scrollCont::-webkit-scrollbar,
.ivu-modal-body::-webkit-scrollbar,
.ivu-select-dropdown::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滚动条的轨道*/
.table-scrollbar div::-webkit-scrollbar-track,
.scrollCont::-webkit-scrollbar-track,
.ivu-modal-body::-webkit-scrollbar-track,
.ivu-select-dropdown::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.table-scrollbar div::-webkit-scrollbar-thumb,
.scrollCont::-webkit-scrollbar-thumb,
.ivu-modal-body::-webkit-scrollbar-thumb,
.ivu-select-dropdown::-webkit-scrollbar-thumb {
  background-color: #f1f1f1;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.table-scrollbar div::-webkit-scrollbar-thumb:hover,
.scrollCont::-webkit-scrollbar-thumb:hover,
.ivu-modal-body::-webkit-scrollbar-thumb:hover,
.ivu-select-dropdown::-webkit-scrollbar-thumb:hover {
  background-color: #2d8cf0;
}
.table-scrollbar div::-webkit-scrollbar-thumb:active,
.scrollCont::-webkit-scrollbar-thumb:active,
.ivu-modal-body::-webkit-scrollbar-thumb:active,
.ivu-select-dropdown::-webkit-scrollbar-thumb:active {
  background-color: #2d8cf0;
}
/*边角，即两个滚动条的交汇处*/
.table-scrollbar div::-webkit-scrollbar-corner,
.scrollCont::-webkit-scrollbar-corner,
.ivu-modal-body::-webkit-scrollbar-corner,
.ivu-select-dropdown::-webkit-scrollbar-corner {
  background-color: #ffffff;
}

.vxeTree .col--tree-node {
  height: 40px !important;
  border-bottom: none !important;
}
</style>
