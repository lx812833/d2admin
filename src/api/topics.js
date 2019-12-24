import request from '@/plugin/axios'

export const AddTopics = (data) => {
  return request({
    url: '/topics',
    data,
    method: "POST"
  })
}
