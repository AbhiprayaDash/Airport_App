import React, { Component } from "react";
import { Redirect, Route } from "react-router";
import isAuthenticated from "../Auth/authservice"
export const PrivateRoute = ({
    component:Component,
    ...rest
}) =>{
    return(
        <Route {...rest} render = {props=>{
            if(isAuthenticated()){
                return <Component {...props}/>;
            }else{
                return(
                    <Redirect
                        to={{
                            pathname:"/",
                            state:{
                                from:props.location
                            }
                        }}/>
                )
            }                 
        }
      }
      />
    )
} 