import axios from 'axios'
import { getToken } from '../utils/token'

// 从环境变量获取baseURL和timeout
const baseURL = import.meta.env.VITE_API_URL
const timeout = import.meta.env.VITE_API_TIMEOUT

const request = axios.create({
  baseURL: baseURL,
  timeout: timeout
})

// 请求拦截器 负责添加token
request.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})