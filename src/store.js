import { createEpicMiddleware } from 'redux-observable'
import { createStore, applyMiddleware } from "redux"
import { getDevtoolsCompose } from "redux-utility"

import rootEpic from './epic'
import rootReducer from "./reducer"

export const initialState = {
  user: {
    auth: false,
    loading: false,
    data: {},
  },
  tabs: {
    data: [],
    loading: false,
    error: undefined
  },
  selectedTab: undefined,
  view: "Login",
}

const epicMiddleware = createEpicMiddleware()

const initStore = () => {
  const composeEnhancers = getDevtoolsCompose(process.env.NODE_ENV === "development")

  const enhancers = [
    epicMiddleware,
  ]

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...enhancers))
  )

  epicMiddleware.run(rootEpic);

  return store
}

const store = initStore()

export default store
