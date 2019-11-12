import request from '@/plugin/axios'

export const AccountLogin = (data) => {
  return request({
    url: '/users/login',
    data,
    method: 'post',
  })
}

export const Register = (data) => {
  return request({
    url: '/users',
    data,
    method: 'post'
  })
}

export const UserInfo = () => {
  return request({
    url: 'users',
    method: 'get',
  })
}