import {AuthencicatedApp} from 'authencicated-app'
import {useAuth} from 'context/auth-context'
import {UnanthenticatedApp} from 'unauthenticated-app'
import {ErrorBoundary} from 'components/error-boundary'
import './App.css'
import {ConfigProvider} from 'antd'
import 'antd/dist/reset.css'
import {FullPageErrorFallBack} from "./components/lib";

function App() {
    const {user} = useAuth()
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b96b',
                },
            }}
        >
            <ErrorBoundary fallBackRender={FullPageErrorFallBack}>
                <div className="App">
                    {user ? <AuthencicatedApp/> : <UnanthenticatedApp/>}
                </div>
            </ErrorBoundary>
        </ConfigProvider>
    )
}

export default App
