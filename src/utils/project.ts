import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Project } from 'types'
import { useHttp } from 'utils/http'
/**
 * 获取数据
 * @param param
 * @returns
 */

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  // TODO key-projects param变化再次运行函数
  return useQuery(['projects', param], () =>
    client('projects', { data: param })
  )
}

// export const useProjects = (param?: Partial<Project>) => {
//   const client = useHttp()
//   const { run, ...result } = useAsync<Project[]>()

//   const fetchProjects = () =>
//     client('projects', { data: cleanObject(param || {}) })

//   useEffect(() => {
//     run(fetchProjects(), {
//       retry: fetchProjects,
//     })
//   }, [param])
//   return result
// }

/**
 * 编辑
 */
export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'patch',
        data: params,
      }),
    // 成功后调用这个onSuccess
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
    }
  )
}
// export const useEditProject = () => {
//   const { run, ...asyncRes } = useAsync()
//   const client = useHttp()
//   const mutate = (params: Partial<Project>) => {
//     return run(
//       client(`projects/${params.id}`, {
//         data: params,
//         method: 'PATCH',
//       })
//     )
//   }
//   return {
//     mutate,
//     asyncRes,
//   }
// }

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

export const useDelProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (id: number) =>
      client(`projects/${id}`, {
        method: 'delete',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
    }
  )
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    // {id}改变 再运行
    ['project', { id }],
    () => client(`projects/${id}`),
    //当id有值才触发
    {
      enabled: !!id,
    }
  )
}
