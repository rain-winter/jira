import {useEffect} from "react";
import {cleanObject} from "./index";
import {Project} from "../pages/product-list/list";
import {useHttp} from "./http";
import {useAsync} from "./use-async";

/**
 * 发送请求，并把data、error、setData等返回出去
 * @param param Partial<Project>
 */
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    // data，error，setData被解构成 result
    const {run, ...result} = useAsync<Project[]>()
    useEffect(() => {
        run(client('projects', {data: cleanObject(param) || []}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return result
}