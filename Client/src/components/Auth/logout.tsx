import React from "react";
import { Redirect } from "react-router";


type stateTypes ={

}
type propTypes = {

}
class LogoutComponent extends React.Component<propTypes,stateTypes>{
    constructor(props:propTypes)
    {
        super(props)
    }
    render(){
        localStorage.removeItem("user")
        return(
            <Redirect to={{pathname: "/"}} />
        )
    }
}
export default LogoutComponent