import styled from '@emotion/styled'
import { Menu } from 'antd'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import NotFound from 'screens/NotFound'
import { EpicScreen } from 'screens/epic'
import { KanbanScreen } from 'screens/kanban'

// TODO 返回当前路由
const useRouterType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}

export const ProjectScreen = () => {
  const routeType = useRouterType()
  return (
    <Container className="aa">
      <Aside>
        <Menu mode="inline" selectedKeys={[routeType]}>
          <Menu.Item key={'kanban'}>
            <Link to={'kanban'}>看板</Link>
          </Menu.Item>
          <Menu.Item key={'epic'}>
            <Link to={'epic'}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          {/*projects/:projectId/kanban*/}
          <Route path={'/kanban'} element={<KanbanScreen />} />
          {/*projects/:projectId/epic*/}
          <Route path={'/epic'} element={<EpicScreen />} />
          {/* TODO 路由 replace */}
          {/*  */}
          <Route
            path="/"
            element={
              // 相当于重定向
              <Navigate
                replace={true}
                to={window.location.pathname + '/kanban'}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
    </Container>
  )
}
// 往后退到 'projects/6'又重定向到'projects/6/kanban'
// 所以用 replace
// ['projects','projects/6','projects/6/kanban']

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`
