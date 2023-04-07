import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { useUsers } from 'utils/user'
import React from 'react'

export const UserPopover = () => {
  const { data: users, refetch } = useUsers()

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
    </ContentContainer>
  )

  return (
    <Popover
      onOpenChange={() => refetch()}
      placement={'bottom'}
      content={content}
    >
      <span>组员</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
