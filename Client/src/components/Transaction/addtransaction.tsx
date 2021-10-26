import React,{Fragment} from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavigationComponent from '../Navigation/navcomponent'
import WelcomenavComponent from "../Welcome/welcomenav";

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
            type:'',
            airport_name:'',
            aircraft_no:0,
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
        if(this.state.type==="IN")
        {
            const reqbody = {type:this.state.type,airport_name:this.state.airport_name,quantity:this.state.quantity}
            console.log(reqbody)
            try{
                const response = await axios.post('http://localhost:9000/transaction',reqbody)
                this.props.history.push("/dashboard")
            }
            catch(e){
                console.log("Invalid Credentials")
            }
        }
        else{
            const reqbody = {type:this.state.type,airport_name:this.state.airport_name,aircraft_no:this.state.aircraft_no,quantity:this.state.quantity}
            console.log(reqbody)
            try{
                await axios.post('http://localhost:9000/transaction',reqbody)
                this.props.history.push("/dashboard")
            }
            catch(e){
                console.log("Invalid Input Data")
            }
        }
        
            
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Type"
              name="email"
              value = {this.state.type}
              onChange={this.handletype}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="airport"
              name="Airport name"
              label="Airport name"
              type="text"
              value={this.state.airport_name}
              onChange={this.handlename}
              autoComplete="current-password"
            />
            {
            this.state.type==="OUT"&&
            <TextField
              margin="normal"
              required
              fullWidth
              name="Aircraft No"
              label="Aircraft No"
              type="number"
              id="password"
              value={this.state.aircraft_no}
              onChange={this.handleno}
              autoComplete="current-password"
            />
            }
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