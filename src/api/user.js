/**
 * 用户相关请求模块
 */
import request from "@/utils/request"
import store from "@/store/index"

// 登录和注册请求
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送验证码请求
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}

// 获取用户个人资料
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user',
    headers: {
      Authorization: `Bearer  ${store.state.user.token}`
    }
  })
}