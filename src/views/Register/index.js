import { Either, EnumType } from "jazzi"
import { compose, isEmpty } from "ramda"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { usePathSelector } from "redux-utility"
import { Button, Input } from "../../components"
import { usernameTaken, saveUsername } from "../../firebase/database"
import { loginSuccess } from "../../redux/user"
import { setView } from "../../redux/view"

const Errors = EnumType("Errors", [
  "EmptyUsername",
  "UsernameTaken",
  "InvalidUsername",
  "InvalidLength",
  "NoSpacesAllowed",
])

const noSpaces = (username) => !Boolean(username.match(/\s/g))
const onlyLetters = (username) => Boolean(username.match(/^[A-Za-z]+$/g))
const validLength = (username) => username.length <= 20 && username.length >= 5

const Register = () => {
  const user = usePathSelector("user.data")
  const [username, setUsername] = useState("")
  const [error, setError] = useState()
  const resetError = () => setError()
  const dispatch = useDispatch()
  const showError = (str) => () => setError(str)

  const submit = async () => {
    try {
      await Either.fromFalsy(Errors.EmptyUsername, !isEmpty(username))
      await Either.fromFalsy(Errors.NoSpacesAllowed, noSpaces(username))
      await Either.fromFalsy(Errors.InvalidLength, validLength(username))
      await Either.fromFalsy(Errors.InvalidUsername, onlyLetters(username))
      await Either.fromFalsy(Errors.UsernameTaken, !(await usernameTaken(username)))
      await saveUsername(user.id, username)
      dispatch(loginSuccess({ ...user, username }))
      dispatch(setView("Home"))
    } catch (e) {
      e.match({
        EmptyUsername: showError("Username is required"),
        NoSpacesAllowed: showError("No spaces allowed"),
        InvalidLength: showError("Length must be between 5 and 20 characters"),
        InvalidUsername: showError("Only letters from the english alphabet allowed"),
        UsernameTaken: showError("Please use another username"),
      })
    }
  }

  return (
    <div>
      <div>
        Hi {user.fullName}, Please input a unique username to identify yourself
      </div>
      <Input value={username} onChange={compose(resetError, setUsername)} />
      <Button onClick={submit} label="Verify" />
      {error && <div>{error}</div>}
    </div>
  )
}

export default Register
