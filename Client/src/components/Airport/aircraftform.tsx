import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { errormsg, successmsg } from '../Toast/toastservice';
import LocalAirportSharpIcon from '@mui/icons-material/LocalAirportSharp';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';


type statetypes={
    number:number,
    airline:string
}
type propTypes={
}

const aircrafts=[
    {label:"162"},
    {label:"15267"},
    {label:"4271"},
    {label:"9847"},
    {label:"5842"},
    {label:"3849"},
    {label:"124"},
    {label:"284"}
]
const airline =[
    {label:"Air India"},
    {label:"IndiGo"},
    {label:"SpiceJet"},
    {label:"Go Air"}
]
class AircraftForm extends React.Component<propTypes,statetypes>{
    constructor(props:propTypes)
    {
        super(props);
        this.state ={
            number:162,
            airline:'IndiGo',
        }
        this.handlenumber=this.handlenumber.bind(this);
        this.handleairline=this.handleairline.bind(this);
    }
    handlenumber(event:any,values:any){
      console.log(values)
      if(values!==null&&values!==undefined)
      {
        console.log(values.label)
        this.setState({
          number: values.label
        })
      }
    }
    handleairline(event:any,values:any){
        console.log(values)
      if(values!==null&&values!==undefined)
      {
        this.setState({
          airline: values.label
        })
      }
    }
    handlesubmit=async (event:any)=>{
        event.preventDefault();
        const reqbody = {
            aircraft_no:this.state.number,
            airline:this.state.airline
        }
        console.log(reqbody)
        try{
             await axios.post('http://localhost:9000/aircraft',reqbody)
            successmsg("Aircraft Added Successfully")
        }
        catch(e:any){
            errormsg(e.response.data)
        }
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
            <Typography component="h1" variant="h5">
            Add Aircraft
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LocalAirportSharpIcon />
          </Avatar>
          <Box component="form" onSubmit={this.handlesubmit} noValidate sx={{ mt: 1 }}>
            <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={aircrafts}
                sx={{ width: 400 }}
                onChange={this.handlenumber}
                renderInput={(params:any) => 
            <TextField {...params} label="Aircraft number" 
                value={this.state.number}
             />}
            />
          <Autocomplete
                id="disable-close-on-select"
                disableCloseOnSelect
                options={airline}
                sx={{ width: 400 }}
                onChange={this.handleairline}
                renderInput={(params:any) => 
            <TextField {...params}
                value={this.state.airline} label="Airline" fullWidth
             />}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Aircraft
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    )
  }
    
}
export default AircraftForm