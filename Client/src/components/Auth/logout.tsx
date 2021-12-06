import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import {successmsg} from '../../services/toastservice'
import 'react-toastify/dist/ReactToastify.css';
type stateTypes ={
    loggedout:boolean
}
type propTypes = {
    history:any
}
class LogoutComponent extends React.Component<propTypes,stateTypes>{
    constructor(props:propTypes)
    {
        super(props)
        this.state={
            loggedout:false
        }
        this.LogoutApp=this.LogoutApp.bind(this)
    }
    componentDidUpdate(){
        if(this.state.loggedout===true)
        {
        successmsg("Logged out successfully")
        setTimeout(
          () => {
              this.props.history.push("/")
            },
        2000
      );
    }
    }
    LogoutApp()
    {
        localStorage.removeItem("user")
        this.setState({loggedout:true})
    }
    render(){
        this.state.loggedout===false&&this.LogoutApp()
        return(
            <Fragment>
                <ToastContainer limit={3} autoClose={1500}/>
            </Fragment>
        )
    }
}
export default LogoutComponent