import { Button, Form, Input } from 'antd'
import { AuthForm, useAuth } from 'context/auth-context'

export const LoginPage = () => {
  const { login } = useAuth()
  // 原生写法
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement).value
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement).value
  //   login({ username, password })
  // }

  const handleSubmit = async (values: AuthForm) => {
    await login(values)
  }
  return (
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label htmlFor="username">用户名</label>
    //     <input type="text" id={'username'} />
    //   </div>
    //   <div>
    //     <label htmlFor="password">密码</label>
    //     <input type="password" id="password" />
    //   </div>
    //   <button type="submit">登录</button>
    // </form>
    <Form onFinish={handleSubmit}>
      <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
        <Input type="text" />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true }]}>
        <Input type="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
