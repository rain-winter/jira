import { AuthencicatedApp } from 'authencicated-app'
import { useAuth } from 'context/auth-context'
import { UnanthenticatedApp } from 'unauthenticated-app'
import { ErrorBoundary } from 'components/error-boundary'
import './App.css'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import { FullPageErrorFallBack } from './components/lib'
import { BrowserRouter } from 'react-router-dom'

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
        <ErrorBoundary fallBackRender={FullPageErrorFallBack}>
      <BrowserRouter>
          <div className="App">
            {user ? <AuthencicatedApp /> : <UnanthenticatedApp />}
          </div>
      </BrowserRouter>
        </ErrorBoundary>
    </ConfigProvider>
  )
}

export default App
