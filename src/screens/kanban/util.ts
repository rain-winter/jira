import { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useDebounce } from 'utils'
import { useProject } from 'utils/project'
import { useTask } from 'utils/task'
import { useUrlQueryParam } from '../../utils/url'

// TODO 正则表达式从url取id
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}
// var pathname = 'www.baidu.com/projects/123'
// ['projects/123', '123', index: 14, input: 'www.baidu.com/projects/123', groups: undefined]

// 返回整个 project
export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })
export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTaskSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    'name',
    'typeId',
    'processorId',
    'tagId',
  ])
  const debounceName = useDebounce(param.name, 200)
  const projectId = useProjectIdInUrl()
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: debounceName,
    }),
    [projectId, param]
  )
}
export const useTasksQueryKey = () => ['tasks', useTaskSearchParams()]

// TODO 编辑任务事务
export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    'editingTaskId',
  ])

  const { data: editingTask, isLoading } = useTask(Number(editingTaskId))

  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id })
    },
    [setEditingTaskId]
  )

  //   关闭模态框
  const close = useCallback(
    () => setEditingTaskId({ editingTaskId: undefined }),
    [setEditingTaskId]
  )
  return {
    editingTask,
    editingTaskId,
    startEdit,
    close,
    isLoading,
  }
}
