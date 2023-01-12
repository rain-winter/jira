import { useState } from 'react'
import { LoginPage } from './login'
import { RegisterPage } from './register'

/**
 * 未授权的时候 来这里
 */
export const UnanthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false)
  return (
    <div>
      {isRegister ? <RegisterPage /> : <LoginPage />}
      <button onClick={() => setIsRegister(!isRegister)}>切换</button>
    </div>
  )
}
