import React, { Fragment } from "react";
import ImageComponent from '../Image/image'
import logo from '../../images/tim-gouw-OwD1ON8O-O4-unsplash.jpg'
import { isAuthenticated } from "../Auth/authservice";

type propTypes={
    history:any
}
class HomeComponent extends React.Component<propTypes>{
    componentDidMount(){
        if(isAuthenticated())
            this.props.history.push("/dashboard")
    }
    render()
    {
        return(
            <Fragment>
                <ImageComponent signin={true} register = {false} history={this.props.history} logo = {logo}/>
            </Fragment>
        )
    }
}
export default HomeComponent