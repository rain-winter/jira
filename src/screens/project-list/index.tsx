import { ButtonNoPadding, ErrorBox, Row, ScreenContainer } from 'components/lib'
import { List } from 'screens/project-list/list'
import { SearchPanel } from 'screens/project-list/search-panel'
import {
  useProjectModal,
  useProjectsSearchParams,
} from 'screens/project-list/util'
import { useDebounce, useDocumentTitle } from 'utils'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import React from 'react'


// 状态提升可以让组件共享状态，但是容易造成 prop drilling

// 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
// https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)

  const [param, setParam] = useProjectsSearchParams()
  const { open } = useProjectModal()

  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))

  const { data: users } = useUsers()

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type="link">
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </ScreenContainer>
  )
}

ProjectListScreen.whyDidYouRender = false
