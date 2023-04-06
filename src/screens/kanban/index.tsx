import styled from '@emotion/styled'
import { Spin } from 'antd'
import { ScreenContainer } from 'components/lib'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { useTasks } from 'utils/task'
import { CreateKanban } from './create-kanban'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTaskSearchParams,
} from './util'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')
  const { isLoading: taskIsLoading } = useTasks(useTaskSearchParams())
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans(
    useKanbanSearchParams()
  )
  const isLoading = taskIsLoading || kanbanLoading
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      {/* 搜索框 */}
      <SearchPanel />
      {/* 看板 */}
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <ColumnsContainer>
          {kanbans?.map((item) => (
            <KanbanColumn key={item.id} kanban={item} />
          ))}
          <CreateKanban />
        </ColumnsContainer>
      )}
    </ScreenContainer>
  )
}

export const ColumnsContainer = styled('div')`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
