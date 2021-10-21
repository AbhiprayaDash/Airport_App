import React, { Fragment } from 'react'
import axios from 'axios'

type statetypes={
    name:string,
    password:string,
    email:string,
}
type propTypes={
    history:any
}
class SignUpComponent extends React.Component<propTypes,statetypes>{
    constructor(props:propTypes)
    {
        super(props);
        this.state={
            name:'',
            password:'',
            email:'',
        }
        this.handlename=this.handlename.bind(this);
        this.handlemail=this.handlemail.bind(this);
        this.handlepassword=this.handlepassword.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);
    }
    handlemail(event:any){
        this.setState({email: event.target.value});
    }
    handlename(event:any){
        this.setState({name: event.target.value});
    }
    handlepassword(event:any){
        this.setState({password: event.target.value});
    }
    handlesubmit=async (event:any)=>{
        event.preventDefault();
        const reqbody = {name:this.state.name,email:this.state.email,password:this.state.password}
        console.log(reqbody)
        try{
            const response = await axios.post('http://localhost:9000/user/signup',reqbody)
            console.log(response);
        }
        catch(e){
            console.log(e)
        }
    }
    render()
    {
        return(
            <Fragment>
                <form onSubmit={this.handlesubmit}>
                    <label >Name:</label><br/>
                    <input type="text" value={this.state.name} placeholder="name" onChange={this.handlename}/><br/>
                    <label >Email</label><br/>
                    <input type="text" value={this.state.email} placeholder="email" onChange={this.handlemail}/><br/>
                    <label >Password:</label><br/>
                    <input type="text" value={this.state.password} placeholder="password" onChange={this.handlepassword}/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </Fragment>
        )
    }
}
export default SignUpComponent