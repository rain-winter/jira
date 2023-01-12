import { ReactNode } from 'react'
import { AuthProvider } from './auth-context'

/**
 * 用它来包裹整个 App
 * {*} children:ReactNode 是包括的子组件
 */
export const AppProviders = ({ children }: { children: ReactNode }) => {
  // return <AuthProvider children={children} />
  return <AuthProvider>{children}</AuthProvider>
}