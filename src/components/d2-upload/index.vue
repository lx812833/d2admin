<template>
  <div>
    <el-upload
      v-if="maxLimlit < limit"
      ref="upload"
      :action="baseUrl + '/upload'"
      :limit="limit"
      :list-type="listType"
      :on-preview="handlePictureCardPreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-progress="handleProgress"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import util from "@/libs/util";
export default {
  props: {
    /**
     * @description 最大上传个数
     */
    limit: {
      type: Number
    },
    /**
     * @description 文件列表类型
     */
    listType: {
      type: String
    }
  },
  data() {
    return {
      baseUrl: util.baseUrl,
      imgList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      maxLimlit: 0
    };
  },
  methods: {
    handleSuccess(file) {
      this.maxLimlit++;
      this.$emit("success", file);
    },
    handleRemove(file) {
      // this.$emit("remove", index)
    },
    handleProgress() {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss">
.el-upload--picture-card {
  height: 100px;
  width: 100px;
  line-height: 120px;
}
.el-upload-list--picture-card .el-upload-list__item {
  height: 100px;
  width: 100px;
}
</style>