import { useEffect, useState } from "react"
import { getUserInfo } from "../../firebase/database";
import useAsyncState from "./useAsyncState";

const useGetUsers = (userIds,config={}) => {

    const { events, state } = useAsyncState(config)

    useEffect(() => {
        Promise.all(userIds.map(getUserInfo))
        .then(events.onSuccess)
        .catch(events.onError)
    },[userIds])

    return state
}

export default useGetUsers;