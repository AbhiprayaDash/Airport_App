import React, { Fragment } from "react";
import axios from "axios";

type statetypes={
    password:string,
    email:string,
    errormsg:string,
    loggedin:boolean
}
type propTypes={
    history:any
}
class LoginComponent extends React.Component<propTypes,statetypes>{
    constructor(props:propTypes)
    {
        super(props);
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
    handlemail(event:any){
        this.setState({email: event.target.value});
        console.log(this.state.email)
        this.setState({errormsg:''})
    }
    handlepassword(event:any){
        this.setState({password: event.target.value});
        this.setState({errormsg:''})
    }
    handlesubmit=async (event:any)=>{
        event.preventDefault();
        const reqbody = {email:this.state.email,password:this.state.password}
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
        return(
            <Fragment>
                <form onSubmit={this.handlesubmit}>
                    <label >Email</label><br/>
                    <input type="text" value={this.state.email} placeholder="email" onChange={this.handlemail}/><br/>
                    <label >Password:</label><br/>
                    <input type="text" value={this.state.password} placeholder="password" onChange={this.handlepassword}/><br/>
                    <input type="submit" value="Submit"/>
                </form>
                <h1>{this.state.errormsg}</h1>
            </Fragment>
        )
    }
}
export default LoginComponent