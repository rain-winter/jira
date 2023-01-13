import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'
import qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL

/**
 * 请求封装
 * axios可以再状态码不为2xx的时候抛出异常
 */
interface Config extends RequestInit {
  token?: string
  data?: object
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customerConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customerConfig,
  }
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout()
        window.location.reload() // 重新刷新页面
        return Promise.reject({ message: '请重新登录' })
      }
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

export const useHttp = () => {
  const { user } = useAuth()
  //   TODO TS操作符
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token })
  // return (...[endpoint, config]: [string, Config]) =>
  //   http(endpoint, { ...config, token: user?.token })
}
