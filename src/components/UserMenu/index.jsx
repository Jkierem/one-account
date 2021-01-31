import { Either, Maybe } from "jazzi"
import { compose } from "ramda"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { usePathSelector } from "redux-utility"
import { Button, Input } from ".."
import { getTab, subscribeToTab } from "../../firebase/database"
import { setSubs } from "../../redux/user"
import FlexLayout from "../FlexLayout"
import { useViewManager } from "../../core/hooks"
import AccountCreate from "./AccountCreate"
import { Errors } from "./types"

const UserMenu = () => {
  const rawUser = usePathSelector("user.data")
  const [tabNumber, setTabNumber] = useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const manager = useViewManager()

  const showErrorReset = (str) => () => {
    setTabNumber("")
    setError(str)
  }

  const showError = (str) => () => setError(str);

  const submitTab = async () => {
    try {
      const user = await Either.fromMaybe(Maybe.from(rawUser)).mapLeft(
        () => Errors.NoUserLogin
      )

      const tabId = await Either.fromNullish(Errors.EmptyTab, tabNumber)
        .chain((t) => {
          return Either.fromPredicate(() => t.length === 12, t).mapLeft(
            () => Errors.CodeLength
          )
        })
        .map(Number.parseInt)
        .chain((t) => {
          return Either.fromPredicate(
            () => !user.subscriptions?.find((x) => x === t),
            t
          ).mapLeft(() => Errors.AlreadySubbed)
        })

      const tab = await Either.fromNullish(Errors.TabNotFound, await getTab(tabId))

      await Either.fromPredicate(() =>
        tab.members?.find((x) => x === user.id)
      ).mapLeft(() => Errors.NotAMember)

      await subscribeToTab(user.id, tabId)

      dispatch(setSubs([...(user.subscriptions || []), tabId]))
    } catch (e) {
      if (e.match) {
        e?.match?.({
          NoUserLogin: () => manager.changeView("Login"),
          EmptyTab: showError("Tab number is required"),
          TabNotFound: showErrorReset("Could not find tab with number"),
          NotAMember: showErrorReset("Could not find tab with number"),
          CodeLength: showError("Tab number must be 12 digits long"),
          AlreadySubbed: showErrorReset("Cannot resub to already subbed account"),
        })
      } else {
        console.error("Unkown error catched", e)
      }
    }
  }

  return (
    <FlexLayout direction="row" justify="center" align="center">
      <FlexLayout direction="column" align="center" justify="flex-start">
        <Input
          value={tabNumber}
          onChange={compose(() => setError(""), setTabNumber)}
          placeholder="Tab number..."
        />
        <Button onClick={compose(() => setError(""), submitTab)} label="Subscribe" />
        {error && <div>{error}</div>}
      </FlexLayout>
      <AccountCreate user={rawUser} manager={manager} />
    </FlexLayout>
  )
}

export default UserMenu
