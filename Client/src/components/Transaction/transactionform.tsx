import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {PostTransactionService} from './transactionService'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import 'react-toastify/dist/ReactToastify.css';
import { errormsg } from "../Toast/toastservice";
import { Autocomplete } from "@mui/material";


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
type stateTypes= {
    type:string,
    airport_name:string,
    aircraft_no:Number,
    quantity:Number
}
type propTypes={

}
class TransactionForm extends React.Component<propTypes,stateTypes>{
    constructor(props:propTypes)
    {
        super(props);
        this.state={
            type:'IN',
            airport_name:'Indira Gandhi International Airport,Delhi',
            aircraft_no:162,
            quantity:0
        }
    }
    handletype=(event:any)=>{
        this.setState({type: event.target.value});
    }
    handlename=(event:any,values:any)=>{
      if(values!==null&&values!==undefined)
      {
        this.setState({
          airport_name: values.label
        })
      }
    }
    handleno=(event:any,values:any)=>{
      if(values!==null&&values!==undefined)
      {
        this.setState({
          aircraft_no: values.label
        })
      }
    }
    handlequantity=(event:any)=>{
        this.setState({quantity:event.target.value});
    }
    handlesubmit=async (event:any)=>{
        event.preventDefault();
        var statedata:stateTypes = this.state;
        if(this.state.quantity<0)
          return errormsg('Quantity cannot be negative')
        if(String(this.state.quantity)==="")
          return errormsg("Input is Required")
        await PostTransactionService(statedata)      
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
            </FormControl>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={Airports}
              sx={{ width: 400 }}
              onChange={this.handlename}
              renderInput={(params:any) => 
              <TextField {...params} label="Airports" 
              value={this.state.airport_name}
              />}
              />
            {
            this.state.type==="OUT"&&
                  <Autocomplete
                    id="disable-close-on-select"
                    disableCloseOnSelect
                    options={aircrafts}
                    sx={{ width: 400 }}
                    onChange={this.handleno}
                    renderInput={(params:any) => 
                  <TextField {...params} label="Aircraft number" 
                      value={this.state.aircraft_no}
                    />}
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
        )
    }
}
export default TransactionForm