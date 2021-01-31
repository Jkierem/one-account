import { combineEpics } from "redux-observable";
import { triggerFetchTabs, fetchTabs } from './redux/tabs/epic'

export default combineEpics(
    triggerFetchTabs,
    fetchTabs
)