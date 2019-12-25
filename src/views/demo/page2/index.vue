<template>
  <d2-container>
    标题：<el-input v-model="title" placeholder="请输入文章标题" style="width: 200px; margin-bottom: 10px;"></el-input>
    <d2-simple-mde v-model="introduction" class="mde" />
    <el-button type="primary" icon="el-icon-edit" @click="handleSubmit">发表</el-button>
  </d2-container>
</template>

<script>
import text from "./text";
import { AddContent, getContent } from "@api/content"
export default {
  data() {
    return {
      title: "",
      introduction: ""
    };
  },
  methods: {
    handleSubmit() {
      const data = {
        title: this.title,
        description: this.introduction
      }
      AddContent(data).then(res => {
        console.log("创建话题", res)
        this.title = "";
        this.introduction = "";
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.mde {
  // margin-bottom: -16px;
}
</style>
