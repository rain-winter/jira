import { RootState } from './../../store/index'
import { createSlice } from '@reduxjs/toolkit'
import { ProjectListState } from '../../types'

// 默认状态
const initialState: ProjectListState = {
  projectModalOpen: false,
}

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    // toolkit内置immer帮助我们
    openProjectModal(state) {
      state.projectModalOpen = true
    },
    closeProjectModal(state) {
      state.projectModalOpen = false
    },
  },
})

export const projectListActions = projectListSlice.actions
export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOpen
