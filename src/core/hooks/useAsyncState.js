import { useReducer } from "react"
import { nullaryActionCreator, unaryActionCreator } from "redux-utility"

const INIT = {
    loading: true,
    data: null,
    error: null
}

const reducer = (state=INIT,action) => {
    switch(action.type){
        case "start":
            return {
                ...state,
                loading: true,
            }
        case "success":
            return {
                loading: false,
                data: action.payload,
                error: null
            }
        case "fail":
            return {
                loading: false,
                data: null,
                error: action.payload
            }
        default:
            return state
    }
}

const actions = {
    start: nullaryActionCreator("start"),
    success: unaryActionCreator("success"),
    fail: unaryActionCreator("fail")
}

const useAsyncState = ({ lazy=false } = {}) => {
    const initial = lazy ? undefined : INIT
    const [ state, dispatch ] = useReducer(reducer,initial)
    return { state, dispatch, actions, events: {
        start: () => dispatch(actions.start()),
        onSuccess: (data) => dispatch(actions.success(data)),
        onError: (data) => dispatch(actions.fail(data))
    } }
}

export default useAsyncState