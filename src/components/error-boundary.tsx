import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement

// class ErrorBoundary extends React.Component<{ children: ReactNode, fallbackrender: FallbackRender }> {
/**
 * @Param children 子组件
 * @Parma FallbackRender类型的 含有错误信息的jsx元素
 * @Parma error 异常 getDerivedStateFromError接收异常并给error赋值
 */
// 在 App.tsx使用异常边界
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallBackRender: FallbackRender }>, { error: Error | null }> {
    state = {error: null}
    // 当子组件抛出异常，这里会接收到并且调用
    static getDerivedStateFromError(error: Error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return {error};
    }

    render() {
        const {error} = this.state
        const {fallBackRender, children} = this.props
        if (error)
            return fallBackRender({error})
        return children
    }
}