import {Switch,Route} from 'react-router-dom'
import LoginComponent from './login.js';
import SignUpComponent from './signup.js'
import React from 'react';
class AuthRoute extends React.Component{
    render()
    {
        return(
            <Switch>
                <Route path="/login">
                    <LoginComponent />
                </Route>
                <Route path="/signup">
                    <SignUpComponent />
                </Route>
            </Switch>
        )
    }       
}
export default AuthRoute;
            