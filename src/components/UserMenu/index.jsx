import { Either, EnumType } from "jazzi"
import { useState } from "react"
import { Button, Input } from ".."
import { getTab } from "../../firebase/database"
import FlexLayout from "../FlexLayout"
import { useViewManager } from "../ViewManager"

const Errors = EnumType("ValidationError", [
  "NoUserLogin",
  "EmptyTab",
  "TabNotFound",
  "CodeLength",
])

const UserMenu = () => {
  const [tabNumber, setTabNumber] = useState("")
  const manager = useViewManager()

  const submitTab = async () => {
    try {
      const user = await Either.fromMaybe(manager.user).mapLeft(
        () => Errors.NoUserLogin
      )

      const tabId = await Either.fromFalsy(Errors.EmptyTab, tabNumber).chain((t) => {
        return Either.fromPredicate(() => t.length === 12, t).mapLeft(
          () => Errors.CodeLength
        )
      })

      const tab = await Either.fromNullish(Errors.TabNotFound, await getTab(tabId))

      await Either.fromPredicate(() => tab.members?.find((x) => x === user.userId))
        .map(() => {
          console.log("Found it with you in it")
          return {}
        })
        .mapLeft(() => Errors.TabNotFound)
    } catch (e) {
      e?.match?.({
        NoUserLogin: () => console.log("Please login"),
        EmptyTab: () => console.log("Tab number is required"),
        TabNotFound: () => console.log("Could not find tab with number"),
        CodeLength: () => console.log("Tab number must be 12 digits long"),
      })
    }
  }

  return (
    <FlexLayout direction="column" align="center" justify="flex-start">
      <Input value={tabNumber} onChange={setTabNumber} placeholder="Tab number..." />
      <Button onClick={submitTab} label="Add tab" />
    </FlexLayout>
  )
}

export default UserMenu
