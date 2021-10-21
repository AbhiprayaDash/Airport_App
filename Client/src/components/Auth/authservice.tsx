import { Redirect } from "react-router";
import { Component } from "react";
export function isAuthenticated():Object{
    var AccessToken:string=localStorage.getItem('user')|| 'null'
    return JSON.parse(AccessToken);
}

type proptypes={

}
export const Logout:any= (props:proptypes)=>{
    return(   
            localStorage.removeItem("user")
         
    )
}
    