import request from '@/plugin/axios'

export const AddContent = (data) => {
  return request({
    url: "/questions",
    data,
    method: "POST"
  })
}

export const getContent = (id) => {
  return request({
    url: "/questions/" + id,
    method: "GET"
  })
}
