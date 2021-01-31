import React from "react"
import { FlexLayout } from "./components"
import ViewManager, { View } from "./views/ViewManager"
import Home from "./views/Home"
import Login from "./views/Login"
import Details from "./views/Details"
import Register from "./views/Register"

function App() {
  return (
    <FlexLayout fullscreen backgroundColor="white">
      <ViewManager>
        <View path={"Login"} component={Login} />
        <View path={"Home"} component={Home} />
        <View path={"Details"} component={Details} />
        <View path={"Register"} component={Register} />
      </ViewManager>
    </FlexLayout>
  )
}

export default App
