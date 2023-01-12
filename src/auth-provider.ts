import { User } from "pages/product-list/search-panel"

// 真实环境，使用firebase这种第三方auth服务，这个文件不需要开发
const localStorageKey = '__auth_provider_token__'
const apiUrl = process.env.REACT_APP_API_URL

export const getToken = () => window.localStorage.getItem(localStorageKey)
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

// 登录
export const login = (data: {
  username: string
  password: string
}): Promise<unknown> | any => {
  fetch(`${apiUrl}/login`, {
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
export const register = (data: {
  username: string
  password: string
}): Promise<unknown> | any => {
  fetch(`${apiUrl}/register`, {
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
