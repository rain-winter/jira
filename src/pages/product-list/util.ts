import { useMemo, useState } from 'react'
import { useUrlQueryParam } from 'utils/url'

// 项目列表搜索的参数
export const useProjectSeaechParam = () => {

  const [keys] = useState<('name' | 'personId')[]>(['name', 'personId'])
  const [param, setParam] = useUrlQueryParam(keys)

  // const [param] = useUrlQueryParam(['name','personId']) 会死循环
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const
}
