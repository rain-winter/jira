import { Form, Input } from 'antd'
import { useAuth } from 'context/auth-context'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'utils/use-async'

export const RegisterPage = ({
	onError,
}: {
	onError: (error: Error) => void
}) => {
	const { register } = useAuth()
	const { isLoading } = useAsync(undefined, { throwOnError: true })
	// const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
	//   event.preventDefault()
	//   const username = (event.currentTarget.elements[0] as HTMLInputElement).value
	//   const password = (event.currentTarget.elements[1] as HTMLInputElement).value
	//   register({ username, password })
	// }
	/**
	 * 把cpassword单独领出来？王数据库存的是password，cpassword只在页面显示
	 */
	const handleSubmit = async ({
		cpassword,
		...values
	}: {
		username: string
		password: string
		cpassword: string
	}) => {
		if (cpassword !== values.password) {
			onError(new Error('密码不一致'))
			return
		}
		try {
			await register(values)
		} catch (e: any) {
			console.log(e)
			onError(e)
		}
	}
	return (
		<Form onFinish={handleSubmit}>
			<Form.Item
				name="username"
				rules={[{ required: true, message: '请输入用户名' }]}
			>
				<Input type="text" id={'username'} required={true} />
			</Form.Item>
			<Form.Item name="password">
				<Input type="password" id="password" />
			</Form.Item>
			<Form.Item name="cpassword">
				<Input type="password" id="cpassword" placeholder="确认密码" />
			</Form.Item>
			<LongButton type='primary' loading={isLoading} htmlType='submit'>注册</LongButton>
		</Form>
	)
}
