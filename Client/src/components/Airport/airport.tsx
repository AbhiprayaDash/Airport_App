import React from 'react'
import axios from 'axios';
import { Fragment } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WelcomeNavigation from '../Welcome/welcomenav'

type statetypes={
    name:string,
    location:string,
    fuelcapacity:number,
    fuelavailable:number,
    responsedata:any
}
type propTypes={
  history:any
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
        try{
            await axios.post('http://localhost:9000/airport',reqbody)
            const response = await axios.get('http://localhost:9000/airport')
            this.setState({responsedata:response.data})
            this.props.history.push("/dashboard")
        }
        catch(e){
            console.log(e)
        }
    }
    render()
    {
        const responsedata:Array<typeProvider> = this.state.responsedata
        const theme = createTheme();
        return(
            <Fragment>
                <WelcomeNavigation/>
                <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Airport
          </Typography>
          <Box component="form" onSubmit={this.handlesubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              type="text"
              value={this.state.name}
              label="Name"
              name="text"
              onChange={this.handlename}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="location"
              value={this.state.location}
              label="Location"
              type="text"
              onChange={this.handlelocation}
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Fuel Available"
              value={this.state.fuelavailable}
              label="Fuel Available"
              type="number"
              onChange={this.handlefuelav}
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Fuel Capacity"
              value={this.state.fuelcapacity}
              label="Fuel Capacity"
              type="number"
              onChange={this.handlefuelcap}
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Airport
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

                <table style={{alignContent:'center',alignItems:'center',marginLeft:'550px',border:'1px solid black'}} className="center">
                <tr>
                    <th style={{border:'1px solid black'}}><h2>Aircraft Name  </h2></th>
                    <th style={{border:'1px solid black'}}><h2>Airport Location</h2></th>
                    <th style={{border:'1px solid black'}}><h2>Fuel Available</h2></th>
                </tr>
                    {
                    responsedata.map(function(value:typeProvider,index:number){
                        return <tr>
                        <td style={{border:'1px solid black'}}><p>Airport Name: {value.details.name}</p></td>
                        <td style={{border:'1px solid black'}}><p>Airport Location: {value.details.location}</p></td>
                        <td style={{border:'1px solid black'}}><p>Fuel Available:{value.fuelavailable}</p></td>
                      </tr>
                    })
                    }
                </table>
            </Fragment>
        )
    }
}
export default AirportController



