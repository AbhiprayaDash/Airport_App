import React, { Fragment } from "react";
import axios from "axios";
import isAuthenticated from "./authservice";

class LoginComponent extends React.Component{
    constructor(props)
    {
        super(props);
        this.props=props;
        this.state={
            password:'',
            email:'',
            errormsg:'',
            loggedin:false
        }
        this.handlemail=this.handlemail.bind(this);
        this.handlepassword=this.handlepassword.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);
    }
    handlemail(event){
        this.setState({email: event.target.value});
        this.setState({errormsg:''})
    }
    handlepassword(event){
        this.setState({password: event.target.value});
        this.setState({errormsg:''})
    }
    handlesubmit=async (event)=>{
        event.preventDefault();
        const reqbody = {email:this.state.email,password:this.state.password}
        console.log(reqbody)
        try{
            const response = await axios.post('http://localhost:9000/user/signin',reqbody)
            console.log('user loggged in');
            const Accesstoken = response.data
            if(Accesstoken)
            {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            this.setState({loggedin:true});
            this.props.history.push("/welcome")
        }
        catch(e){
            this.setState({errormsg:'Invalid Credentials'})
            console.log(e)
        }
    }
    render()
    {
        isAuthenticated(this.state.loggedin);
        return(
            <Fragment>
                <form onSubmit={this.handlesubmit}>
                    <label for="email">Email</label><br/>
                    <input type="text" value={this.state.email} placeholder="email" onChange={this.handlemail}/><br/>
                    <label for="password">Password:</label><br/>
                    <input type="text" value={this.state.password} placeholder="password" onChange={this.handlepassword}/><br/>
                    <input type="submit" value="Submit"/>
                </form>
                <h1>{this.state.errormsg}</h1>
            </Fragment>
        )
    }
}
export default LoginComponent