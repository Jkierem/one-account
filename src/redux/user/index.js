import { createAsyncState, createReducer, nullaryActionCreator, unaryActionCreator } from "redux-utility"

const state = createAsyncState("LOGIN",{ nested: false })

const {
  fetch: LOGIN_FETCH,
  success: LOGIN_SUCCESS,
  error: LOGIN_ERROR,
} = state.constants

const LOGOUT = "LOGOUT"
const SET_SUBS = "SET_SUBS"

const {
  fetch: attemptLogin,
  success: loginSuccess,
  error: loginError,
} = state.actions

const logout = nullaryActionCreator(LOGOUT)
const setSubs = unaryActionCreator(SET_SUBS);

export default createReducer({
  [LOGIN_FETCH]: state.extend.fetch((state) => ({ ...state, auth: false })),
  [LOGIN_ERROR]: state.extend.error((state) => ({ ...state, auth: false })),
  [LOGIN_SUCCESS]: state.extend.success((state) => ({ ...state, auth: true })),
  [LOGOUT]: () => ({ ...state.intialState, auth: false }),
  [SET_SUBS]: (state,action) => ({ ...state, data: { ...state.data, subscriptions: action.payload } }),
})

export {
  LOGIN_FETCH,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SET_SUBS,
  logout,
  attemptLogin,
  loginSuccess,
  loginError,
  setSubs,
}
