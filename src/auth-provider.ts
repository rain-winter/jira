import { User } from 'pages/product-list/search-panel'
/**
 * 封装了登录注册退出、获取token等方法
 */
// 真实环境，使用firebase这种第三方auth服务，这个文件不需要开发
const localStorageKey = '__auth_provider_token__'
const apiUrl = process.env.REACT_APP_API_URL

//获取token
export const getToken = () => window.localStorage.getItem(localStorageKey)
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  console.log(user)
  return user
}

// 登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: 'post',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    } else {
      return Promise.reject(await res.json())
    }
  })
}

// 注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: 'post',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    } else {
      return Promise.reject(await res.json())
    }
  })
}

// 退出
export const logout = async () => {
  window.localStorage.removeItem(localStorageKey)
}
