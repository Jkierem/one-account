import { createAsyncState } from "redux-utility"

const tabReducer = createAsyncState("TAB",{ nested: false })

const {
  fetch: TAB_FETCH,
  success: TAB_SUCCESS,
  error: TAB_ERROR,
} = tabReducer.constants

const {
  fetch: tabsFetch,
  success: tabSuccess,
  error: tabError,
} = tabReducer.actions

export default tabReducer

export {
  TAB_FETCH,
  TAB_SUCCESS,
  TAB_ERROR,
  tabsFetch,
  tabSuccess,
  tabError,
}
