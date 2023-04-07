import { useTaskTypes } from 'utils/task-type'
import { IdSelect } from './id-select'
import React from 'react'

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: taskTypes } = useTaskTypes()
  return <IdSelect options={taskTypes || []} {...props} />
}
