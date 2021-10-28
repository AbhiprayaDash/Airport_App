import React from 'react'
import axios from 'axios';
import { Fragment } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { ToastContainer} from 'react-toastify';
import Select from '@mui/material/Select';
import { errormsg, successmsg } from '../Toast/toastservice';
import LocalAirportSharpIcon from '@mui/icons-material/LocalAirportSharp';
import NavigationComponent from '../Navigation/navcomponent';

type statetypes={
    number:number,
    airline:string
}
type propTypes={
    history:any
}
class AircraftController extends React.Component<propTypes,statetypes>{
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
    handlenumber(event:any){
        this.setState({number: event.target.value});
    }
    handleairline(event:any){
        const val:string = event.target.value
        console.log(val)
        this.setState({airline: val});
    }
    handlesubmit=async (event:any)=>{
        event.preventDefault();
        const reqbody = {
            aircraft_no:this.state.number,
            airline:this.state.airline
        }
        try{
            const result = await axios.post('http://localhost:9000/aircraft',reqbody)
            if(result.data==="AircraftExist")
            {
                throw new Error("Aircraft exists");
            }
            successmsg("Aircraft Added Successfully")
        }
        catch(e){
            errormsg("Aircraft exists")
        }
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
            <Typography component="h1" variant="h5">
            Add Aircraft
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LocalAirportSharpIcon />
          </Avatar>
          <Box component="form" onSubmit={this.handlesubmit} noValidate sx={{ mt: 1 }}>
            <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.number}
                label="Age"
                onChange={this.handlenumber}
            >
                <MenuItem value={"162"}>162</MenuItem>
                <MenuItem value={"15267"}>15267</MenuItem>
                <MenuItem value={"4271"}>4271</MenuItem>
                <MenuItem value={"9847"}>9847</MenuItem>
                <MenuItem value={"5842"}>5842</MenuItem>
                <MenuItem value={"3849"}>3849</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.airline}
                label="Age"
                onChange={this.handleairline}
            >
                <MenuItem value={"Air India"}>Air India</MenuItem>
                <MenuItem value={"IndiGo"}>IndiGo</MenuItem>
                <MenuItem value={"SpiceJet"}>SpiceJet</MenuItem>
                <MenuItem value={"Go Air"}>Go Air</MenuItem>
            </Select>
          </FormControl>
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
    </Fragment>
        )
    }
}
export default AircraftController








