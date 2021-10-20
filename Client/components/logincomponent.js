import React, { Fragment } from 'react'

class LoginComponent extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            name:'',
            password:'',
            email:'',
        }
    }

    render()
    {
        return(
            <Fragment>
                <form onSubmit={this.handlesubmit}>
                    <label for="fname">Name:</label><br/>
                    <input type="text" value={this.state.name} placeholder="name" onChange={this.handlename}/><br/>
                    <label for="email">Email</label><br/>
                    <input type="text" value={this.state.email} placeholder="email" onChange={this.handleemail}/><br/>
                    <label for="password">Password:</label><br/>
                    <input type="text" value={this.state.password} placeholder="password" onChange={this.handlepassword}/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </Fragment>
        )
    }
}