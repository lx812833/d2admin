<template>
  <d2-container better-scroll>
    <el-form class="person-from" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
            <el-radio v-for="item in genderEnum" :key="item.label" :label="item.label">
              {{item.value}}
            </el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item label="个性签名" prop="headline">
        <el-input v-model="ruleForm.headline"></el-input>
      </el-form-item>
      
      <el-form-item label="头像" prop="avatar_url">
        <upload :limit="limit" :listType="listType" @success="handleUploadSuccess"></upload>
      </el-form-item>
   
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </d2-container>
</template>

<script>
import upload from "@/components/d2-upload"
import { mapState, mapActions } from 'vuex'
import { UserInfo } from '@api/user'
export default {
  name: 'person',
  components: {
    upload
  },
  data() {
    return {
      limit: 1,
      listType: "picture-card",
      ruleForm: {
        name: '',
        gender: '',
        avatar_url: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
      },
      genderEnum: [
        { label: 'male', value: 'male' },
        { label: 'female', value: 'female' },
      ]
    };
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          UserInfo(this.ruleForm, this.info.uuid).then(res => {
          })
        } else {
          this.$message({
            message: '相关参数未完善',
            type: 'warning'
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleUploadSuccess(res) {
      this.ruleForm.avatar_url = res.url;
    }
  }
}
</script>
<style lang="scss">
.person-from {
   width: 500px;
}
.person-from .el-form-item__label {
   color: black !important;
}
</style>
