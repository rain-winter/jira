import styled from '@emotion/styled'
import { Dropdown, MenuProps, Typography } from 'antd'
import { Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import { ProductListScreen } from 'pages/product-list'
// 渲染svg
import { ReactComponent as SoftWareLogo } from 'assets/software-logo.svg'
/**
 * 已经登录了直接来这
 * @returns
 */
export const AuthencicatedApp = () => {
  const { logout, user } = useAuth()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span onClick={logout}>注销</span>,
    },
  ]
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftWareLogo width={'18rem'} color={'rgb(38,132,255'} />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown menu={{ items }} placement="bottom">
            <Typography.Title level={5} type="success">Hi，{user?.name || '无'}</Typography.Title>
          </Dropdown>
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
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
