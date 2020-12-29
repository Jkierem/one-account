import React from 'react'
import { Button } from "../../components"
import { useViewManager } from '../../components/ViewManager'
import auth from '../../firebase/auth'

const Login = () => {
  const manager = useViewManager()
  const handleLogin = () => {
    auth.loginOrRegister()
    .then(profile => {
      manager.changeView("Home");
      manager.setUser(profile)
    })
    .catch(console.error)
  }

  return <Button onClick={handleLogin}>Login with Google</Button>
}

export default Login
