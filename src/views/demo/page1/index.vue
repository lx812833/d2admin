<template>
  <d2-container>
    <template slot="header">Page 1 header</template>
    <el-button class="page-login--quick" size="default" type="info" @click="getUserInfo">
     获取用户信息
    </el-button>
  </d2-container>
</template>

<script>
import { UserInfo } from '@api/sys.login'
export default {
  name: 'page1',
  methods: {
    getUserInfo() {
      UserInfo().then(res => {
        console.log("获取用户", res.data)
      })
    }
  }
}
</script>
