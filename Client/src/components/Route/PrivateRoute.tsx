import React from "react";
import { Redirect, Route,RouteProps } from "react-router";
import { isAuthenticated } from "../../services/authservice";

interface proptypes extends RouteProps{
    component:any,
    path:any,
    exact:boolean
}
export const PrivateRoute:React.FC<proptypes> = (props) =>{
    return isAuthenticated()?(
            <Route {...props} component={props.component} render={undefined} />
    ):(
        <Redirect to={{pathname: "/"}} />
      )                 
}
 