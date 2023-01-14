import {useState} from "react";

/**
 * 处理 loading
 */

interface State<D> {
    error: Error | null
    data: D | null
    // 状态 默认 加载中 失败 请求成功
    stat: 'idle' | 'loading' | 'error' | 'success'
}

/**
 * 初始的state。stat为默认、数据为空、error为空
 */
const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}
/**
 *
 * @param initialState 用户传递过来的state
 */
export const useAsync = <D>(initialState?: State<D>) => {
    // state 用于接收用户传递来的 initialState
    const [state, setState] = useState({
        ...defaultInitialState,
        ...initialState
    })
    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null
    })
    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null
    })
    /**
     * run用来触发异步请求
     * @param promise
     */
    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) throw new Error('请传入 Promise 类型')
        setState({...state, stat: 'loading'})
        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
            setError(error)
            return error
        })
    }
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }
}