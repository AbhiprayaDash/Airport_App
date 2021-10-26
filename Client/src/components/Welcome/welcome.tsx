import React, { Fragment } from "react";
import ImageComponent from "../Image/image";
import WelcomeNavigation from "./welcomenav";
import logo from '../../images/phil-mosley-wOK2f2stPDg-unsplash.jpg'


type proptypes = {
    images:any
}
class WelcomeComponent extends React.Component<proptypes>{
    render()
    {
        return(
            <Fragment>
            <WelcomeNavigation/>
            <ImageComponent logo = {logo}/>
            </Fragment>
        )
    }
}
export default WelcomeComponent