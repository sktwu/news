/**
 * 文章评论请求
 */
import request from "@/utils/request"

export const getComments = params => {
  return request({
    method: "GET",
    url: "/app/v1_0/comments",
    params
  })
}