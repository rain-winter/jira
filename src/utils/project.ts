import { cleanObject } from 'utils/index'
import { useEffect } from 'react'
import { useAsync } from 'utils/use-async'
import { useHttp } from 'utils/http'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Project } from 'types'
/**
 * 获取数据
 * @param param
 * @returns
 */
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()
  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {}) }))
  }, [param])
  return result
  // return useQuery<Project[]>(["projects", param], () =>
  //   client("projects", { data: param })
  // );
}

/**
 * 编辑
 */
export const useEditProject = () => {
  const { run, ...asyncRes } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH',
      })
    )
  }
  return {
    mutate,
    asyncRes,
  }
}

export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
    }
  )
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  )
}
