import { useUrlQueryParam } from 'utils/url'
import { useMemo } from 'react'

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const
}

export const useProjectModal = () => {
  const [{ projectCreate }, selectProjectCreate] = useUrlQueryParam([
    'projectCreate',
  ])

  const open = () => selectProjectCreate({ projectCreate: true })

  const close = () => selectProjectCreate({ projectCreate: false })
  // url返回的都是字符串
  return [projectCreate === 'true', open, close] as const
}

