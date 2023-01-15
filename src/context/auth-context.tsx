import * as auth from 'auth-provider'
import { FullPageErrorFallBack, FullPageLoading } from 'components/lib'
import { DevTools } from 'jira-dev-tool'
import { User } from 'pages/product-list/search-panel'
import React, { ReactNode } from 'react'
import { useMount } from 'utils'
import { http } from 'utils/http'
import { useAsync } from 'utils/use-async'

export interface AuthForm {
  username: string
  password: string
}

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<
  | {
      user: User | null
      register: (form: AuthForm) => void
      login: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)

AuthContext.displayName = 'AuthContext'

// AuthProvider包裹最外面的app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    isLoading,
    error,
    isError,
    data: user,
    setData: setUser,
    isIdle,
  } = useAsync<User | null>()
  //    point free
  //   (form: AuthForm) => auth.login(form).then(user => setUser(user)) 写法相等
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))
  useMount(() => {
    run(bootstrapUser())
  })

  // 初始状态和正在加载 显示loading
  if (isIdle || isLoading) {
    return <FullPageLoading />
  }
  if (isError) {
    console.log('auth-context' + isError)
    return (
      <div>
        <FullPageErrorFallBack error={error} />
        <DevTools />
      </div>
    )
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, logout, register }}
    />
  )
}
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('context必须在 AuthProvider 调用')
  }
  return context
}
