import axios from 'axios'
import { getToken } from '../utils/token'
import { Toast } from '@douyinfe/semi-ui'

// 从环境变量获取baseURL和timeout
const targetURL = import.meta.env.VITE_TARGET_URL
const baseURL = import.meta.env.VITE_API_URL
const timeout = import.meta.env.VITE_API_TIMEOUT

const http = axios.create({
  baseURL: targetURL + baseURL,
  timeout: timeout
})

// 请求拦截器 负责添加token
http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 相应拦截器
http.interceptors.response.use(
  (res) => {
    let code = res.data.code
    if (code === 401) {
      // TODO 鉴权失败
    }

    return res.data
  },
  (err) => {
    Toast.error({ content: "响应失败" + err.message })
    return Promise.reject(err)
  }
)

export default http