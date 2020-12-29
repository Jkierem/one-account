import React, { useContext, useState } from 'react'
import { getTag, Maybe, EnumType } from "jazzi"

const viewList = ["Login","Home","NotFound"];
const Views = EnumType("View",viewList);

const ViewManagerContext = React.createContext({
    view: Views.Login,
    setView: (v) => {},
    changeView: (v) => {},
    user: Maybe.None(),
    setUser: (u) => {} 
});

const View = ({ component , children }) => {
    if( component ){
        const Comp = component;
        return <Comp />
    }
    return <>{children}</>
}
const ViewType = (<View path="" />).type

const ViewComponent = ({ children }) => {
    const { view } = useContext(ViewManagerContext);

    const processed = React.Children.toArray(children).filter((c) => {
        if(c?.type === ViewType){
            return c.props.view ? view.equals(c.props.view) : c.props?.path === getTag(view)
        }
        return true
    });

    return <>{processed}</>
}

const ViewManager = ({ children }) => {
    const [view, setView] = useState(Views.Login)
    const changeView = (v) => {
        if( typeof v === "function" ){
            setView(Views[v(getTag(view))])
        } else {
            setView(Views[v])
        }
    }
    const [user, rawSetUser] = useState(Maybe.None())
    const setUser = (u) => rawSetUser(Maybe.of(u));
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