import { Either } from "jazzi"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { attemptCreateTab, subscribeToTab } from "../../firebase/database"
import { setSubs } from "../../redux/user"
import Button from "../Button"
import FlexLayout from "../FlexLayout"
import Input from "../Input"
import { Errors } from "./types"

const AccountCreate = ({ user: rawUser, manager }) => {
  const [accountName, setAccountName] = useState("")
  const dispatch = useDispatch()

  const submitCreate = async () => {
    try {
      const user = await Either.fromNullish(Errors.NoUserLogin, rawUser)
      const tab = await attemptCreateTab(user,accountName)
      await subscribeToTab(user.id, tab.id)
      setAccountName("")
      dispatch(setSubs([...(user.subscriptions || []), tab.id]))
    } catch (e) {
      if (e.match) {
        e.match({
          NoUserLogin: () => manager.changeView("Login"),
        })
      } else {
        console.error("Unknown error:", e)
      }
    }
  }

  return (
    <FlexLayout direction="column" align="center" justify="flex-start">
      <Input
        value={accountName}
        onChange={setAccountName}
        placeholder="Tab name..."
      />
      <Button label="Create tab" onClick={submitCreate} />
    </FlexLayout>
  )
}

export default AccountCreate
