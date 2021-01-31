import { createReducer, unaryActionCreator } from "redux-utility"

export const SET_VIEW = "SET_VIEW"

export default createReducer({
    [SET_VIEW]: (_,action) => action?.payload,
})

export const setView = unaryActionCreator(SET_VIEW);