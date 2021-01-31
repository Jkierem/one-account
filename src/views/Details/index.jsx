import { useDispatch } from "react-redux";
import { usePathSelector } from "redux-utility";
import { Button, FlexLayout, Title } from "../../components";
import { resetSelectedTab } from "../../redux/selectedTab";
import { setView } from "../../redux/view";
import { Colors, padding } from '../../core/styles'
import { useGetUser, useGetUsers } from "../../core/hooks";
import { useMemo } from "react";

const Details = () => {
    const { name, owner, id, members: rawMembers } = usePathSelector("selectedTab");
    const dispatch = useDispatch()

    const members = useMemo(() => rawMembers.filter(x => x !== owner),[owner,rawMembers])

    const { loading: loadingOwner, data: ownerData } = useGetUser(owner);
    const { loading: loadingMembers, data: memberData } = useGetUsers(members);
    const loading = loadingMembers || loadingOwner
    
    const goBack = () => {
        dispatch(resetSelectedTab())
        dispatch(setView("Home"))
    }


    return <FlexLayout fullscreen direction="column" justify="flex-start" align="flex-start" >
        <FlexLayout 
            direction="row" 
            justify="flex-start" 
            align="center" 
            padding={padding("large")} 
            width="100%"
            backgroundColor={Colors.primary}
            style={{
                boxSizing: "border-box"
            }}
        >
            <Button onClick={goBack}>Go back</Button>
            <Title size="big" color={Colors.white}>{name}: {id}</Title>
        </FlexLayout>
        <FlexLayout direction="column">
            <Title>Owner</Title>
            {!loading && <div>{ownerData.fullName}</div>}
        </FlexLayout>
        <FlexLayout direction="column">
            <Title size="medium">Members</Title>
            <ul>
            {!loading && memberData.length ? memberData.map(member => {
                return <li>Username: {member.fullName}</li>
            }) : <li>-- No members --</li>}
            </ul>
        </FlexLayout>
        <FlexLayout>
            <Title>Balances</Title>
        </FlexLayout>
        <FlexLayout>
            <Title>Transaction History</Title>
        </FlexLayout>
    </FlexLayout>
}

export default Details;