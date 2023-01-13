import { AuthencicatedApp } from 'authencicated-app'
import { useAuth } from 'context/auth-context'
import { UnanthenticatedApp } from 'unauthenticated-app'
import './App.css'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'

function App() {
  const { user } = useAuth()
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <div className="App">
        {user ? <AuthencicatedApp /> : <UnanthenticatedApp />}
      </div>
    </ConfigProvider>
  )
}

export default App
