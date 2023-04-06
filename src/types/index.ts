/* eslint-disable import/first */
export type Raw = string | number
import { Rate, Select } from 'antd'
import { TableProps } from 'antd/es/table'
import React from 'react'
export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}

export interface Project {
  id: number
  name: string
  personId: number
  pin: boolean
  organization: string
  created: number
}

export interface SearchPanelProps {
  users: User[]
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}

export interface ListProps extends TableProps<Project> {
  users: User[]
  refresh?: () => void
  projectButton?: JSX.Element
}

//获取类型
// import { SelectProps } from 'antd'

type SelectProps = React.ComponentProps<typeof Select>
export interface IdSelectProps
  extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value?: string | number | null | undefined
  onChange?: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string; id: number }[]
}

// 五角星组件
export interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

// 看板
export interface Kanban {
  id: number
  name: string
  projectId: number
}
// 项目
export interface Task {
  id: number
  name: string
  // 经办人
  processorId: number
  projectId: number
  // 任务组
  epicId: number
  kanbanId: number
  // bug or task
  typeId: number
  note: string
}

//
export interface Epic {
  id: number
  name: string
  projectId: number
  // 开始时间
  start: number
  // 结束时间
  end: number
}

export interface TaskType {
  id: number
  name: string
}
