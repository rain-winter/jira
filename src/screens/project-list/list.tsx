import { Button, Dropdown, MenuProps, Modal, Table } from 'antd'
import { ButtonNoPadding } from 'components/lib'
import { Pin } from 'components/pin'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { ListProps, Project } from 'types'
import { useDelProject, useEditProject } from 'utils/project'
import { useProjectModal } from './util'
import React from 'react'


export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject()
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })

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
            return <More project={project} />
          },
        },
      ]}
      {...props}
    />
  )
}

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal()
  const editProject = (id: number) => () => startEdit(id)
  const { mutate: delProject } = useDelProject()
  const confimDelProject = (id: number) => {
    Modal.confirm({
      title: '确定删除这个项目吗',
      content: '点击确定删除',
      okText: '确定',
      onOk() {
        delProject(id)
      },
    })
  }
  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: (
        <Button type="text" onClick={editProject(project.id)}>
          编辑
        </Button>
      ),
    },
    {
      key: 'del',
      label: (
        <Button onClick={() => confimDelProject(project.id)} type="text" danger>
          删除
        </Button>
      ),
    },
  ]
  return (
    <Dropdown menu={{ items }}>
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  )
}
