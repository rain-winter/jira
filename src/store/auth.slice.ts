import { bootstrapUser } from './../context/auth-context'
import { AppDispatch, RootState } from './index'
import { createSlice } from '@reduxjs/toolkit'
import { AuthForm, User } from 'types'
import * as auth from 'auth-provider'
interface State {
  user: User | null
}

const initialState: State = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, aciton) {
      state.user = aciton.payload
    },
  },
})

const { setUser } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user

export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)))

export const register = (form: AuthForm) => (disptch: AppDispatch) =>
  auth.register(form).then((user) => disptch(setUser(user)))

export const logout = () => (disptch: AppDispatch) =>
  auth.logout().then(() => setUser(null))

export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)))
