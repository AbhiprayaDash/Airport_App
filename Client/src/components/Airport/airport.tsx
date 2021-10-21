import React from 'react'
import axios from 'axios';
import { Fragment } from 'react';


type statetypes={
    name:string,
    location:string,
    fuelcapacity:number,
    fuelavailable:number,
    responsedata:any
}
type propTypes={

}
type detailObjectType={
    name:string,
    location:string
}
interface typeProvider{
    details:detailObjectType,
    fuelcapacity:number,
    fuelavailable:number
}
class AirportController extends React.Component<propTypes,statetypes>{
    constructor(props:propTypes)
    {
        super(props);
        this.state={
            name:'',
            location:'',
            fuelcapacity:0,
            fuelavailable:0,
            responsedata:[]
        }
        this.handlename=this.handlename.bind(this);
        this.handlelocation=this.handlelocation.bind(this);
        this.handlefuelav=this.handlefuelav.bind(this);
        this.handlefuelcap=this.handlefuelcap.bind(this);
    }
    componentDidMount(){
        var loaddata = async()=>{
            const response = await axios.get('http://localhost:9000/airport')
            this.setState({responsedata:response.data})
        }
        loaddata()
    }
    componentDidUpdate()
    {
        var loaddata = async()=>{
            const response = await axios.get('http://localhost:9000/airport')
            if(this.state.responsedata!==response)
            {
                this.setState({responsedata:response.data})
            }
        }
        loaddata()
    }
    handlename(event:any){
        this.setState({name: event.target.value});
    }
    handlelocation(event:any){
        this.setState({location: event.target.value});
    }
    handlefuelav(event:any){
        this.setState({fuelavailable: event.target.value});
        console.log(this.state.fuelavailable)
    }
    handlefuelcap(event:any){
        this.setState({fuelcapacity: event.target.value});
    }
    handlesubmit=async (event:any)=>{
        event.preventDefault();
        const reqbody = {
            details:{
                name:this.state.name,
                location:this.state.location
            },
            fuelavailable:this.state.fuelavailable,
            fuelcapacity:this.state.fuelcapacity
        }
        console.log(reqbody)
        try{
            const response = await axios.post('http://localhost:9000/airport',reqbody)
            console.log(response);
        }
        catch(e){
            console.log(e)
        }
    }
    render()
    {
        const responsedata:Array<typeProvider> = this.state.responsedata
        console.log(responsedata)
        return(
            <Fragment>
                <h1>Add Aiport</h1>
                <form onSubmit={this.handlesubmit}>
                    <label >Name:</label><br/>
                    <input type="text" value={this.state.name} placeholder="name" onChange={this.handlename}/><br/>
                    <label >Location</label><br/>
                    <input type="text" value={this.state.location} placeholder="Location" onChange={this.handlelocation}/><br/>
                    <label >Fuel Available:</label><br/>
                    <input type="number" value={this.state.fuelavailable} placeholder="Fuel Available" onChange={this.handlefuelav}/><br/>
                    <label >Fuel Capacity:</label><br/>
                    <input type="number" value={this.state.fuelcapacity} placeholder="Fuel Capacity" onChange={this.handlefuelcap}/><br/>
                    <input type="submit" value="Submit"/>
                </form>
                <ul>
                {
                    
                    responsedata.map(function(value:typeProvider,index:number){
                        return <h1><li key={index}>Airport Name:{value.details.name} , Airport Location:{value.details.location} , Fuel Available:{value.fuelavailable}</li></h1>
                    })
                }
                </ul>
            </Fragment>
        )
    }
}
export default AirportController