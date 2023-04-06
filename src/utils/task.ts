import { useQuery } from 'react-query'
import { Task } from 'types'
import { useHttp } from './http'

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()

  return useQuery<Task[]>(['tasks', param], () =>
    client('tasks', { data: param })
  )
}
