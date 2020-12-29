import React, { useContext, useState } from 'react'
import { EnumType, EnumTypeValue, getTag, Maybe } from "jazzi"
import type { UserProfile } from '../../core/models';

const viewList = ["Login","Home","NotFound"] as const;
const Views = EnumType("View",viewList);
type ViewTypes = typeof viewList[number]

interface ManagerContext {
    view: EnumTypeValue;
    setView: (v: EnumTypeValue) => void;
    changeView: (v: ViewTypes | ((v: ViewTypes) => ViewTypes)) => void;
    user: Maybe<UserProfile>
    setUser: (u?: UserProfile) => void
}

const ViewManagerContext = React.createContext({
    view: Views.Login,
    setView: (v: EnumTypeValue) => {},
    changeView: (v: ViewTypes | ((v: ViewTypes) => ViewTypes)) => {},
    user: Maybe.None(),
    setUser: (u?: UserProfile) => {} 
} as ManagerContext);

const View: React.FC<{ view?: EnumTypeValue, path?: string, component?: any }> = ({ component , children }) => {
    if( component ){
        const Comp = component;
        return <Comp />
    }
    return <>{children}</>
}
const ViewType = (<View path="" />).type

const ViewComponent: React.FC<any> = ({ children }) => {
    const { view } = useContext(ViewManagerContext);

    const processed = React.Children.toArray(children).filter((c: any) => {
        if(c?.type === ViewType){
            return c.props.view ? view.equals(c.props.view) : c.props?.path === getTag(view)
        }
        return true
    });

    return <>{processed}</>
}

const ViewManager: React.FC<any> = ({ children }) => {
    const [view, setView] = useState<EnumTypeValue>(Views.Login)
    const changeView = (v: ViewTypes | ((v: ViewTypes) => ViewTypes)) => {
        if( typeof v === "function" ){
            setView(Views[v(getTag(view) as ViewTypes)])
        } else {
            setView(Views[v])
        }
    }
    const [user, rawSetUser] = useState<Maybe<UserProfile>>(Maybe.None())
    const setUser = (u?: UserProfile) => rawSetUser(Maybe.of(u as UserProfile));
    return <ViewManagerContext.Provider value={{ view, user, setView, changeView, setUser}}>
        <ViewComponent>
            {children}
        </ViewComponent>
    </ViewManagerContext.Provider>
}

const useViewManager = () => useContext(ViewManagerContext);

export { 
    View,
    Views,
    useViewManager,
    ViewManagerContext
};

export default ViewManager