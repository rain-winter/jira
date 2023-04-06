import styled from '@emotion/styled'
import { Card } from 'antd'
import bugIcon from 'assets/bug.svg'
import taskIcon from 'assets/task.svg'
import { Kanban } from 'types'
import { useTasks } from 'utils/task'
import { useTaskTypes } from 'utils/task-type'
import { CreateTask } from './create-task'
import { useTaskSearchParams, useTasksModal } from './util'

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name
  if (!name) {
    return null
  }
  return <Image alt="" src={name === 'task' ? taskIcon : bugIcon} />
}

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams())
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)

  const { startEdit } = useTasksModal()

  return (
    <Container>
      <TasksContainer>
        {kanban.name}
        {tasks?.map((task) => (
          <Card onClick={() => startEdit(task.id)} key={task.id} size="small">
            {task.name}
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
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

const Image = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  margin-left: 0.5rem;
`
