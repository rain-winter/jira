import React from 'react'
import { Divider, List, Popover, Typography } from 'antd'
import { useProjects } from 'utils/project'
import styled from '@emotion/styled'
// 把pover抽象成组件，避免直接写在authenticated-app
export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects()
  const pinnedProjects = projects?.filter((item) => item.pin)
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      {/* TODO onClick={() => setProjectModalOpen(true)} */}
    </ContentContainer>
  )
  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
