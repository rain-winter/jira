import { Navigate, Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
import NotFound from 'screens/NotFound'
import { EpicScreen } from 'screens/epic'
import { KanbanScreen } from 'screens/kanban'

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
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
    </div>
  )
}
// 往后退到 'projects/6'又重定向到'projects/6/kanban'
// 所以用 replace
// ['projects','projects/6','projects/6/kanban']
