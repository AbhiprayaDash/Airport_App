import React, { Fragment } from "react";
import NavigationComponent from "../Navigation/navcomponent";
import ImageComponent from '../Image/image'
import logo from '../../images/tim-gouw-OwD1ON8O-O4-unsplash.jpg'
import { isAuthenticated } from "../Auth/authservice";

type propTypes={
    history:any
}
class HomeComponent extends React.Component<propTypes>{
    componentDidMount(){
        if(isAuthenticated())
            this.props.history.push("/welcome")
    }
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