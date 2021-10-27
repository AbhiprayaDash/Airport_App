import React,{Fragment} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WelcomenavComponent from "../Welcome/welcomenav";
import {PostTransactionService} from './PostTransactionService'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type stateTypes= {
    type:string,
    airport_name:string,
    aircraft_no:Number,
    quantity:Number
}
type propTypes={
    history:any
}
class AddTransaction extends React.Component<propTypes,stateTypes>{
    constructor(props:propTypes)
    {
        super(props);
        this.state={
            type:'IN',
            airport_name:'Indira Gandhi International Airport,Delhi',
            aircraft_no:162,
            quantity:0
        }
        this.handletype=this.handletype.bind(this);
        this.handlename=this.handlename.bind(this);
        this.handleno=this.handleno.bind(this);
        this.handlequantity = this.handlequantity.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)
    }
    handletype(event:any){
        this.setState({type: event.target.value});
    }
    handlename(event:any){
        this.setState({airport_name: event.target.value});
    }
    handleno(event:any){
        this.setState({aircraft_no:event.target.value});
    }
    handlequantity(event:any){
        this.setState({quantity:event.target.value});
    }
    handlesubmit=async (event:any)=>{
        console.log('submitted')
        event.preventDefault();
        var statedata:stateTypes = this.state;
        var propdata:propTypes = this.props;
        await PostTransactionService(statedata,propdata)      
        console.log('post')    
    }
    render()
    {
        const theme = createTheme();
        return(
            <Fragment>
            <WelcomenavComponent/>
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
            Add Transaction
          </Typography>
          <Typography component="h1" variant="h5">
          </Typography>
          <Box component="form" onSubmit={this.handlesubmit} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth >
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.type}
                label="Age"
                onChange={this.handletype}
            >
                <MenuItem value={"IN"}>IN</MenuItem>
                <MenuItem value={"OUT"}>OUT</MenuItem>
            </Select>
            <br/>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.airport_name}
                label="Age"
                onChange={this.handlename}
            >
                <MenuItem value={"Indira Gandhi International Airport,Delhi"}>Indira Gandhi International Airport,Delhi</MenuItem>
                <MenuItem value={"Rajiv Gandhi International Airport,Hyderabad"}>Rajiv Gandhi International Airport,Hyderabad</MenuItem>
                <MenuItem value={"Chhatrapati Shivaji International Airport,Mumbai"}>Chhatrapati Shivaji International Airport,Mumbai</MenuItem>
                <MenuItem value={"Chennai International Airport,Chennai"}>Chennai International Airport,Chennai</MenuItem>
                <MenuItem value={"Kempegowda International Airport,Bangalore"}>Kempegowda International Airport,Bangalore</MenuItem>
            </Select>
            <br/>
            {
            this.state.type==="OUT"&&
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.aircraft_no}
            label="Age"
            onChange={this.handleno}
        >
            <MenuItem value={"162"}>162</MenuItem>
            <MenuItem value={"15267"}>15267</MenuItem>
            <MenuItem value={"4271"}>4271</MenuItem>
            <MenuItem value={"9847"}>9847</MenuItem>
            <MenuItem value={"5842"}>5842</MenuItem>
            <MenuItem value={"3849"}>3849</MenuItem>
        </Select>
            }
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              name="Quantity"
              label="Quantity"
              type="number"
              id="password"
              value={this.state.quantity}
              onChange={this.handlequantity}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Transaction
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Fragment>
        )
    }
}

export default AddTransaction