<template>
  <el-dropdown size="small" class="d2-mr">
    <el-avatar v-if="info.avatar_url" src="http://localhost:3000/uploads/upload_560717c51aca7f5696b74a800258a9dd.gif"></el-avatar>
    <el-avatar v-else>{{info.name}}</el-avatar>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="personHome">
        <d2-icon name="user" class="d2-mr-5" />
        我的主页
      </el-dropdown-item>
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    },
    personHome() {
      this.$router.push({name: 'person'})
    }
  }
}
</script>
