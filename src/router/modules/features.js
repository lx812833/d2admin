import layoutHeaderAside from '@/layout/header-aside'

export default {
  path: '/',
  name: 'features',
  meta: {
    auth: true
  },
  redirect: { name: 'index' },
  component: layoutHeaderAside,
  children: [
    {
      path: '/person',
      name: 'person',
      meta: {
        title: '主页',
        auth: true
      },
      component: resolve => require(['@/views/demo/person/index.vue'], resolve)
    },
    {
      path: '/uploadImg',
      name: 'uploadImg',
      meta: {
        title: '图片上传',
        auth: true
      },
      component: resolve => require(['@/views/demo/uploadImg/index.vue'], resolve)
    },
    { 
      path: '/markdown/editor', 
      name: 'markdownEditor',
      meta: {
        title: 'Markdown编辑器',
        auth: true
      },
      component: resolve => require(['@/views/demo/markdownEditor/index.vue'], resolve)
    },
    { 
      path: '/markdown/text', 
      name: 'markdownText',
      meta: {
        title: 'Markdown文本',
        auth: true
      },
      component: resolve => require(['@/views/demo/markdownText/source.vue'], resolve)
    },
    { 
      path: '/uploadFile', 
      name: 'uploadFile',
      meta: {
        title: '大文件上传',
        auth: true
      },
      component: resolve => require(['@/views/demo/uploadFile/index.vue'], resolve)
    },
    { 
      path: '/virtualList', 
      name: 'virtualList',
      meta: {
        title: '虚拟列表',
        auth: true
      },
      component: resolve => require(['@/views/demo/virtualList/index.vue'], resolve)
    },
    { 
      path: '/gridLayout', 
      name: 'gridLayout',
      meta: {
        title: '卡片拖拽',
        auth: true
      },
      component: resolve => require(['@/views/demo/gridLayout/index.vue'], resolve)
    },
    { 
      path: '/vxeTable', 
      name: 'virtualTable',
      meta: {
        title: 'virtualTable',
        auth: true
      },
      component: resolve => require(['@/views/demo/vxeTable/index.vue'], resolve)
    },
    { 
      path: '/listTree', 
      name: 'listTreeNode',
      meta: {
        title: '多功能列表',
        auth: true
      },
      component: resolve => require(['@/views/demo/listTree/index.vue'], resolve)
    },
    {
      path: '/xlsx', 
      name: 'xlsxCsv',
      meta: {
        title: 'XLSX、CSV导入',
        auth: true
      },
      component: resolve => require(['@/views/demo/xlsxCsv/index.vue'], resolve)
    },
    {
      path: '/fabric', 
      name: 'fabric',
      meta: {
        title: 'fabric画布',
        auth: true
      },
      component: resolve => require(['@/views/demo/fabric/index.vue'], resolve)
    }
  ]
}