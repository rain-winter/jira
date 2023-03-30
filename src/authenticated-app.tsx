import React from 'react'
import { ProjectListScreen } from 'screens/project-list'
import { useAuth } from 'context/auth-context'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import styled from '@emotion/styled'
import { ButtonNoPadding, Row } from 'components/lib'
import { Button, Dropdown, MenuProps } from 'antd'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from 'screens/project'
import { resetRoute } from 'utils'
import { ProjectModal } from 'screens/project-list/project-modal'
import { ProjectPopover } from 'components/project-popover'
import { useDispatch } from 'react-redux'
import { projectListActions } from 'screens/project-list/project-list.slice'

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

// prop drilling PageHeader传递给ProjectPopover,最后在List中使用

export const AuthenticatedApp = () => {
  // 使用了状态管理就不需要这个了
  // const [projectModalOpen, setProjectModalOpen] = useState(false)

  const dispatch = useDispatch()

  return (
    <Container>
      <Router>
        {/* 1. PageHeader传递setProjectModalOpen */}
        <PageHeader />
        <Main>
          <Routes>
            <Route
              path={'/projects'}
              element={
                <ProjectListScreen
                  projectButton={
                    <ButtonNoPadding
                      onClick={() =>
                        dispatch(projectListActions.openProjectModal())
                      }
                      type="link"
                    >
                      创建项目
                    </ButtonNoPadding>
                  }
                />
              }
            />
            <Route
              path={'/projects/:projectId/*'}
              element={<ProjectScreen />}
            />
            <Route path="/" element={<Navigate to="projects" />} />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  )
}
// 2.
const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        </ButtonNoPadding>
        {/* 3. */}
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { logout, user } = useAuth()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span onClick={logout}>注销</span>,
    },
  ]
  return (
    <Dropdown menu={{ items }}>
      <Button type={'link'} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  )
}

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main``
