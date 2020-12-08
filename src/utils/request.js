//请求模块
import axios from 'axios'
import store from "@/store/index"

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

//请求拦截器
request.interceptors.request.use(config => {
  const user = store.state.user
  // 如果用户已经登录，同一给接口设置token信息
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // 处理完成之后一定要返回config,否则请求还卡在拦截器这里
  return config
}, error => {
  return Promise.reject(error)
})

//响应拦截器


//导出
export default request