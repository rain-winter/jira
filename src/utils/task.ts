import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Task } from 'types'
import { useHttp } from './http'

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()

  return useQuery<Task[]>(['tasks', param], () =>
    client('tasks', { data: param })
  )
}
// 添加任务
export const useAddTask = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Task>) =>
      client('tasks', {
        data: params,
        method: 'POST',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('tasks'),
    }
  )
}

export const useTask = (id: number) => {
  const client = useHttp()

  return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`), {
    enabled: !!id,
  })
}

export const useEditTask = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('tasks'),
    }
  )
}

export const useDelTask = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: 'DELETE',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('tasks'),
    }
  )
}
