import React from 'react'
import axios from 'axios';
import { Fragment } from 'react';

type statetypes={
    number:number,
    airline:string
}
type propTypes={
    
}

class AircraftController extends React.Component<propTypes,statetypes>{
    constructor(props:propTypes)
    {
        super(props);
        this.state ={
            number:0,
            airline:'Indigo',
        }
        this.handlenumber=this.handlenumber.bind(this);
        this.handleairline=this.handleairline.bind(this);
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
        return(
            <Fragment>
                <h1>Add Aiport</h1>
                <form onSubmit={this.handlesubmit}>
                    <label>Aircraft_no:</label><br/>
                    <input type="number" value={this.state.number} placeholder="Aircraft Number" onChange={this.handlenumber}/><br/>
                    <label >Airline:</label><br/>
                    <input type="text" value={this.state.airline} placeholder="Airline" onChange={this.handleairline}/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </Fragment>
        )
    }
}
export default AircraftController