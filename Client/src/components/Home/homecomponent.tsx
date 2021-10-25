import React, { Fragment } from "react";
import NavigationComponent from "../Navigation/navcomponent";
import ImageComponent from '../Image/image'
import logo from '../../tim-gouw-OwD1ON8O-O4-unsplash.jpg'

class HomeComponent extends React.Component{
    render()
    {
        return(
            <Fragment>
                <NavigationComponent/>
                <ImageComponent logo = {logo}/>
            </Fragment>
        )
    }
}
export default HomeComponent