import React from 'react'
import { Dropdown, MenuProps, Table } from 'antd'
import { Link } from 'react-router-dom'
import { ListProps } from 'types'
import dayjs from 'dayjs'
import { Pin } from 'components/pin'
import { useEditProject } from 'utils/project'
import { ButtonNoPadding } from 'components/lib'

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject()
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh)
  return (
    <Table
      rowKey={'id'}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            )
          },
        },
        {
          title: '名称',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>
          },
        },
        {
          title: '部门',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            )
          },
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '无'}
              </span>
            )
          },
        },
        {
          title: '更多',
          render(value, project) {
            const items: MenuProps['items'] = [
              {
                key: '1',
                label: props.projectButton,
              },
            ]
            return (
              <Dropdown menu={{ items }}>
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            )
          },
        },
      ]}
      {...props}
    />
  )
}
