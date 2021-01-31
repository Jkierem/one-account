import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from "../../components"
import { useViewManager } from '../../core/hooks'
import auth from '../../firebase/auth'
import { loginSuccess } from '../../redux/user'

const Login = () => {
  const manager = useViewManager()
  const dispatch = useDispatch()
  const handleLogin = () => {
    auth.loginOrRegister()
    .then(loginRes => {
      loginRes
      .when({
        NewUser: () => manager.changeView("Register"),
        OldUser: () => manager.changeView("Home")
      })
      .effect((profile) => {
        dispatch(loginSuccess(profile));
      })
    })
    .catch(console.error)
  }

  return <Button onClick={handleLogin}>Login with Google</Button>
}

export default Login
