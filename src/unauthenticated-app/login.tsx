import { Form, Input } from 'antd'
import { AuthForm, useAuth } from 'context/auth-context'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'utils/use-async'

export const LoginPage = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  // const [num, setNum] = useState(0) 异步
  // 原生写法
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement).value
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement).value
  //   login({ username, password })
  // }

  const handleSubmit = async (values: AuthForm) => {
    // setNum(num + 1) 异步
    // console.log(num) 同步
    try {
      // await login(values)
      await run(login(values))
      
    } catch (e: any) {
		console.log(e)
      onError(e)
    }
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input type="text" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input type="password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}
