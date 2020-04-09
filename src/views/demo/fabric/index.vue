<template>
  <d2-container better-scroll>
    <canvas id="canvas"></canvas>
  </d2-container>
</template>

<script>
import { fabric } from "fabric";
export default {
  name: "fabric",

  data() {
    return {};
  },
  methods: {
    initFabric() {
      const card = new fabric.Canvas("canvas", {
        backgroundColor: "pink"
      });
      card.setWidth(350);
      card.setHeight(200);
      // new fabric.Image.fromURL("https://pic1.zhimg.com/80/31ddf0cfbeecef21568d85ca60b5f1ff_720w.jpg", img => {
      //   img.set({
      //     hasControls: false, // 是否开启图层的控件
      //     borderColor: "orange" // 图层控件边框的颜色
      //   });
      //   card.add(img);
      // });


      const imgElement = document.getElementById('my-image');

      const imgInstance = new fabric.Image(imgElement, {
        left: 100, // 图片相对画布的左侧距离
        top: 100, // 图片相对画布的顶部距离
        angle: 30, // 图片旋转角度
        opacity: 0.85, // 图片透明度
        // 这里可以通过scaleX和scaleY来设置图片绘制后的大小，这里为原来大小的一半
        scaleX: 0.5, 
        scaleY: 0.5,
        // fromURL: 'https://pic1.zhimg.com/80/31ddf0cfbeecef21568d85ca60b5f1ff_720w.jpg'
      });
      // 添加对象后, 如下图
      card.add(imgInstance);
    }
  },
  mounted() {
    this.initFabric();
  }
};
</script>
<style lang="scss">
</style>
