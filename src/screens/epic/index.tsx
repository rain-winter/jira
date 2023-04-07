import { Button, List, Modal, Space } from 'antd'
import { ScreenContainer } from 'components/lib'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProjectInUrl } from 'screens/kanban/util'
import { Epic } from 'types'
import { useDeleteEpic, useEpics } from 'utils/epic'
import { useTasks } from 'utils/task'
import { CreateEpic } from './create-task'
import React from 'react'

export const EpicScreen = () => {
  const { data: epics } = useEpics()
  const { data: currentProject } = useProjectInUrl()

  const { data: tasks } = useTasks({ projectId: currentProject?.id })

  const { mutate: delTask } = useDeleteEpic()
  const [epicCreateOpen, setEpicCreateOpen] = useState(false)

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组：${epic.name}`,
      content: '点击确定删除',
      okText: '确定',
      onOk() {
        console.log(123)

        let res = delTask({ id: epic.id })
        console.log(res)
      },
    })
  }

  return (
    <ScreenContainer>
      <Space>
        <h1>{currentProject?.name}任务组</h1>
        <Button type="link" onClick={() => setEpicCreateOpen(true)}>
          创建任务组
        </Button>
      </Space>
      <List
        style={{ overflow: 'scroll' }}
        dataSource={epics}
        itemLayout="vertical"
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Space>
                  {epic.name}
                  <Button onClick={() => confirmDeleteEpic(epic)} type="link">
                    删除
                  </Button>
                </Space>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(epic.start).format('YYYY-mm-dd')}</div>
                  <div>结束时间：{dayjs(epic.end).format('YYYY-mm-dd')}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    key={task.id}
                    to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        open={epicCreateOpen}
        onClose={() => setEpicCreateOpen(false)}
      />
    </ScreenContainer>
  )
}
