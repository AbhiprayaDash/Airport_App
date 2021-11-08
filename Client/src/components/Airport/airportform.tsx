import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import { postAirportData } from './airportservice';
import AirplanemodeActiveSharpIcon from '@mui/icons-material/AirplanemodeActiveSharp';
import { errormsg } from '../Toast/toastservice';
import Autocomplete from '@mui/material/Autocomplete';

type statetypes={
    name:any,
    location:string,
    fuelcapacity:number,
    fuelavailable:number,
    airports:any
}
type proptypes={
}
var Airports=[
  "Bilaspur Airport,Bilaspur",
  "Swami Vivekananda International Airport,Raipur",
  "Sardar Vallabhbhai Patel International Airport,Ahmedabad",
  "Ambala Air Force Station,Ambala",
  "Shimla Airport,Shimla",
  "Kempegowda International Airport,Bangalore",
  "Chhatrapati Shivaji Maharaj International Airport,Mumbai",
  "Indira Gandhi International Airport,Delhi",
  "Chennai International Airport,Chennai",
]
class AirportForm extends React.Component<proptypes,statetypes>{
    constructor(props:proptypes)
    {
        super(props);
        this.state={
            name:'Indira Gandhi International Airport,Delhi',
            location:'',
            fuelcapacity:0,
            fuelavailable:0,
            airports:[]
        }
    }
    handlename=(event:any,values:any)=>{
        if(values!==null&&values!==undefined)
        {
          console.log(values)
          this.setState({
            name: values
          })
        }
      }
    handlelocation=(event:any)=>{
        this.setState({location: event.target.value});
    }
    handlefuelav=(event:any)=>{
        this.setState({fuelavailable: event.target.value});
    }
    handlefuelcap=(event:any)=>{
        this.setState({fuelcapacity: event.target.value});
    }
    handlesubmit=async (event:any)=>{
        event.preventDefault();
        const reqbody = {
            name:this.state.name,
            fuelavailable:Number(this.state.fuelavailable),
            fuelcapacity:Number(this.state.fuelcapacity)
        }
        const index = Airports.indexOf(reqbody.name)
        if(index>=Airports.length)
            return errormsg("Airport is not available")
        await postAirportData(reqbody,this.state,Airports,index)
    }
    render()
    {
        const theme = createTheme();
        return(
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
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={Airports}
              sx={{ width: 400 }}
              onChange={this.handlename}
              value={this.state.name}
              renderInput={(params:any) => 
              <TextField {...params} label="Airports" 
              value={this.state.name}
              onChange={this.handlename}
              />}
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
        )
    }
}
export default AirportForm