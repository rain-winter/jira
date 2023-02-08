import { User } from '../pages/product-list/search-panel'
import { useHttp } from './http'
import { useAsync } from './use-async'
import { useEffect } from 'react'
import { cleanObject } from './index'
import { useQuery } from 'react-query'

// export const useUsers = (param?: Partial<User>) => {
//     const client = useHttp();

//     return useQuery<User[]>(["users", param], () =>
//       client("users", { data: param })
//     );
//   };

/**
 * 发送用户请求
 * @param param
 */
export const useUsers = (param?: Partial<User>) => {
  const client = useHttp()
  // data，error，setData被解构成 result
  const { run, ...result } = useAsync<User[]>()
  useEffect(() => {
    run(client('users', { data: cleanObject(param) || [] }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])
  return result
}
