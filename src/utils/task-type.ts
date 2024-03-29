import { useQuery } from 'react-query'
import { TaskType } from 'types'
import { useHttp } from './http'

export const useTaskTypes = () => {
  const client = useHttp()

  return useQuery<TaskType[]>(['taskTypes'], () => client('taskTypes'))
}
