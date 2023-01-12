import { useAuth } from 'context/auth-context'
import { ProductListScreen } from 'pages/product-list'

/**
 * 已经登录了直接来这
 * @returns 
 */
export const AuthencicatedApp = () => {
  const {logout} = useAuth()
  return (
    <div>
      <ProductListScreen />
      <button onClick={logout}>退出</button>
    </div>
  )
}
