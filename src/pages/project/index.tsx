import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { KanbanPage } from 'pages/kanban'
import { EpicPage } from 'pages/epic'

export const ProjectPage = () => {
  return (
    <div>
      <h1> project page</h1>
      {/* 不能加 / /表示根路径 */}
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
      <Routes>
        {/* projecrs/id/kanpan */}
        {/* projecrs/id/epic */}
        <Route path="/kanban" element={<KanbanPage />}></Route>
        <Route path="/epic" element={<EpicPage />}></Route>
        {/* 重定向 */}
        <Route
          path="projecrs/:projectId/*"
          element={<Navigate to={window.location.pathname + '/kanban'} />}
        />
      </Routes>
    </div>
  )
}
