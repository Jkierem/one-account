import {
  createReducer,
  nullaryActionCreator,
  unaryActionCreator,
} from "redux-utility"

export const SET_SELECTED = "SET_SELECTED"
export const RESET_SELECTED = "RESET_SELECTED"

const fromPayload = (_,action) => action?.payload

export default createReducer({
  [SET_SELECTED]: fromPayload,
  [RESET_SELECTED]: () => null,
})

export const setSelectedTab = unaryActionCreator(SET_SELECTED)
export const resetSelectedTab = nullaryActionCreator(RESET_SELECTED)
