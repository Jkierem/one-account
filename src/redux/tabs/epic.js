import { ofType } from 'redux-observable'
import { mapTo, mergeMap, withLatestFrom } from 'rxjs/operators'
import { tabsFetch, tabError, tabSuccess, TAB_FETCH } from '.'
import { getTab } from '../../firebase/database'
import { LOGIN_SUCCESS, SET_SUBS } from '../user'

export const triggerFetchTabs = ($action) => $action.pipe(
    ofType(LOGIN_SUCCESS, SET_SUBS),
    mapTo(tabsFetch())
)

export const fetchTabs = ($action,$state) => $action.pipe(
    ofType(TAB_FETCH),
    withLatestFrom($state),
    mergeMap(([_,state]) => {
        const { subscriptions=[] } = state.user.data
        return Promise.all(subscriptions.map(getTab))
            .then(tabSuccess)
            .catch(tabError)
    })
)