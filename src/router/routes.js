import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 演示页面
      {
        path: 'page1',
        name: 'page1',
        meta: {
          title: '页面 1',
          auth: true
        },
        component: _import('demo/page1')
      },
      {
        path: 'markdown/editor',
        name: 'markdownEditor',
        meta: {
          title: 'Markdown编辑器',
          auth: true
        },
        component: _import('demo/markdownEditor')
      },
      {
        path: 'markdown/text',
        name: 'markdownText',
        meta: {
          title: 'Markdown文本',
          auth: true
        },
        component: _import('demo/markdownText/source')
      },
      {
        path: 'person',
        name: 'person',
        meta: {
          title: '个人主页',
          auth: true
        },
        component: _import('demo/person')
      },
      {
        path: 'uploadFile',
        name: 'uploadFile',
        meta: {
          title: '大文件上传',
          auth: true
        },
        component: _import('demo/uploadFile')
      },
      {
        path: 'virtualList',
        name: 'virtualList',
        meta: {
          title: '虚拟列表',
          auth: true
        },
        component: _import('demo/virtualList')
      },
      {
        path: 'gridLayout',
        name: 'gridLayout',
        meta: {
          title: '卡片拖拽',
          auth: true
        },
        component: _import('demo/gridLayout')
      },
      {
        path: 'vxeTable',
        name: 'virtualTable',
        meta: {
          title: 'virtualTable',
          auth: true
        },
        component: _import('demo/vxeTable')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
