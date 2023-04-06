import {useLocation} from 'react-router-dom'
import {useProject} from 'utils/project'
import {useUrlQueryParam} from "../../utils/url";
import {useMemo} from "react";

// TODO 正则表达式从url取id
export const useProjectIdInUrl = () => {
    const {pathname} = useLocation()
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}
// var pathname = 'www.baidu.com/projects/123'
// ['projects/123', '123', index: 14, input: 'www.baidu.com/projects/123', groups: undefined]

// 返回整个 project
export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({projectId: useProjectIdInUrl()})
export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTaskSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId'])
    const projectId = useProjectIdInUrl()
    return useMemo(() => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: param.name
    }), [projectId, param])
}
export const useTasksQueryKey = () => ['tasks', useTaskSearchParams()]

