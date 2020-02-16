import request from '@/plugin/axios'

export const verifyHash = (data) => {
  return request({
    url: "/file/verify",
    data,
    method: "POST"
  })
}

export const chunkFile = (data) => {
  return request({
    url: "/file",
    data,
    method: "POST"
  })
}