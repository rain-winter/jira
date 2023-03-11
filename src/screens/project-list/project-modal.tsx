import { Button, Drawer } from 'antd'
import React from 'react'

export const ProjectModal = (props: {
  projectModalOpen: boolean
  onClose: () => void
}) => {
  return (
    <Drawer onClose={props.onClose} open={props.projectModalOpen} >
      <h1>project modal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  )
}
