import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import { useKanbanSearchParams, useProjectInUrl } from './util'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans(useKanbanSearchParams())
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>

      <SearchPanel />
      {kanbans?.map((item) => (
        <KanbanColumn key={item.id} kanban={item} />
      ))}
    </div>
  )
}
