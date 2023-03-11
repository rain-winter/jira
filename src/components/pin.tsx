import React from 'react'
import { Rate } from 'antd'
import { PinProps } from 'types'

/**
 * 星星组件
 * @param param
 * @returns
 */
export const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  )
}
