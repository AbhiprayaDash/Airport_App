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
    airline:string,
    AircraftList:Array<number>
}
type propTypes={
}

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
            AircraftList:[]
        }
    }
    componentDidMount()
    {
        const loaddata = async ()=>{
            try{
                const result:any = await axios.get('http://localhost:9000/aircraftlist/')
                this.setState({AircraftList:result.data[0].aircraftlist})
                this.setState({number:result.data[0].aircraftlist[0]})
            }
            catch(e:any)
            {
                console.log(e)
            }
        }
        loaddata()
    }
    handlenumber=(event:any,value:any)=>{
      if(value!==null&&value!==undefined)
      {
        this.setState({
          number: value
        })
      }
    }
    handleairline = (event:any,value:any)=>{
      if(value!==null&&value!==undefined)
      {
        this.setState({
          airline: value.label
        })
      }
    }
    handlesubmit=async (event:any)=>{
        event.preventDefault();
        const reqbody = {
            aircraft_no:this.state.number,
            airline:this.state.airline
        }
        try{
            await axios.post('http://localhost:9000/aircraft',reqbody)
            var indexvalue = this.state.AircraftList.indexOf(Number(reqbody.aircraft_no))
            await axios.delete('http://localhost:9000/aircraftlist', { data: {indexvalue}, headers: { "Authorization": "***" } });
            successmsg("Aircraft Added Successfully")
            const result:any = await axios.get('http://localhost:9000/aircraftlist/')
            this.setState({AircraftList:result.data[0].aircraftlist})
            this.setState({number:result.data[0].aircraftlist[0]})
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
                options={this.state.AircraftList}
                sx={{ width: 400 }}
                value={this.state.number}
                onInputChange={this.handlenumber}
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