import { useEffect } from "react"
import { getUserInfo } from "../../firebase/database"
import useAsyncState from "./useAsyncState"

const useGetUser = (userId,config={}) => {
    const { events, state } = useAsyncState(config)

    useEffect(() => {   
        getUserInfo(userId)
        .then(events.onSuccess)
        .catch(events.onError)
    },[userId])

    return state
}

export default useGetUser