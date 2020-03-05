// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '页面',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '页面 1' },
      { path: '/markdown/editor', title: 'Markdown编辑器' },
      { path: '/markdown/text', title: 'Markdown文本' },
      { path: '/uploadFile', title: '大文件上传' },
      { path: '/virtualList', title: '虚拟列表'},
      { path: '/gridLayout', title: '卡片拖拽'}
    ]
  },
  { path: '/index', title: '首页', icon: 'home' },

]
