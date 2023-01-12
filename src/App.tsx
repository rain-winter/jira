import { AuthencicatedApp } from 'authencicated-app'
import { useAuth } from 'context/auth-context'
import { UnanthenticatedApp } from 'unauthenticated-app'
import './App.css'

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {user ? <AuthencicatedApp /> : <UnanthenticatedApp />}
    </div>
  )
}

export default App
