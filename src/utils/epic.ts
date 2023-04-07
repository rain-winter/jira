import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Epic } from 'types'
import { useHttp } from 'utils/http'

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp()

  return useQuery<Epic[]>(['epics', param], () =>
    client('epics', { data: param })
  )
}

export const useAddEpic = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        data: params,
        method: 'POST',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('epics'),
    }
  )
}

export const useDeleteEpic = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: 'DELETE',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('epics'),
    }
  )
}
