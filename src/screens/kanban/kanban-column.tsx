import styled from '@emotion/styled'
import bugIcon from 'assets/bug.svg'
import taskIcon from 'assets/task.svg'
import { Kanban } from 'types'
import { useTasks } from 'utils/task'
import { useTaskTypes } from 'utils/task-type'
import { useTaskSearchParams } from './util'

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name
  if (!name) {
    return null
  }
  return <img alt="" src={name === 'task' ? taskIcon : bugIcon} />
}

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams())
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)
  return (
    <div>
      {tasks?.map((task) => (
        <div>
          {task.name}
          <TaskTypeIcon id={task.typeId} />
        </div>
      ))}
    </div>
  )
}

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`
