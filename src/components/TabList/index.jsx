import { Maybe } from "jazzi"
import { usePathSelector } from "redux-utility"
import { Title } from ".."
import FlexLayout from "../FlexLayout"
import TabRow from "../TabRow"

const mapMap = (nestedFctor, fn) =>
  nestedFctor.map((innerFctor) => innerFctor.map(fn))

const TabList = () => {
  const { loading, data: tabs } = usePathSelector("tabs")

  const mTabs = Maybe.fromArray(tabs || [])

  return (
    <FlexLayout direction="column" align="flex-start" justify="flex-start">
      <Title size="medium">Subscribed Tabs</Title>
      {loading ? (
        <div>Loaing tabs...</div>
      ) : (
        mapMap(mTabs, (sub) => <TabRow key={sub.id} tab={sub} />).onNone(() => (
          <div>-- No tabs --</div>
        ))
      )}
    </FlexLayout>
  )
}

export default TabList
