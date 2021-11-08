import React, { Fragment } from "react";
import NavigationComponent from '../Navigation/navcomponent'
import 'react-toastify/dist/ReactToastify.css';
import LoginFormComponent from "./loginform";

type statetypes={
    password:string,
    email:string,
    loggedin:boolean
}
type propTypes={
    history?:any
}
class LoginComponent extends React.Component<propTypes,statetypes>{
    render()
    {
        return(
          <Fragment>
          <NavigationComponent/>
          <LoginFormComponent history={this.props.history}/>
          </Fragment>
        )
    }
}
export default LoginComponent






