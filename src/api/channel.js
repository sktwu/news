/**
 * 获取所有频道列表的请求
 */
import request from "@/utils/request"

export const getAllChannels = () => {
  return request({
    method: "GET",
    url: "/app/v1_0/channels"
  })
}