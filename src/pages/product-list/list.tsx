import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { User } from './search-panel'

interface listProps extends TableProps<Project> {
  users: User[]
}
export interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
  created: number
}
export const List = ({ users, ...props }: listProps) => {
  return (
    <Table
      rowKey={'id'}
      pagination={false}
      columns={[
        {
          title: '部门',
          dataIndex: 'organization',
          key: 'organization',
        },
        {
          title: '名称',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <span>{project.name}</span>
          },
        },
        {
          title: '负责人',
          key: '负责人',
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
      ]}
      {...props}
    />
  )
}
