import React from 'react'
import axios from 'axios';
import { Fragment } from 'react';

type statetypes={
    number:number,
    airline:string,
    response:any
}
type propTypes={
    
}
interface typeProvider{
    aircraft_no:number,
    airline:string
}
class AircraftController extends React.Component<propTypes,statetypes>{
    constructor(props:propTypes)
    {
        super(props);
        this.state ={
            number:0,
            airline:'Indigo',
            response:[],
        }
        this.handlenumber=this.handlenumber.bind(this);
        this.handleairline=this.handleairline.bind(this);
    }
    componentDidMount()
    {
        var loaddata = async()=>{
            const response = await axios.get('http://localhost:9000/aircraft')
            this.setState({response:response.data})
        }
        loaddata()
    }
    componentDidUpdate()
    {
        console.log('mounted')
        var loaddata = async()=>{
            console.log('inside the loaddata function')
            const response = await axios.get('http://localhost:9000/aircraft')
            if(this.state.response!==response)
            {
                this.setState({response:response.data})
            }
        }
        loaddata()
    }
    handlenumber(event:any){
        this.setState({number: event.target.value});
    }
    handleairline(event:any){
        const val:string = event.target.value
        this.setState({airline: val});
    }
    handlesubmit=async (event:any)=>{
        event.preventDefault();
        const reqbody = {
            aircraft_no:this.state.number,
            airline:this.state.airline
        }
        console.log(reqbody)
        try{
            const response = await axios.post('http://localhost:9000/aircraft',reqbody)
            console.log(response);
        }
        catch(e){
            console.log(e)
        }
    }
    render()
    {
        const responsedata:Array<typeProvider> = this.state.response
        console.log(responsedata)
        
        return(
            <Fragment>
                <h1>Add Aircraft</h1>
                <form onSubmit={this.handlesubmit}>
                    <label>Aircraft_no:</label><br/>
                    <input type="number" value={this.state.number} placeholder="Aircraft Number" onChange={this.handlenumber}/><br/>
                    <label >Airline:</label><br/>
                    <input type="text" value={this.state.airline} placeholder="Airline" onChange={this.handleairline}/><br/>
                    <input type="submit" value="Submit"/>
                </form>
                <ul>
                {
                    
                    responsedata.map(function(value:typeProvider,index:number){
                        return <h1><li key={index}>Aircraft no:{value.aircraft_no} Airline:{value.airline}</li></h1>
                    })
                }
                </ul>
            </Fragment>
        )
    }
}
export default AircraftController