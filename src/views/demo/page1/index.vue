<template>
  <d2-container>
    <template slot="header">Page 1 header</template>
    <el-button class="page-login--quick" size="default" type="info" @click="getUserInfo">
     获取用户信息
    </el-button>
    <upload :limit="limit" :listType="listType" @success="handleUploadSuccess" @remove="handleRemove"></upload>
  </d2-container>
</template>

<script>
import upload from "@/components/d2-upload"
import { UserInfo } from '@api/sys.login'
export default {
  name: 'page1',
  components: {
    upload
  },
  data() {
    return {
      limit: 5,
      listType: "picture-card",
      imgList: [],
    }
  },
  methods: {
    getUserInfo() {
      UserInfo().then(res => {
        console.log("获取用户")
      })
    },
    handleUploadSuccess(res) {
      this.imgList.push(res.url)
      console.log("上传成功", this.imgList)
    },
    handleRemove(index) {
      this.imgList.splice(index, 1)
      console.log("删除后", this.imgList)
    }
  }
}
</script>
