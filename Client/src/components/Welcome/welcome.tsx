import React, { Fragment } from "react";
import ImageComponent from "../Image/image";
import WelcomeNavigation from "./welcomenav";

class WelcomeComponent extends React.Component{
    render()
    {
        return(
            <Fragment>
            <WelcomeNavigation/>
            <ImageComponent/>
            </Fragment>
        )
    }
}
export default WelcomeComponent