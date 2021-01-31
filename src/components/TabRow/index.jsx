import getClassName from "getclassname"
import { useDispatch } from "react-redux";
import { setSelectedTab } from "../../redux/selectedTab";
import { useViewManager } from '../../core/hooks'
import Button from "../Button";

const TabRow = ({ tab }) => {
    const manager = useViewManager()
    const dispatch = useDispatch()
    const { name, members, id } = tab;

    const handleView = () => {
        dispatch(setSelectedTab(tab));
        manager.changeView("Details");
    }

    const root = getClassName({ base: "tabrow" });
    const idCl = root.extend("&__id")
    const nameCl = root.extend("&__name")
    const membersCl = root.extend("&__members");
    const buttonCl = root.extend("&__view")

    return <div className={root}>
        <div className={idCl}>{id}</div>
        <div className={nameCl}>{name}</div>
        <div className={membersCl}>{members.length} Member(s)</div>
        <div className={buttonCl}>
            <Button label="View" onClick={handleView}/>
        </div>
    </div>
}

export default TabRow