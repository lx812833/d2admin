<template>
  <d2-container better-scroll>
    <template slot="header">导入 xlsx .csv 表格</template>
    <div class="d2-mb">
      <el-upload :before-upload="handleUploadXlsx" action="default">
        <el-button type="success">
          <d2-icon name="file-o"/>
          选择要导入的 .xlsx 表格
        </el-button>
      </el-upload>
    </div>
    
    <!--
      也可使用input type = "file" 导入；设置其 accept 文件后缀，只可导入相应文件 
      <input type="file" accept=".xlsx" @change="handleUploadXlsx">
     -->

    <div class="d2-mb">
      <el-upload :before-upload="handleUploadCsv" action="default">
        <el-button type="success">
          <d2-icon name="file-o"/>
          选择要导入的 .csv 表格
        </el-button>
      </el-upload>
    </div>

    <el-table v-bind="table">
      <el-table-column
        v-for="(item, index) in table.columns"
        :key="index"
        :prop="item.prop"
        :label="item.label">
      </el-table-column>
    </el-table>

  </d2-container>
</template>

<script>
import Vue from "vue"
import pluginImport from "@/libs/util.import"
Vue.use(pluginImport)

export default {
  name: "xlsxCsv",
  data() {
    return {
      table: {
        columns: [],
        data: [],
        size: 'mini',
        stripe: true,
        border: true
      }
    }
  },
  methods: {
    handleUploadXlsx(file) {
      console.log("导入的", file);
      this.$import.xlsx(file)
        .then(({ header, results }) => {
          this.table.columns = header.map(e => {
            return {
              label: e,
              prop: e
            }
          })
          this.table.data = results
        })
      return false
    },
    handleUploadCsv(file) {
      this.$import.csv(file)
        .then(res => {
          this.table.columns = Object.keys(res.data[0]).map(e => ({
            label: e,
            prop: e
          }))
          this.table.data = res.data
        })
      return false
    }
  }
}
</script>

<style>

</style>