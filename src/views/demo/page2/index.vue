<template>
  <d2-container better-scroll>
    <d2-simple-mde v-model="text" class="mde" />
    <el-button type="primary" icon="el-icon-search" @click="handleConsole">打印</el-button>
  </d2-container>
</template>

<script>
import text from "./text";
import { AddTopics } from "@api/topics"
export default {
  data() {
    return {
      text
    };
  },
  methods: {
    handleConsole() {
      const data = {
        name: "Vue",
        introduction: "Vue是前端三大框架之一"
      }
      AddTopics(data).then(res => {
        console.log("创建话题", res)
      })
      // console.log("打印", this.text)
    }
  }
};
</script>

<style lang="scss" scoped>
.mde {
  margin-bottom: -16px;
}
</style>
