
import { Form, Input } from 'antd'
import { UserSelect } from 'components/user-select'
import React from 'react'
import { SearchPanelProps } from 'types'

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form layout="inline" style={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          placeholder={'项目名'}
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(val) => setParam({ ...param, personId: val })}
        />
      </Form.Item>
    </Form>
  )
}
