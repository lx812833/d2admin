import store from '@/store'
import axios from 'axios'
import { Loading, Message } from 'element-ui'
import util from '@/libs/util'

// 记录和显示错误
const errorLog = error => {
  // 添加到日志
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000 // 请求超时时间
})

// 请求动画
let loading
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: "loading...",
    background: "rgba(0, 0, 0, 0.7)"
  })
}

const endLoading = () => {
  loading.close()
}

// 请求拦截器
service.interceptors.request.use(
  config => {
    startLoading()
    const token = util.cookies.get('token')
    // 让每个请求携带token
    config.headers['token'] = token
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    endLoading()
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data.data
    return dataAxios
  },
  error => {
    if (error && error.response) {
      const status = error.response.status
      const message = error.response.data.message
      switch (status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = message; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 422: error.message = '参数校验失败'; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    endLoading()
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
