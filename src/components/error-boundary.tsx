import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement

// class ErrorBoundary extends React.Component<{ children: ReactNode, fallbackrender: FallbackRender }> {
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