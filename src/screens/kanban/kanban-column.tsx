import styled from '@emotion/styled'
import { Button, Card, Dropdown, MenuProps, Modal, Space } from 'antd'
import bugIcon from 'assets/bug.svg'
import taskIcon from 'assets/task.svg'
import { Mark } from 'components/mark'
import { Kanban, Task } from 'types'
import { useDelKanban } from 'utils/kanban'
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

// TODO 抽离组件
const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal()
  const { name: keyword } = useTaskSearchParams()
  return (
    <Card onClick={() => startEdit(task.id)} key={task.id} size="small">
      {/* 
      
      keyword从url获取---搜索的关键字
      name是当前任务的名字
      
      */}
      <Mark keyword={keyword} name={task.name} />
      <TaskTypeIcon id={task.typeId} />
    </Card>
  )
}

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDelKanban()

  const startEdit = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗？',
      onOk() {
        return mutateAsync({ id: kanban.id })
      },
    })
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button danger onClick={() => startEdit()}>
          删除
        </Button>
      ),
    },
  ]

  return (
    <Dropdown menu={{ items }}>
      <Button type="link">...</Button>
    </Dropdown>
  )
}

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams())
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)

  return (
    <Container>
      <Space>
        {kanban.name}
        <More kanban={kanban} />
      </Space>
      <TasksContainer>
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
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
