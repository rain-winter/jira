import styled from '@emotion/styled'
import {Button, Card, Divider, Typography} from 'antd'
import left from 'assets/left.svg'
import logo from 'assets/logo.svg'
import right from 'assets/right.svg'
import {useState} from 'react'
import {LoginPage} from './login'
import {RegisterPage} from './register'

/**
 * 未授权的时候 来这里
 */
export const UnanthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    return (
        <Container>
            <Header/>
            <Background/>
            <Button onClick={() => {
                throw new Error('点击抛出一个异常')
            }
            }>抛出异常</Button>
            <ShadowCard>
                <Title>{isRegister ? '请注册' : '请登录'}</Title>

                {error ? (
                    <Typography.Text type="danger">{error.message}</Typography.Text>
                ) : ('')}

                {isRegister ? <RegisterPage onError={setError}/> : <LoginPage onError={setError || null}/>}
                <Divider/>
                <Button type="link" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? '已有账号直接登录' : '没有账号？注册新账号'}
                </Button>
            </ShadowCard>
        </Container>
    )
}

export const LongButton = styled(Button)`
  width: 100%;
`

// emotion css in js
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`
// Card是antd的，所以不能styled。
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
  calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`
const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`
