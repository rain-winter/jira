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
