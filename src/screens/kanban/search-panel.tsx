import { Button, Input, Space } from 'antd'
import { TaskTypeSelect } from 'components/task-type-select'
import { UserSelect } from '../../components/user-select'
import { useSetUrlSearchParam } from '../../utils/url'
import { useTaskSearchParams } from './util'

export const SearchPanel = () => {
  const searchParams = useTaskSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    })
  }

  return (
    <Space>
      <Input
        style={{
          width: '200px',
        }}
        placeholder={'人物名'}
        value={searchParams.name}
        onChange={(e) => setSearchParams({ name: e.target.value })}
      />
      <UserSelect
        defaultOptionName={'经办人'}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName="类型"
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={() => reset()}>清除帅选器</Button>
    </Space>
  )
}
