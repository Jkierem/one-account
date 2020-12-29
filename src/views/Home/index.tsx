import { FlexLayout } from "../../components";
import TabList from "../../components/TabList";
import UserMenu from "../../components/UserMenu";

const Home = () => {
    return <FlexLayout direction="row" align="flex-start" justify="center" >
        <TabList />
        <UserMenu />
    </FlexLayout>
}

export default Home;