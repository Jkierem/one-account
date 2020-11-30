import { createAsyncState, createReducer, nullaryActionCreator } from "redux-utility"

const state = createAsyncState("LOGIN",{ nested: false })

const {
  fetch: LOGIN_FETCH,
  success: LOGIN_SUCCESS,
  error: LOGIN_ERROR,
} = state.constants

const LOGOUT = "LOGOUT"

const {
  fetch: attemptLogin,
  success: loginSuccess,
  error: loginError,
} = state.actions

const logout = nullaryActionCreator(LOGOUT)

export default createReducer({
  [LOGIN_FETCH]: state.extend.fetch((state: any) => ({ ...state, auth: false })),
  [LOGIN_ERROR]: state.extend.error((state: any) => ({ ...state, auth: false })),
  [LOGIN_SUCCESS]: state.extend.success((state: any) => ({ ...state, auth: true })),
  [LOGOUT]: () => ({ ...state.intialState, auth: false }),
})

export {
  LOGIN_FETCH,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  logout,
  attemptLogin,
  loginSuccess,
  loginError,
}
