import * as auth from 'auth-provider'
import { User } from 'pages/product-list/search-panel'
import React, { ReactNode, useState } from 'react'

interface AuthForm {
  username: string
  password: string
}

const AuthContext = React.createContext<
  | {
      user: User | null
      register: (form: AuthForm) => Promise<void>
      login: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  //    point free
  //   (form: AuthForm) => auth.login(form).then(user => setUser(user)) 写法相等
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))
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
