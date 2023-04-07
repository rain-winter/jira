import { useQuery } from 'react-query'
import { User } from 'types'
import { useHttp } from 'utils/http'

// export const useUsers = (param?: Partial<User>) => {
//   const client = useHttp();
//   const { run, ...result } = useAsync<User[]>();

//   useEffect(() => {
//     run(client("users", { data: cleanObject(param || {}) }));
//   }, [param]);

//   return result;
// };

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp()

  return useQuery<User[]>(['users', param], () =>
    client('users', { data: param })
  )
}
