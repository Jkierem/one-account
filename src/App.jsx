import React from "react"
import { FlexLayout } from "./components"
import ViewManager, { View } from "./components/ViewManager"
import Home from "./views/Home"
import Login from "./views/Login"

function App() {
  return (
    <FlexLayout fullscreen backgroundColor="white">
      <ViewManager>
        <View path={"Login"} component={Login} />
        <View path={"Home"} component={Home} />
      </ViewManager>
    </FlexLayout>
  )
}

export default App
