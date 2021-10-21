import React from "react";
import { Redirect } from "react-router";


type stateTypes ={

}
type propTypes = {

}
class LogoutComponent extends React.Component<propTypes,stateTypes>{
    render(){
        localStorage.removeItem("user")
        return(
            <Redirect to={{pathname: "/"}} />
        )
    }
}
export default LogoutComponent