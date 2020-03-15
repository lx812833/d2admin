<template>
  <div style="width: 100%; height: 100%;">
    <el-container style="height: calc(100vh - 130px); border: 1px solid #eee">
      <el-aside
        width="200px"
        style="background-color: rgb(238, 241, 246)"
      >
        <listTree
          ref="listTree"
          v-if="refresh"
          :isSelectedAll="isSelectedAll"
          :searchAble="searchAble"
          :simplify="simplify"
          :addable="addable"
          :editable="editable"
          :checkAble="checkAble"
          :radioAble="radioAble"
          :topAddAble="topAddAble"
          :topMoreAble="topMoreAble"
          :allExpansion="allExpansion"
          :topCheckAble="topCheckAble"
          :defaultExpansion="defaultExpansion"
          :eyeAble="eyeAble"
          :pageAble="page"
          :total="10"
          :pageSize="15"
          :sort="sort"
          :topTitle="topTitle"
          :rowFirstBtnName="rowFirstBtnName"
          :rowSecondBtnName="rowSecondBtnName"
          :defaultRow="defaultRow"
          :selectedList="[]"
          :treeData="menus"
          @check-item="checkChangeEvent"
          @radio-check-item="radioChangeEvent"
          @cell-click-event="cellClickEvent"
          @add-children="addName"
          @edit-item="editName"
          @del-item="delData"
          @top-add="handleTopAdd"
          @change-page="changePage"
          @open-Eye="openEye"
        ></listTree>
      </el-aside>

      <el-container style="background-color: rgba(238, 241, 246, .5)">
        <el-main>
          <div style="padding: 20px 10px;line-height: 3">
            <el-checkbox v-model="checkAble">复选框；</el-checkbox>
            <el-checkbox v-model="radioAble">单选按钮：</el-checkbox>

            单选按钮和复选框之中最多选中1个<br />
            <el-checkbox v-model="isSelectedAll">默认全选；</el-checkbox>
            <el-checkbox v-model="topCheckAble">顶部的 复选框 全选；</el-checkbox>
            <el-checkbox v-model="defaultExpansion">默认深层次展开；</el-checkbox>
            <el-checkbox v-model="page">翻页：</el-checkbox>
            <el-checkbox v-model="sort">拖拽：</el-checkbox>
            <el-checkbox v-model="searchAble">顶部搜索框；</el-checkbox>
            <el-checkbox v-model="simplify">展开按钮在前或后；</el-checkbox>
            （
            <el-checkbox v-model="addable">行内添加；</el-checkbox>
            <el-checkbox v-model="editable">行内三个点；</el-checkbox>
            <el-checkbox v-model="eyeAble">眼睛按钮是否显示：</el-checkbox>）需要选中一行才能显示
            <el-checkbox v-model="allExpansion">顶部全部展开按钮；</el-checkbox>
            <el-checkbox v-model="topAddAble">顶部添加；</el-checkbox>
            <el-checkbox v-model="topMoreAble">顶部三点按钮；</el-checkbox>
            <el-checkbox v-model="defaultSelect">默认选中第二行；</el-checkbox>
            <br />
            <el-input
              v-model="topTitle"
              style="width: 200px;margin: 5px"
              placeholder="树形组件的顶部名称"
            ></el-input>
            <br />
            <el-input
              v-model="rowFirstBtnName"
              style="width: 200px;margin: 5px"
              placeholder="第一个"
            ></el-input>
            <el-input
              v-model="rowSecondBtnName"
              style="width: 200px"
              placeholder="第二个"
            ></el-input>
            行内三点展开的下拉框文件命名
          </div>
          <div style="text-align: center;padding-top: 50px">
            <h2>{{content.split('：')[0]}}</h2>
            <div>
              {{content.split('：')[1]}}
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import listTree from "@/components/d2-listTree";
export default {
  name: "listTreeNode",
  components: {
    listTree
  },
  data() {
    return {
      refresh: true,
      isSelectedAll: true,
      eyeAble: false,
      searchAble: false,
      simplify: false,
      addable: false,
      editable: false,
      checkAble: false,
      radioAble: false,
      topAddAble: true,
      topMoreAble: true,
      allExpansion: false,
      topCheckAble: false,
      defaultExpansion: false,
      sort: false,
      page: false,
      topTitle: "列表名称",
      rowSecondBtnName: "删除分组及组内数据",
      rowFirstBtnName: "重命名",
      defaultRow: null,
      defaultSelect: true,
      menus: [
        {
          id: "1",
          parent_id: 0,
          eyeKey: 1,
          name: "单位工程3"
        },
        {
          id: "2",
          parent_id: 0,
          eyeKey: 0,
          label: "单位工程1",
          name: "1",
          children: [
            {
              id: "11",
              name: "2",
              eyeKey: 1,
              parent_id: 1,
              children: [
                {
                  id: "111",
                  name: "3",
                  eyeKey: 1,
                  parent_id: 11,
                  children: [
                    {
                      id: "1111",
                      name: "分部工程",
                      eyeKey: 1,
                      parent_id: 111
                    }
                  ]
                },
                {
                  id: "4",
                  name: "工序1",
                  eyeKey: 0,
                  parent_id: 11
                }
              ]
            },
            {
              id: "12",
              parent_id: 1,
              eyeKey: 1,
              name: "5"
            }
          ]
        },
        {
          id: "3",
          name: "分部工程4324",
          eyeKey: 0,
          parent_id: 0,
          children: [
            {
              id: "33",
              eyeKey: 1,
              name: "6",
              parent_id: 2
            },
            {
              id: "333",
              name: "7",
              eyeKey: 1,
              parent_id: 2
            }
          ]
        },
        {
          id: "4",
          parent_id: 0,
          eyeKey: 1,
          label: "单位工程2",
          name: "8",
          children: [
            {
              id: "44",
              name: "9",
              eyeKey: 0,
              parent_id: 1,
              children: [
                {
                  id: "444",
                  name: "10",
                  eyeKey: 1,
                  parent_id: 11,
                  children: [
                    {
                      id: "44444",
                      name: "11",
                      eyeKey: 1,
                      parent_id: 111
                    }
                  ]
                },
                {
                  id: "444444",
                  name: "12",
                  eyeKey: 0,
                  parent_id: 11
                }
              ]
            },
            {
              id: "55",
              parent_id: 1,
              name: "13",
              eyeKey: 1
            }
          ]
        },
        {
          id: "5",
          name: "14",
          eyeKey: 0,
          parent_id: 0,
          children: [
            {
              id: "555",
              name: "15",
              eyeKey: 1,
              parent_id: 2
            },
            {
              id: "5555",
              name: "16",
              eyeKey: 0,
              parent_id: 2
            }
          ]
        }
      ],
      content: ""
    };
  },
  watch: {
    addable(flag) {
      this.refresh = false;
      this.$nextTick(() => {
        this.refresh = true;
      });
    },
    simplify(flag) {
      this.refresh = false;
      this.$nextTick(() => {
        this.refresh = true;
      });
    },
    eyeAble(flag) {
      this.refresh = false;
      this.$nextTick(() => {
        this.refresh = true;
      });
    },
    checkAble(flag) {
      this.refresh = false;
      this.$nextTick(() => {
        this.refresh = true;
      });
    },
    radioAble(flag) {
      this.refresh = false;
      this.$nextTick(() => {
        this.refresh = true;
      });
    },
    editable(flag) {
      this.refresh = false;
      this.$nextTick(() => {
        this.refresh = true;
      });
    },
    defaultSelect(flag) {
      if (flag) {
        this.defaultRow = this.menus[1];
      } else {
        this.defaultRow = null;
      }
    }
  },
  methods: {
    // 复选框返回数据
    checkChangeEvent(row) {
      this.content = "选中复选框返回来的数据：" + JSON.stringify(row);
    },
    // 单选按钮
    radioChangeEvent(row) {
      this.content = "选中单选返回来的数据：" + JSON.stringify(row);
    },
    // 点击一行
    cellClickEvent(row) {
      this.content = "点击一行返回来的数据：" + JSON.stringify(row);
    },
    // 点击行内添加
    addName(row) {
      this.content = "点击行内添加返回来的数据：" + JSON.stringify(row);
    },
    // 行内编辑
    editName(row) {
      this.content = "点击行内重命名返回来的数据：" + JSON.stringify(row);
    },
    // 行内删除
    delData(row) {
      this.content = "点击行内删除返回来的数据：" + JSON.stringify(row);
    },
    //顶部新增
    handleTopAdd() {
      this.content = "点击顶部新增";
    },
    //切换页数
    changePage(page) {
      this.content = "点击切换页数，第" + page + "页";
    },
    //切换页数
    openEye(row, status) {
      this.content = status + "眼睛" + JSON.stringify(row);
    }
  }
};
</script>
<style lang="scss">
</style>
