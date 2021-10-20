import React from "react";
import { Fragment } from "react";
import axios from "axios";
class WelcomeComponent extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            name:'',
            location:'',
            fuelcapacity:0,
            fuelavailable:0,
        }
        this.handlename=this.handlename.bind(this);
        this.handlelocation=this.handlelocation.bind(this);
        this.handlefuelav=this.handlefuelav.bind(this);
        this.handlefuelcap=this.handlefuelcap.bind(this);
    }
    handlename(event){
        this.setState({name: event.target.value});
    }
    handlelocation(event){
        this.setState({location: event.target.value});
    }
    handlefuelav(event){
        this.setState({fuelavailable: event.target.value});
    }
    handlefuelcap(event){
        this.setState({fuelcapacity: event.target.value});
    }
    handlesubmit=async (event)=>{
        event.preventDefault();
        const reqbody = {name:this.state.name,email:this.state.email,password:this.state.password}
        console.log(reqbody)
        try{
            const response = await axios.post('http://localhost:9000/user/signup',reqbody)
            const token = response.data.token
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
                <h1>Add Aiport</h1>
                <form onSubmit={this.handlesubmit}>
                    <label for="fname">Name:</label><br/>
                    <input type="text" value={this.state.name} placeholder="name" onChange={this.handlename}/><br/>
                    <label for="email">Location</label><br/>
                    <input type="text" value={this.state.location} placeholder="Location" onChange={this.handlelocation}/><br/>
                    <label for="password">Fuel Available:</label><br/>
                    <input type="text" value={this.state.fuelavailable} placeholder="Fuel Available" onChange={this.handlefuelav}/><br/>
                    <label for="password">Fuel Capacity:</label><br/>
                    <input type="text" value={this.state.fuelcapacity} placeholder="Fuel Capacity" onChange={this.handlefuelcap}/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </Fragment>
        )
    }
}
export default WelcomeComponent