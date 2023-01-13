
import { Form, Input } from 'antd'
interface SearchPanelProps {
  users: User[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps['param']) => void
}
export interface User {
  id: string
  name: string
  email: string
  title: string
  token: string
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (

    <Form
      layout="inline"
      style={{marginBottom:'2rem'}}
    >
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
        <select
          value={param.personId}
          onChange={(e) =>
            setParam({
              ...param,
              personId: e.target.value,
            })
          }
        >
          <option value={''}>负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </Form.Item>
    </Form>
  )
}
