import { Maybe } from "jazzi";
import { useState } from "react";
import { Button, Input } from "..";
import { getTab } from "../../firebase/database";
import FlexLayout from "../FlexLayout";
import { useViewManager } from "../ViewManager";

const UserMenu: React.FC<{}> = () => {
    const [ tabNumber, setTabNumber] = useState<string>("")
    const manager = useViewManager()

    const submitTab = () => {
        const idk = Maybe.do(function*(){
            const user = yield manager.user
            const tabId = yield Maybe.from(tabNumber)
            return Maybe.pure([user, tabId])
        })

        console.log(idk)
    }
    
    return <FlexLayout direction="column" align="center" justify="flex-start" >
        <Input onChange={setTabNumber} placeholder="Tab number..."/>
        <Button onClick={submitTab} label="Add tab"/>
    </FlexLayout>
}

export default UserMenu;