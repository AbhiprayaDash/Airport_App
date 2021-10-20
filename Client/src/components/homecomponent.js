import React, { Fragment } from "react";
import NavigationComponent from "./navcomponent";

class HomeComponent extends React.Component{
    render()
    {
        return(
            <Fragment>
                <h1>Welcome to Airport App</h1>
                <NavigationComponent/>
            </Fragment>
        )
    }
}
export default HomeComponent