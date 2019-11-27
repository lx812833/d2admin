import request from '@/plugin/axios'
  
export const UserInfo = (data, id) => {
  return request({
    url: '/users/' + id,
    data,
    method: "PATCH"
  })
}
