import styled from '@emotion/styled'
import { Button } from 'antd'
import { Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import { ProductListScreen } from 'pages/product-list'

/**
 * 已经登录了直接来这
 * @returns
 */
export const AuthencicatedApp = () => {
  const { logout } = useAuth()
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true} >
          <h2>logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Button onClick={logout}>退出</Button>
        </HeaderRight>
      </Header>
      <Main>
        <ProductListScreen />
      </Main>
    </Container>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`
const Main = styled.main`
  height: calc(100vh-6rem);
`

// grid-area 用来给grid子元素起名字
const Header = styled(Row)``
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
