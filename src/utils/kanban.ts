import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Kanban } from 'types'
import { useHttp } from './http'

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp()

  return useQuery<Kanban[]>(['kanbans', param], () =>
    client('kanbans', { data: param })
  )
}
// 添加看板

export const useAddKanban = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: 'POST',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('kanbans'),
    }
  )
}

export const useDelKanban = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: 'DELETE',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('kanbans'),
    }
  )
}
