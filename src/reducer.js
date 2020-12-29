import { combineReducers } from "redux"
import loginReducer from "./redux/user"

export default combineReducers({
  user: loginReducer,
})
