import { Button, Drawer } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { projectListActions, selectProjectModalOpen } from './project-list.slice'

export const ProjectModal = () => {
  const dispatch = useDispatch()
  const projectModalOpen =useSelector(selectProjectModalOpen)
  return (
    <Drawer
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      open={projectModalOpen}
    >
      <h1>project modal</h1>
      <Button onClick={()=>dispatch(projectListActions.closeProjectModal())}>关闭</Button>
    </Drawer>
  )
}
