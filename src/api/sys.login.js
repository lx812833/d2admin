import request from '@/plugin/axios'

export const AccountLogin = (data) => {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}

export const UserInfo = () => {
  return request({
    url: 'users/5da5d1c63e876431907e0f00?fields=locations;',
    method: 'get',
  })
}