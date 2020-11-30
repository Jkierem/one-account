import React from 'react'
import { Button, FlexLayout } from "../../components"
import auth from '../../firebase/auth'

const Login = () => {

  const handleLogin = () => {
    auth.loginOrRegister().then(console.log).catch(console.error)
  }

  return (
    <FlexLayout fullscreen backgroundColor="white">
      <Button onClick={handleLogin}>Login</Button>
    </FlexLayout>
  )
}

export default Login
