import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { useProjectModal } from 'screens/project-list/util'
import { useProjects } from 'utils/project'
import { ButtonNoPadding } from './lib'
import React from 'react'

// 把pover抽象成组件，避免直接写在authenticated-app
export const ProjectPopover = () => {
  const { open } = useProjectModal()
  // TODO react-query refetch
  const { data: projects, refetch } = useProjects()
  const pinnedProjects = projects?.filter((item: any) => item.pin)
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project: any) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type="link">
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )
  return (
    <Popover
      onOpenChange={() => refetch()}
      placement="bottom"
      content={content}
    >
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
