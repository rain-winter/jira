/* eslint-disable import/first */
export type Raw = string | number
import React from 'react'
import { TableProps } from 'antd/es/table'
import { Rate, Select } from 'antd'
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
  setProjectModalOpen: (isOpen: boolean) => void
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
