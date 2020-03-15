<template>
  <div class="list-tree-container" :style="{height: height}">
    <!-- <i class="el-icon-setting" style="margin-right: 15px"></i> -->
    <div v-if="searchAble" class="list-header-input">
      <el-input 
        size="small"
        v-model="searchValue"
        @focus="searchInput = false" 
        :prefix-icon="searchInput ? 'el-icon-search' : ''" 
        placeholder="关键词搜索"
      ></el-input>
    </div>

    <div class="list-header" v-if="(topTitle || topAddAble || allExpansion || topMoreAble) && searchInput">
      <div class="left-item-title">
        <el-checkbox v-model="selectAll" v-if="topCheckAble" @change="changeAllCheckbox">
          <span>{{topTitle}}</span>
        </el-checkbox>
      </div>
      
      <div class="left-item-action">
        <i class="el-icon-plus" size="16" v-if="topAddAble" @click="handleTopAdd"></i>
        <el-dropdown trigger="click" size="small">
          <i class="el-icon-more" v-if="topMoreAble"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <p @click.stop="searchInput = true">搜索</p>
            </el-dropdown-item>
            <el-dropdown-item>
              <p @click.stop="sortBtn = !sortBtn">{{ sortBtn ? '取消排序' : '排序'}}</p>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <template v-if="allExpansion">
            <i class="el-icon-arrow-up" @click="$refs.xTree.setAllTreeExpansion(true)" size="18"></i>
            <i class="el-icon-arrow-down" @click="$refs.xTree.clearTreeExpand()" size="18"></i>
        </template> -->
      </div>
    </div>

    <div :style="{height: tableHeight}">
      <vxe-table
        ref="xTree"
        row-key
        class="table-scrollbar sortable-row-demo"
        max-height="100%"
        show-overflow
        tree-config
        border="none"
        highlight-hover-row
        highlight-current-row
        :row-class-name="rowClassName"
        :show-header="false"
        :checkbox-config="{labelField: 'name', checkMethod }"
        :radio-config="{labelField: 'name', checkMethod }"
        @cell-click="cellClickEvent"
        @checkbox-change="checkboxChangeEvent"
        @radio-change="radioChangeEvent"
        :data="treeList">
          <vxe-table-column width="25"  v-if="sort || sortBtn">
            <template>
              <span class="drag-btn">
                <i class="vxe-icon--menu"></i>
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column type="checkbox" v-if="checkAble" tree-node></vxe-table-column>
          <vxe-table-column type="radio" v-if="radioAble" tree-node></vxe-table-column>
          <vxe-table-column field="name" v-if="simplify && !checkAble && !radioAble" tree-node></vxe-table-column>
          <vxe-table-column field="name" v-if="!simplify && !checkAble && !radioAble" :tree-node="!simplify && !checkAble ? true : false"></vxe-table-column>
          <vxe-table-column title="操作"  :width="actionWidth" v-if="actionWidth !== 17 " align="right">
            <template v-slot="{row}">
              <i class="el-icon-circle-plus-outline icon-style" size="16" v-if="addable  && (selectRow._XID === row._XID)" @click.stop="handleAddName(row)"></i>
              <el-dropdown trigger="click" v-if="editable && (selectRow._XID === row._XID)">
                <i class="el-icon-arrow-down icon-style" size="16"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-plus">
                    <p @click.stop="handleEditName(row)">{{rowFirstBtnName}}</p>
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus">
                    <p @click.stop="handleDelName(row)">{{rowSecondBtnName}}</p>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span v-if="eyeAble" class="icon-style">
                <img v-if="row[eyeKey]" src="//static.bimcc.net/images/eye.png" alt="" @click.stop="handleOpenEye(row, false)">
                <img v-else src="//static.bimcc.net/images/eye-slash.png" alt="" @click.stop="handleOpenEye(row, true)">
              </span>

              <i 
                v-if="row.children && row.children.length !== 0 && !simplify" 
                @click.stop="setRowExpansion(row)"
                :class="backArrow(row) ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" 
                size="16" 
              ></i>
            </template>
        </vxe-table-column>
      </vxe-table>
    </div>

    <div style="text-align: center" v-if="pageAble">
      <el-pagination
        small
        layout="prev, pager, next"
        @current-change="handleChangePage"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import XEUtils from "xe-utils";
import Sortable from "sortablejs/modular/sortable.complete.esm.js";

export default {
  name: "list",
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    // 高度
    height: {
      type: String,
      default: "calc(100vh - 160px)"
    },
    // 是否搜索
    searchAble: {
      type: Boolean,
      default: false
    },
    // 顶部名称
    topTitle: {
      type: String,
      default: ""
    },
    // 顶部是否新增
    topAddAble: {
      type: Boolean,
      default: false
    },
    // 顶部是否深度展开
    allExpansion: {
      type: Boolean,
      default: false
    },
    // 顶部是否展示三点
    topMoreAble: {
      type: Boolean,
      default: false
    },

    
    // 顶部是否显示复选框
    topCheckAble: {
      type: Boolean,
      default: false
    },
    
    
    // 是否深度展开
    defaultExpansion: {
      type: Boolean,
      default: false
    },
    // 是否全选复选框
    isSelectedAll: {
      type: Boolean,
      default: false
    },
    // 复选框选中指定行
    selectedList: {
      type: Array,
      default: () => []
    },
    // 选中指定行
    defaultRow: {
      type: [Object, String]
    },
    
    // 三点展开第一个按钮名
    rowFirstBtnName: {
      type: String,
      default: "重命名"
    },
    // 三点展开第二个按钮名
    rowSecondBtnName: {
      type: String,
      default: "删除分组及组内数据"
    },
    
    // 列表图标显示在前或后。true为前
    simplify: {
      type: Boolean,
      default: false
    },
    // 是否多选
    checkAble: {
      type: Boolean,
      default: false
    },
    // 是否单选
    radioAble: {
      type: Boolean,
      default: false
    },
    // 是否显示👁图标
    eyeAble: {
      type: Boolean,
      default: false
    },
    // 👁图标在row中的变量名字，传过来的treeData中某一项的key，key对应的value值最好是用true（1）与false（0）
    eyeKey: {
      type: String,
      default: ""
    },
    // 是否分页
    pageAble: {
      type: Boolean,
      default: false
    },
    // 每页页数
    pageSize: {
      type: Number,
      default: 0
    },
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 是否拖拽
    sort: {
      type: Boolean,
      default: false
    },
    // 是否新增
    addable: {
      type: Boolean,
      default: false
    },
    // 是否编辑
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchValue: "",
      selectRow: "",
      searchInput: true,
      selectAll: false,
      sortBtn: false, // 是否排序
      sortable: ""
    };
  },
  watch: {
    searchValue(val) {
      if(!val) {
        this.searchInput = true;
      }
    },
    isSelectedAll(flag) {
      if (flag) {
        this.selectAll = true;
        this.$refs.xTree.setAllCheckboxRow(true);
        this.$emit("check-item", this.$refs.xTree.getCheckboxRecords());
      } else {
        this.selectAll = false;
        this.$refs.xTree.clearCheckboxRow();
      }
    },
    defaultRow(data) {
      if (this.defaultRow) {
        this.selectRow = data;
        this.$refs.xTree.setCurrentRow(data);
      } else {
        this.selectRow = "";
        this.$refs.xTree.clearCurrentRow();
      }
    }
  },
  computed: {
    tableHeight() {
      let height = 0;
      if (this.searchAble) height += 40;
      if (this.topTitle || this.topAddAble || this.allExpansion) height += 32;
      if (this.pageAble) height += 20;
      return "calc(100% - " + height + "px)";
    },
    treeList() {
      let arrList = [];
      let filterName = XEUtils.toString(this.searchValue).trim();
      if (filterName) {
        let options = { children: "children" };
        let searchProps = ["name"];
        arrList = XEUtils.searchTree(
          this.treeData,
          item =>
            searchProps.some(
              key => XEUtils.toString(item[key]).indexOf(filterName) > -1
            ),
          options
        );
        // 搜索之后默认展开所有节点
        this.$nextTick(() => {
          this.$refs.xTree.setAllTree.setAllTreeExpansion(true);
        });
      } else {
        arrList = this.treeData;
      }
      return arrList;
    },
    actionWidth() {
      let i = 0;
      if (!this.simplify) i++;
      if (this.addable) i++;
      if (this.editable) i++;
      if (this.eyeAble) i++;
      if (this.simplify && this.addable && !this.editable && !this.eyeAble) {
        return 1;
      }
      return 1 * 20 + 18;
    }
  },
  methods: {
    // 列表拖拽
    handleRowDrop() {
      this.$nextTick(() => {
        let xTable = this.$refs.xTree;
        this.sortable = Sortable.create(
          document.querySelector(".body--wrapper >.vxe-table--body tbody"),
          {
            handle: ".drag-btn",
            onEnd: ({ item, oldIndex }) => {
              let options = { children: "children" };
              let targetTrElem = item;
              let wrapperElem = targetTrElem.parentNode;
              let prevTrElem = targetTrElem.previousElementSibling;
              let nextTrElem = targetTrElem.nextElementSibling;
              let tableTreeData = this.treeList;
              let selfRow = xTable.getRowNode(targetTrElem).item;
              let selfNode = XEUtils.findTree(
                tableTreeData,
                row => row === selfRow,
                options
              );
              if (prevTrElem) {
                // 移动到节点
                let prevRow = xTable.getRowNode(prevTrElem).item;
                let nextRow = {};
                if (nextTrElem) nextRow = xTable.getRowNode(nextTrElem).item;
                if (xTable.isTreeExpandByRow(prevRow)) {
                  /*--特别注意：parent_id是传进来的数组treeList带的parent_id
                      如果没有这个请把他定义成一个变量，默认为parent_id）-*/
                  if (nextRow.parent_id !== selfRow.parent_id) {
                    // 错误的移动
                    let oldTrElem = wrapperElem.children[oldIndex];
                    wrapperElem.insertBefore(targetTrElem, oldTrElem);
                    xTable.refreshData();
                    return this.$message.error("不允许跨级拖动");
                  }
                } else {
                  if (prevRow.parent_id !== selfRow.parent_id) {
                    // 错误的移动
                    let oldTrElem = wrapperElem.children[oldIndex];
                    wrapperElem.insertBefore(targetTrElem, oldTrElem);
                    xTable.refreshData();
                    return this.$message.error("不允许跨级拖动");
                  }
                }

                let prevNode = XEUtils.findTree(
                  tableTreeData,
                  row => row === prevRow,
                  options
                );
                let currRow = selfNode.items.splice(selfNode.index, 1)[0];
                if (xTable.isTreeExpandByRow(prevRow)) {
                  // 移动到当前的子节点
                  prevRow[options.children].splice(0, 0, currRow);
                } else {
                  // 移动到相邻节点
                  prevNode.items.splice(
                    prevNode.index + (selfNode.index < prevNode.index ? 0 : 1),
                    0,
                    currRow
                  );
                }
              } else {
                // 移动到第一行
                var currRow = selfNode.items.splice(selfNode.index, 1)[0];
                tableTreeData.unshift(currRow);
              }
              // 如果变动了树层级，需要刷新数据
              xTable.refreshData();
            }
          }
        );
      });
    },
    // 顶部一键全选
    changeAllCheckbox(flag) {
      console.log("顶部一键全选", flag);
      // this.$refs.xTree.setAllCheckboxRow(flag);
      // this.$emit("check-item", this.$refs.xTree.getCheckboxRecords());
      this.$emit("check-item", flag);
    },
    // 顶部新增
    handleTopAdd() {
      this.$emit("top-add");
    },
    // vxe-table样式
    rowClassName({ row, column }) {
      let string = "";
      if (
        (this.checkAble && !this.simplify) ||
        (!this.simplify && !this.checkAble)
      ) {
        string = "checkAble";
      }
      if (row === this.selectRow) {
        string += " row-green";
      }
      if (this.eyeAble && !row[this.eyeKey]) {
        string += " disabledRow";
      }
      return string;
    },
    checkMethod({ row }) {
      if (this.eyeAble) {
        return row[this.eyeKey];
      } else {
        return true;
      }
    },
    // 点击某一行
    cellClickEvent({ row, column }) {
      if (this.eyeAble && !row[this.eyeKey]) {
        return;
      }
      if (row._XID !== this.selectRow._XID) {
        this.selectRow = row;
        this.$emit("cell-click-event", row);
      }
    },
    // 单个勾选的复选框
    checkboxChangeEvent() {
      this.$emit("check-item", this.$refs.xTree.getCheckboxRecords());
    },
    // 单选按钮
    radioChangeEvent() {
      this.$emit("radio-check-item", this.$refs.xTree.getRadioRecord());
    },
    setRowExpansion(row) {
      this.$refs.xTree.toggleTreeExpansion(row, true);
    },
    // 行内添加
    handleAddName(row) {
      this.$emit("add-children", row);
    },
    // 行内编辑
    handleEditName(row) {
      this.$emit("edit-item", row);
    },
    // 行内删除
    handleDelName(row) {
      this.$emit("del-item", row);
    },
    // 点击👁图标事件
    handleOpenEye(row, status) {
      this.$emit("open-eye", row, status);
    },
    // 分页
    handleChangePage(page) {
      this.$emit("change-page", page);
    },
    backArrow(row) {
      let arr = this.$refs.xTree.getTreeExpandRecords();
      for (let i in arr) {
        if (arr[i].id === row.id) {
          return true;
        }
      }
      return false;
    }
  },
  mounted() {
    if (this.selectedList && this.selectedList.length !== 0) {
      this.$refs.xTree.setCheckboxRow(this.selectedList, true);
      this.$emit("check-item", this.$refs.xTree.getCheckboxRecords());
    }
    if (this.defaultRow) {
      this.selectRow = this.defaultRow;
      this.$refs.xTree.setCurrentRow(this.defaultRow);
    }
    if (this.defaultExpansion) {
      this.$refs.xTree.setAllTreeExpansion(true);
    }
    if (this.isSelectedAll) {
      this.selectAll = true;
      this.$refs.xTree.setAllCheckboxRow(true);
      this.$emit("check-item", this.$refs.xTree.getCheckboxRecords());
    } else {
      this.selectAll = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.list-tree-container {
  width: 100%;
  font-size: 14px;
  border-right: 1px solid #eaebed;
  box-sizing: border-box;
  padding: 5px ;
  .list-header-input {
    position: relative;
    width: 100%;
    input {
      margin: 0 auto;
      margin-bottom: 5px;
    }
  }
  .list-header {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    line-height: 48px;
    border-bottom: 1px solid #eaebed;
    font-weight: 600;
    .left-item-action {
      i {
        margin-left: 5px;
      }
    }
    .top-icon {
      position: relative;
      &:after {
        content: "";
        width: 9px;
        height: 1px;
        position: absolute;
        top: 3px;
        left: 5px;
        background: #515a6e;
      }
    }
  }
  .icon-style {
    display: inline-block;
    vertical-align: bottom;
    padding: 10px 2px;
    img {
      margin-top: 5px;
    }
  }
}
</style>
<style lang="scss">
.sortable-row-demo .drag-btn {
  cursor: move;
  font-size: 12px;
}
.sortable-row-demo .vxe-body--row.sortable-ghost,
.sortable-row-demo .vxe-body--row.sortable-chosen {
  background-color: #dfecfb;
}
.left-tree-item {
  .vxe-table .vxe-cell {
    cursor: default;
    padding: 0 3px 0 10px;
  }
  .vxe-table {
    font-size: 14px !important;
  }
  .vxe-table .vxe-cell--checkbox.is--checked,
  .vxe-table .vxe-cell--checkbox.is--indeterminate {
    color: #606266;
  }
  .vxe-table .vxe-body--row.row-green {
    background: rgba(0, 118, 255, 0.05);
    color: #0076ff;
  }
  .vxe-table .row-green .vxe-cell--checkbox.is--checked,
  .vxe-table .row-green .vxe-cell--checkbox.is--indeterminate {
    color: #0076ff;
  }
  .vxe-table.t--border.b--style-none .vxe-body--column,
  .vxe-table.t--border.b--style-none .vxe-footer--column,
  .vxe-table.t--border.b--style-none .vxe-header--column {
    background-image: none;
  }
  .vxe-table:after {
    border-bottom: none;
  }
  .vxe-table .vxe-tree--btn-wrapper {
    background-color: transparent !important;
  }
  .vxe-table .checkAble .vxe-tree--btn-wrapper {
    display: none !important;
  }
  .vxe-table .checkAble .vxe-tree-cell {
    padding-left: 0;
  }
  .vxe-table .vxe-body--row.row--current,
  .vxe-table .vxe-body--row.row--current .vxe-tree--btn-wrapper {
    background-color: transparent;
  }
  .vxe-table .vxe-body--row.disabledRow {
    /*background:red !important;*/
    color: #bbb !important;
  }
}
</style>