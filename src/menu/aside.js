// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '功能展示',
    icon: 'folder-o',
    children: [
      { path: '/uploadImg', title: '图片上传' },
      { path: '/markdown/editor', title: 'Markdown编辑器' },
      { path: '/markdown/text', title: 'Markdown文本' },
      { path: '/uploadFile', title: '大文件上传' },
      { path: '/virtualList', title: '虚拟列表'},
      { path: '/gridLayout', title: '卡片拖拽'},
      { path: '/vxeTable', title: 'vxeTable'},
      { path: '/listTree', title: '多功能列表'},
      { path: '/xlsx', title: 'XLSX、CSV导入'},
    ]
  },
  { path: '/index', title: '首页', icon: 'home' },

]
