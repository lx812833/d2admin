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
        backgroundColor: "#ccc"
      });
      card.setWidth(800);
      card.setHeight(500);

      // let img = new fabric.Image.fromURL("https://pic1.zhimg.com/80/31ddf0cfbeecef21568d85ca60b5f1ff_720w.jpg", img => {
      //     img.set({
      //       left: 100, // 图片相对画布的左侧距离
      //       top: 100, // 图片相对画布的顶部距离
      //       angle: 30, // 图片旋转角度
      //       opacity: 0.85, // 图片透明度
      //       // 这里可以通过scaleX和scaleY来设置图片绘制后的大小，这里为原来大小的一半
      //       scaleX: 0.5,
      //       scaleY: 0.5,
      //     });

      //     card.add(img);
      //   }
      // );

      // let rect = new fabric.Rect({
      //   left: 200,
      //   top: 50,
      //   fill: '#F06292',
      //   width: 100,
      //   height: 100,
      //   strokeWidth: 2,
      //   stroke: "#880E4F",
      //   rx: 10,
      //   ry: 10,
      //   angle: 45,
      //   hasControls: true
      // });

      // card.add(rect);

      // let line = new fabric.Line([ 25, 25, 50, 50 ], {
      //   fill: 'red',
      //   stroke: 'red',
      //   strokeWidth: 5,
      //   selectable: true,
      //   evented: true,
      // })

      // card.add(line);

      card.add(
        //塔吊尖
        this.drawLine([150, 110, 160, 20], 1, "rgb(249,179,45)"), // 左
        this.drawLine([170, 110, 160, 20], 1, "rgb(249,179,45)"), // 右
        this.drawLine([152, 90, 168, 90], 1, "rgb(249,179,45)"),
        this.drawLine([155, 70, 165, 70], 1, "rgb(249,179,45)"),
        this.drawLine([158, 50, 162, 50], 1, "rgb(249,179,45)"),

        // 驾驶室
        this.drawRect(150, 115, 10, 40, "rgb(249,179,45)"),
        this.drawLine([160, 115, 170, 115], 1, "rgb(249,179,45)"),
        this.drawLine([170, 115, 180, 135], 1, "rgb(249,179,45)"),
        this.drawLine([180, 135, 160, 135], 1, "rgb(249,179,45)"),
        this.drawLine([180, 135, 170, 155], 1, "rgb(249,179,45)"),
        this.drawLine([170, 155, 160, 155], 1, "rgb(249,179,45)"),

        // 塔吊支线
        this.drawLine([150, 155, 150, 400], 1, "rgb(249,179,45)"),
        this.drawLine([160, 155, 160, 400], 1, "rgb(249,179,45)"),
        this.drawLine([170, 155, 170, 400], 1, "rgb(249,179,45)"),

        // 下三支线
        this.drawLine([110, 400, 210, 400], 1, "rgb(249,179,45)"),
        this.drawLine([135, 400, 150, 340], 1, "rgb(249,179,45)"),
        this.drawLine([185, 400, 170, 340], 1, "rgb(249,179,45)"),

        // 左小重物
        this.drawRect(57, 113, 9, 15, "rgb(249,179,45)"),
        this.drawRect(67, 113, 9, 15, "rgb(249,179,45)"),
        this.drawRect(77, 113, 9, 15, "rgb(249,179,45)"),

        // 吊线左侧  旋转系数 r = 30。/ 180。0.17
        this.drawLine([160, 45, 85, 80], 1, "rgb(249,179,45)"),
        this.drawLine([160, 45, 88, 80], 1, "rgb(249,179,45)"),
        this.drawLine([160, 45, 91, 80], 1, "rgb(249,179,45)"),

        // 吊线右侧
        this.drawLine([160, 45, 240, 90], 1, "rgb(249,179,45)"),
        this.drawLine([160, 45, 243, 90], 1, "rgb(249,179,45)"),
        this.drawLine([160, 45, 246, 90], 1, "rgb(249,179,45)"),
        this.drawLine([160, 45, 350, 90], 1, "rgb(249,179,45)"),
        this.drawLine([160, 45, 353, 90], 1, "rgb(249,179,45)"),
        this.drawLine([160, 45, 356, 90], 1, "rgb(249,179,45)"),

        // 右吊臂
        this.drawLine([170, 110, 390, 110], 1, "rgb(249,179,45)"),
        this.drawLine([180, 90, 380, 90], 1, "rgb(249,179,45)"), //上下线见得线    比例1:2
        this.drawLine([170, 110, 180, 90], 1, "rgb(249,179,45)"),
        this.drawLine([190, 110, 180, 90], 1, "rgb(0,0,0)"), // 最左(190, 110)
        this.drawLine([190, 110, 200, 90], 1, "rgb(249,179,45)"),
        this.drawLine([210, 110, 200, 90], 1, "rgb(249,179,45)"),
        this.drawLine([210, 110, 220, 90], 1, "rgb(249,179,45)"),
        this.drawLine([230, 110, 220, 90], 1, "rgb(249,179,45)"),
        this.drawLine([230, 110, 240, 90], 1, "rgb(249,179,45)"),
        this.drawLine([250, 110, 240, 90], 1, "rgb(249,179,45)"),
        this.drawLine([250, 110, 260, 90], 1, "rgb(249,179,45)"),
        this.drawLine([270, 110, 260, 90], 1, "rgb(249,179,45)"),
        this.drawLine([270, 110, 280, 90], 1, "rgb(249,179,45)"),
        this.drawLine([290, 110, 280, 90], 1, "rgb(249,179,45)"),
        this.drawLine([290, 110, 300, 90], 1, "rgb(249,179,45)"),
        this.drawLine([310, 110, 300, 90], 1, "rgb(249,179,45)"),
        this.drawLine([310, 110, 320, 90], 1, "rgb(249,179,45)"),
        this.drawLine([330, 110, 320, 90], 1, "rgb(249,179,45)"),
        this.drawLine([330, 110, 340, 90], 1, "rgb(249,179,45)"),
        this.drawLine([350, 110, 340, 90], 1, "rgb(249,179,45)"),
        this.drawLine([350, 110, 360, 90], 1, "rgb(249,179,45)"),
        this.drawLine([370, 110, 360, 90], 1, "rgb(249,179,45)"),
        this.drawLine([370, 110, 380, 90], 1, "rgb(249,179,45)"),
        this.drawLine([390, 110, 380, 90], 1, "rgb(0,0,0)"), // 最右(390, 110) 110

        //左吊臂
        this.drawLine([55, 110, 150, 110], 1, "rgb(249,179,45)"),
        this.drawLine([55, 110, 55, 80], 1, "rgb(249,179,45)"),
        this.drawLine([85, 110, 85, 80], 1, "rgb(249,179,45)"),
        this.drawLine([115, 110, 115, 80], 1, "rgb(249,179,45)"),
        this.drawLine([145, 110, 145, 80], 1, "rgb(249,179,45)"),
        this.drawLine([55, 100, 145, 100], 1, "rgb(249,179,45)"),
        this.drawLine([55, 90, 145, 90], 1, "rgb(249,179,45)"),
        this.drawLine([55, 80, 145, 80], 1, "rgb(249,179,45)"),

        //左小重物竖线
        this.drawLine([62, 110, 62, 130], 1, "rgb(249,179,45)"),
        this.drawLine([72, 110, 72, 130], 1, "rgb(249,179,45)"),
        this.drawLine([82, 110, 82, 130], 1, "rgb(249,179,45)"),

        // 叉线 y变化30
        this.drawLine([150, 400, 170, 370], 1, "rgb(249,179,45)"),
        this.drawLine([150, 370, 170, 400], 1, "rgb(249,179,45)"),
        this.drawLine([150, 370, 170, 340], 1, "rgb(249,179,45)"),
        this.drawLine([150, 340, 170, 370], 1, "rgb(249,179,45)"),
        this.drawLine([150, 340, 170, 310], 1, "rgb(249,179,45)"),
        this.drawLine([150, 310, 170, 340], 1, "rgb(249,179,45)"),
        this.drawLine([150, 310, 170, 280], 1, "rgb(249,179,45)"),
        this.drawLine([150, 280, 170, 310], 1, "rgb(249,179,45)"),
        this.drawLine([150, 280, 170, 250], 1, "rgb(249,179,45)"),
        this.drawLine([150, 250, 170, 280], 1, "rgb(249,179,45)"),
        this.drawLine([150, 250, 170, 220], 1, "rgb(249,179,45)"),
        this.drawLine([150, 220, 170, 250], 1, "rgb(249,179,45)"),
        this.drawLine([150, 220, 170, 190], 1, "rgb(249,179,45)"),
        this.drawLine([150, 190, 170, 220], 1, "rgb(249,179,45)"),
        this.drawLine([150, 190, 170, 160], 1, "rgb(249,179,45)"),
        this.drawLine([150, 160, 170, 190], 1, "rgb(249,179,45)"),

        // 钩子 190 <= x <= 390 - 30   y暂且110
        
        // this.variousHooks(200, 150, "rgb(0,0,0)")

        this.drawLine([350, 120, 380, 120], 1, "rgb(249,179,45)"), // y + 20
        this.drawLine([355, 110, 355, 120], 1, "rgb(249,179,45)"),
        this.drawLine([375, 110, 375, 120], 1, "rgb(249,179,45)"),

        this.drawLine([360, 120, 360, 200], 1, "rgb(249,179,45)"),
        this.drawLine([370, 120, 370, 200], 1, "rgb(249,179,45)"),
        this.drawLine([360, 200, 370, 200], 1, "rgb(249,179,45)"),
        this.drawLine([365, 200, 365, 210], 1, "rgb(249,179,45)"),
        this.drawRect(355, 210, 20, 20, "rgb(249,179,45)")
      );
    },

    drawLine(coords, lineWidth, bgColor) {
      return new fabric.Line(coords, {
        fill: bgColor,
        stroke: bgColor,
        strokeWidth: lineWidth,
        selectable: true,
        evented: true
      });
    },

    drawRect(x, y, width, height, bgColor) {
      return new fabric.Rect({
        left: x,
        top: y,
        fill: bgColor,
        width: width,
        height: height,
        strokeWidth: 1,
        stroke: "#880E4F"
        // rx: 10,
        // ry: 10,
        // angle: 45,
        // hasControls: true
      });
    },

    variousHooks(x, y, bgColor) {
      this.drawLine([x, 120, x + 30, 120], 1, bgColor), // 横线
      this.drawLine([x + 5, 110, x + 5, 120], 1, bgColor), // y + 20
      this.drawLine([x + 20, 110, x + 20, 120], 1, bgColor),
            
      this.drawLine([x + 10, 120, x + 10, y + 10], 1, bgColor),
      this.drawLine([x + 15, 120, x + 15, y + 10], 1, bgColor),
      this.drawLine([x + 15, y + 10, x + 15, y + 10], 1, bgColor),
      this.drawLine([x + 20, y + 10, x + 20, y + 20], 1, bgColor),
      this.drawRect(x + 10, y + 20, 20, 20, bgColor)
    }
  },
  mounted() {
    this.initFabric();
  }
};
</script>
<style lang="scss">
</style>
