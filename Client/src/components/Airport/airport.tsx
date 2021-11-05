import React,{Fragment} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postAircraftData } from './airportservice';
import AirplanemodeActiveSharpIcon from '@mui/icons-material/AirplanemodeActiveSharp';
import NavigationComponent from '../Navigation/navcomponent';
import { errormsg } from '../Toast/toastservice';
import Autocomplete from '@mui/material/Autocomplete';

type statetypes={
    name:any,
    location:string,
    fuelcapacity:number,
    fuelavailable:number,
    airports:any
}
type propTypes={
  history:any
}
var Airports=[
  {label:"Bilaspur Airport,Bilaspur"},
  {label:"Swami Vivekananda International Airport,Raipur"},
  {label:"Sardar Vallabhbhai Patel International Airport,Ahmedabad"},
  {label:"Ambala Air Force Station,Ambala"},
  {label:"Shimla Airport,Shimla"},
  {label:"Kempegowda International Airport,Bangalore"},
  {label:"Chhatrapati Shivaji Maharaj International Airport,Mumbai"},
  {label:"Indira Gandhi International Airport,Delhi"},
  {label:"Chennai International Airport,Chennai"},
]
class AirportController extends React.Component<propTypes,statetypes>{
    constructor(props:propTypes)
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
        console.log(values.label)
        this.setState({
          name: values.label
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
        Airports=Airports.splice(index,1)
        if(reqbody.name===""||String(reqbody.fuelavailable)===""||reqbody.fuelcapacity===0)
        {
          return errormsg("Input is required")
        }
        if(this.state.fuelcapacity<1000)
        {
          return errormsg("Fuel Capacity cannot be less than 1000")
        }
        if(this.state.fuelavailable<0||this.state.fuelcapacity<0)
            return errormsg('Fuel cannot be negative')
        postAircraftData(reqbody)
    }
    render()
    {
        const theme = createTheme();
        const airports=Airports
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
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={airports}
              sx={{ width: 400 }}
              onChange={this.handlename}
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
    </Fragment>
        )
    }
}
export default AirportController



