import { combineReducers } from "redux"
import loginReducer from "./redux/user"
import tabsReducer from "./redux/tabs"
import selectedReducer from "./redux/selectedTab"
import viewReducer from "./redux/view"

export default combineReducers({
  user: loginReducer,
  tabs: tabsReducer,
  selectedTab: selectedReducer,
  view: viewReducer
})
