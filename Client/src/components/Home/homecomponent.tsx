import React, { Fragment } from "react";
import NavigationComponent from "./Navigation/navcomponent";
import ImageComponent from './Image/image'
class HomeComponent extends React.Component{
    render()
    {
        return(
            <Fragment>
                <NavigationComponent/>
                <ImageComponent/>
            </Fragment>
        )
    }
}
export default HomeComponent