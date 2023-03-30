/* eslint-disable import/first */
import React from 'react'

export type Raw = string | number
import { TableProps } from 'antd/es/table'
import { Rate, Select } from 'antd'

export interface AuthForm {
  username: string;
  password: string;
}

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
  projectButton: JSX.Element
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


export interface ProjectListState {
  projectModalOpen: boolean
}