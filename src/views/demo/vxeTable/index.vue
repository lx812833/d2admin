<template>
  <d2-container>
    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      row-key
      highlight-hover-row
      show-overflow
      ref="xTable"
      height="500"
      :data="tableData"
      @cell-dblclick="cellDBLClickEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :formatter="formatterSex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
      <vxe-table-column title="操作" width="100" show-overflow>
        <template v-slot="{ row }">
          <vxe-button type="text" icon="fa fa-edit" @click="editEvent(row)"></vxe-button>
          <vxe-button type="text" icon="fa fa-trash-o" @click="removeEvent(row)"></vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" :loading="submitLoading" resize destroy-on-close>
      <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">
        <vxe-form-item title="Basic information" span="24" title-align="left" title-width="200px" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
        <vxe-form-item title="Name" field="name" span="12" :item-render="{name: '$input', props: {placeholder: '请输入名称'}}"></vxe-form-item>
        <vxe-form-item title="Nickname" field="nickname" span="12" :item-render="{name: '$input', props: {placeholder: '请输入昵称'}}"></vxe-form-item>
        <vxe-form-item title="Role" field="role" span="12" :item-render="{name: '$input', props: {placeholder: '请输入角色'}}"></vxe-form-item>
        <vxe-form-item title="Sex" field="sex" span="12" :item-render="{name: '$select', options: sexList}"></vxe-form-item>
        <vxe-form-item title="Age" field="age" span="12" :item-render="{name: '$input', props: {type: 'number', placeholder: '请输入年龄'}}"></vxe-form-item>
        <vxe-form-item title="是否单身" field="flag1" span="12" :item-render="{name: '$radio', options: [{label: '是', value: 'Y'}, {label: '否', value: 'N'}]}"></vxe-form-item>
        <vxe-form-item title="可选信息" field="checkedList" span="24" :visible-method="visibleMethod" :item-render="{name: '$checkbox', options: [{label: '运动、跑步', value: '1'}, {label: '听音乐', value: '2'}, {label: '泡妞', value: '3'}, {label: '吃美食', value: '4'}]}"></vxe-form-item>
        <vxe-form-item title="Other information" span="24" title-align="left" title-width="200px" :title-prefix="{message: '请填写必填项', icon: 'fa fa-info-circle'}"></vxe-form-item>
        <vxe-form-item title="Number" field="num" span="12" :item-render="{name: '$input', props: {type: 'number', placeholder: '请输入数值'}}"></vxe-form-item>
        <vxe-form-item title="Date" field="date3" span="12" :item-render="{name: '$input', props: {type: 'date', placeholder: '请选择日期'}}"></vxe-form-item>
        <vxe-form-item title="Address" field="address" span="24" :title-suffix="{message: '啦啦啦，就是这么强大！！！', icon: 'fa fa-question-circle'}" :item-render="{name: 'textarea', attrs: {placeholder: '请输入地址'}}"></vxe-form-item>
        <vxe-form-item align="center" span="24" :item-render="{ name: '$buttons', children: [{ props: { type: 'submit', content: '提交', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] }"></vxe-form-item>
      </vxe-form>
    </vxe-modal>
  </d2-container>
</template>

<script>
// https://xuliangzhan_admin.gitee.io/vxe-table/#/table/edit/popupForm
export default {
  name: "virtualTable",
  data() {
    return {
      submitLoading: false,
      tableData: [],
      selectRow: null,
      showEdit: false,
      sexList: [
        { label: "女", value: "0" },
        { label: "男", value: "1" }
      ],
      formData: {
        name: null,
        nickname: null,
        role: null,
        sex: null,
        age: null,
        num: null,
        checkedList: [],
        flag1: null,
        date3: null,
        address: null
      },
      formRules: {
        name: [
          { required: true, message: "请输入名称" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符" }
        ],
        nickname: [{ required: true, message: "请输入昵称" }],
        sex: [{ required: true, message: "请选择性别" }]
      }
    };
  },
  created() {
    let list = []
    for(let index = 0; index < 2000; index++){
      list.push({
        id: index + 10000,
        name: 'test' + index,
        age: Math.floor(Math.random() * 100),
        sex: Math.random() > 0.5 ? '0' : '1',
        address: 'address abc' + index
      })
    }
    this.tableData = list
  },
  methods: {
    formatterSex({ cellValue }) {
      let item = this.sexList.find(item => item.value === cellValue);
      return item ? item.label : "";
    },
    visibleMethod({ data }) {
      return data.flag1 === "Y";
    },
    cellDBLClickEvent({ row }) {
      this.editEvent(row);
    },
    insertEvent() {
      this.formData = {
        name: "",
        nickname: "",
        role: "",
        sex: "",
        age: "",
        num: "",
        checkedList: [],
        flag1: "",
        date3: "",
        address: ""
      };
      this.selectRow = null;
      this.showEdit = true;
    },
    editEvent(row) {
      this.formData = {
        name: row.name,
        nickname: row.nickname,
        role: row.role,
        sex: row.sex,
        age: row.age,
        num: row.num,
        checkedList: row.checkedList,
        flag1: row.flag1,
        date3: row.date3,
        address: row.address
      };
      this.selectRow = row;
      this.showEdit = true;
    },
    removeEvent(row) {
      this.$XModal.confirm("您确定要删除该数据?").then(type => {
        if (type === "confirm") {
          this.$refs.xTable.remove(row);
        }
      });
    },
    submitEvent() {
      this.submitLoading = true;
      setTimeout(() => {
        this.submitLoading = false;
        this.showEdit = false;
        if (this.selectRow) {
          this.$XModal.message({ message: "保存成功", status: "success" });
          Object.assign(this.selectRow, this.formData);
        } else {
          this.$XModal.message({ message: "新增成功", status: "success" });
          this.$refs.xTable.insert(this.formData);
        }
      }, 500);
    }
  }
};
</script>

<style>
</style>