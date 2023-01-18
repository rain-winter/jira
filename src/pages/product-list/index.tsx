import styled from '@emotion/styled'
import { useState } from 'react'
import { useDebounce, useDocumentTitle } from 'utils'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { Typography } from 'antd'
import { useProjects } from '../../utils/project'
import { useUsers } from '../../utils/user'
import { useUrlQueryParam } from 'utils/url'
import { useProjectSeaechParam } from './util'

export const ProductListScreen = () => {
  // const [, setParam] = useState({ 从useUrlQueryParam获取
  //   name: '',
  //   personId: '',
  // })
  useDocumentTitle('任务列表')

  const [param, setParam] = useProjectSeaechParam()

  const { isLoading, error, data: list } = useProjects(useDebounce(param, 1500))
  const { data: users } = useUsers()

  //  第一种写法
  // setParam(Object.assign({},param,{name:e.target.value}))
  // const {run, isLoading, error, data: list} = useAsync<Project[]>()
  // useEffect(() => {
  //     run(client('projects', {data: cleanObject(debounceParam)}))
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debounceParam])

  return (
    <Container>
      <h1>项目列表</h1>
      <select
        onChange={(evt) => {
          const value = evt.target.value
          console.log(value, typeof value)
        }}
      >
        <option value={undefined}>默认</option>
        <option value={1}>1</option>
      </select>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  )
}

ProductListScreen.whyDidYouRender = true
// TODO whyDidYouRender 相当于这个写法。用来检查哪里渲染
// class Test extends React.Component<any,any>{
//   static whyDidYouRender= true
// }

const Container = styled.div`
  padding: 3.2rem;
`
