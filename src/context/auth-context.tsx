import React, { ReactNode, useCallback } from 'react'
import * as auth from 'auth-provider'
import { AuthForm, User } from 'types'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'

import * as authSlice from 'store/auth.slice'
import { useDispatch, useSelector } from 'react-redux'

export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

// const AuthContext = React.createContext<
//   | {
//       user: User | null
//       register: (form: AuthForm) => Promise<void>
//       login: (form: AuthForm) => Promise<void>
//       logout: () => Promise<void>
//     }
//   | undefined
// >(undefined)
// AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    error,
    isLoading,
    isIdle,
    isError,
    run,
  } = useAsync<User | null>()

  // point free
  // const login = (form: AuthForm) => auth.login(form).then(setUser)
  // const register = (form: AuthForm) => auth.register(form).then(setUser)
  // const logout = () => auth.logout().then(() => setUser(null))
  
  const dispatch: (...args: any[]) => Promise<User> = useDispatch()

  useMount(() => {
    // run(bootstrapUser())
    run(dispatch(authSlice.bootstrap()))
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }
  return <div>{children}</div>

  // return (
  //   <AuthContext.Provider
  //     children={children}
  //     value={{ user, login, register, logout }}
  //   />
  // )
}

export const useAuth = () => {
  const dispatch: (...args: any[]) => Promise<User> = useDispatch()
  const user = useSelector(authSlice.selectUser)

  const login = useCallback(
    (form: AuthForm) => dispatch(authSlice.login(form)),
    [dispatch]
  )

  const register = useCallback(
    (form: AuthForm) => dispatch(authSlice.register(form)),
    [dispatch]
  )

  const logout = useCallback(() => dispatch(authSlice.logout()), [dispatch])
  // const context = React.useContext(AuthContext);
  // if (!context) {
  //   throw new Error("useAuth必须在AuthProvider中使用");
  // }
  // return context

  return {
    user,
    login,
    register,
    logout,
  }
}
