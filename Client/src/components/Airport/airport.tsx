import React from 'react'
import { Fragment } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postAircraftData } from './airportservice';
import AirplanemodeActiveSharpIcon from '@mui/icons-material/AirplanemodeActiveSharp';
import NavigationComponent from '../Navigation/navcomponent';
import { errormsg } from '../Toast/toastservice';

type statetypes={
    name:string,
    location:string,
    fuelcapacity:number,
    fuelavailable:number
}
type propTypes={
  history:any
}
class AirportController extends React.Component<propTypes,statetypes>{
    constructor(props:propTypes)
    {
        super(props);
        this.state={
            name:'Indira Gandhi International Airport,Delhi',
            location:'',
            fuelcapacity:0,
            fuelavailable:0,
        }
        this.handlename=this.handlename.bind(this);
        this.handlelocation=this.handlelocation.bind(this);
        this.handlefuelav=this.handlefuelav.bind(this);
        this.handlefuelcap=this.handlefuelcap.bind(this);
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
            name:this.state.name,
            fuelavailable:this.state.fuelavailable,
            fuelcapacity:this.state.fuelcapacity
        }
        console.log(reqbody.fuelavailable)
        if(reqbody.name===""||String(reqbody.fuelavailable)===""||String(reqbody.fuelcapacity)==="")
        {
          errormsg("Input is required")
        }
        if(this.state.fuelavailable<0||this.state.fuelcapacity<0)
            return errormsg('Fuel cannot be negative')
        postAircraftData(reqbody)
    }
    render()
    {
        const theme = createTheme();
        return(
            <Fragment>
              <ToastContainer limit={3} autoClose={1500}/>
                <NavigationComponent/>
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
          <AirplanemodeActiveSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Airport
          </Typography>
          <Box component="form" onSubmit={this.handlesubmit} noValidate sx={{ mt: 1 }}>
            <FormControl fullWidth>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.name}
                label="Age"
                onChange={this.handlename}
            >
                <MenuItem value={"Indira Gandhi International Airport,Delhi"}>Indira Gandhi International Airport,Delhi</MenuItem>
                <MenuItem value={"Rajiv Gandhi International Airport,Hyderabad"}>Rajiv Gandhi International Airport,Hyderabad</MenuItem>
                <MenuItem value={"Chhatrapati Shivaji International Airport,Mumbai"}>Chhatrapati Shivaji International Airport,Mumbai</MenuItem>
                <MenuItem value={"Chennai International Airport,Chennai"}>Chennai International Airport,Chennai</MenuItem>
                <MenuItem value={"Kempegowda International Airport,Bangalore"}>Kempegowda International Airport,Bangalore</MenuItem>
            </Select>
          </FormControl>
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
  </Fragment>
        )
    }
}
export default AirportController



