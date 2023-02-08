import { Form, Input } from 'antd'
import { UserSelect } from 'components/user-select'
import { Project } from './list'
interface SearchPanelProps {
  users: User[]
  param: Partial<Pick<Project, 'name' | 'personId'>>
  // param: {
  //   name: string
  //   personId: string
  // }
  setParam: (param: SearchPanelProps['param']) => void
}
export interface User {
  id: number
  name: string
  email: string
  title: string
  token: string
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  // console.log(users)
  // console.log(param)
  return (
    <Form layout="inline" style={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          onChange={(e) =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) => {
            console.log(value)
            console.log(param)

            setParam({
              ...param,
              personId: value,
            })
            console.log(param)

          }}
        />
        {/* <select value={param.personId} onChange={()=>null}>
          <option value={''}>负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select> */}
      </Form.Item>
    </Form>
  )
}
