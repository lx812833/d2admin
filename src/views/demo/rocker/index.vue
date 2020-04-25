<template>
  <d2-container better-scroll>
    <div class="box">
      <div id="nipple_container">
        <div class="front"></div>
        <div class="back"></div>
      </div>
    </div>
  </d2-container>
</template>

<script>
import "./nipplejs.min.js";

export default {
  data() {
    return {
      manager: {}
    };
  },
  methods: {
    initJoystick() {
      this.$nextTick(() => {
        let nipple_container = document.getElementById("nipple_container");
        let options = {
          mode: "static",
          size: 100,
          force: 0.2,
          pressure: 0.1,
          color: "ddd",
          position: {
            left: "50%",
            top: "50%"
          },
          zone: nipple_container
        };
        let manager = nipplejs.create(options);

        // 滑动摇杆的事件
        manager.on("move", (evt, data) => {
          if (data.direction) {
            const { x, y, angle } = data.direction;
            this.handleMove(x, y, angle);
          }
        });

        // 停止滑动摇杆的事件
        manager.on("end", (evt, data) => {
          console.log("停止滑动摇杆的事件");
        });
      });
    },

    handleMove(x, y, angle) {
      console.log(x, y, angle)
      if (angle === "left") {
        if (y === "up") {
          console.log("左上");
        } else if (y === "down") {
          console.log("左下");
        }
      }

      if (angle === "right") {
        if (y === "up") {
          console.log("右上");
        } else if (y === "down") {
          console.log("右下");
        }
      }

      if (angle === "up") {
        if (y === "up") {
          console.log("上");
        }
      }

      if (angle === "down") {
        if (y === "down") {
          console.log("下");
        }
      }
    }
  },
  mounted() {
    this.initJoystick();
  }
};
</script>

<style lang="scss">
.box {
  display: flex;
  width: 120px;
  height: 120px;
  border: 1px solid black;
  #nipple_container {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    .front {
      background: red;
      user-select: none;
    }
    .back {
      background-image: url("./j.png");
      background-size: cover;
    }
  }
}
</style>