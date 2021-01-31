import React from 'react'
import { getTag } from "jazzi"
import { usePathSelector } from 'redux-utility';
import { Views, verifyView } from '../../core/common/Views'

export const View = ({ component , children }) => {
    if( component ){
        const Comp = component;
        return <Comp />
    }
    return <>{children}</>
}

const ViewType = (<View path="" />).type

const ViewManager = ({ children }) => {
    const viewName = usePathSelector("view");
    const view = Views[verifyView(viewName)]

    const processed = React.Children.toArray(children).filter((c) => {
        if(c?.type === ViewType){
            return c.props.view ? view.equals(c.props.view) : c.props?.path === getTag(view)
        }
        return true
    });

    return <>{processed}</>
}

ViewManager.Route = View;
ViewManager.View = View;

export default ViewManager