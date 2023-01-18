import { Select } from 'antd'
import { Raw } from 'types'

// 获取 Select 组件上所有属性
type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps
  extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: Raw | null | undefined
  //就会把value转换成number
  onChange?: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string; id: number }[]
}
/**
 * value可以传入多种类型的值
 * onChange 只会回调number|undefined
 * 当isNaN(Number(value)) == true 代表选择默认类型
 * 当选择默认类型时，onChanger会回调undefined
 * @param props
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...otherProps } = props
  return (
    <Select
      {...otherProps}
      value={toNumber(value)}
      onChange={(value) => onChange?.(toNumber(value))}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  )
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))
