import { FC, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {checkFunc, PostTransactionService} from '../../services/transactionService'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import 'react-toastify/dist/ReactToastify.css';
import { errormsg } from "../../services/toastservice";
import { Autocomplete } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useState } from "react";
import { fetchAirport } from "../../Redux/Airport";
import { fetchAircaft } from "../../Redux/Aircraft";
import { ToastContainer } from "react-toastify";
import { FetchTransaction } from "../../Redux/Transaction";


type stateTypes= {
    type:string,
    airport_name:string,
    aircraft_no:Number,
    quantity:Number
}

const TransactionForm:FC =() =>{
    const Airportresult=useAppSelector<Array<any>>((state)=>state.Airport.response);
    const Aircraftresult=useAppSelector<Array<any>>((state)=>state.Aircraft.response); 
    const AirportList=Airportresult.map((airport)=>airport.name)
    const AircraftList=Aircraftresult.map((aircraft)=>aircraft.aircraft_no)
    const [type,setType]=useState<string>('IN')
    const [airport_name,setAirportname] = useState<string>('')
    const [aircraft_no,setAircraftno] = useState<Number>(0)
    const [quantity,setquantity] = useState<Number>(0)
    const theme = createTheme();
    const dispatch = useAppDispatch();
    const state={
        airport:airport_name,
        aircraft_no,
        quantity
    }
    const loaddataAirport=async()=>{
        if(Airportresult.length===0)
        {
          try{
            const fetchfunc=fetchAirport()
            await fetchfunc(dispatch)
          }
          catch(e:any)
          {
            console.log(e)
          }
        } 
    }
    const loaddataAircraft=async()=>{
        if(Aircraftresult.length===0)
        {
          try{
            const fetchfuncAircraft = fetchAircaft()
            await fetchfuncAircraft(dispatch)
          }
          catch(e:any)
          {
            console.log(e)
          }
        }
      }
    useEffect(()=>{
        loaddataAircraft()
        loaddataAirport()
    },[])
    const handletype=(event:any)=>{
        setType(event.target.value);
    }
    const handlename=(event:any,value:any)=>{
      if(value!==null&&value!==undefined)
      {
        setAirportname(value)
      }
    }
    const handleno=(event:any,value:any)=>{
      if(value!==null&&value!==undefined)
      {
        setAircraftno(value)
      }
    }
    const handlequantity=(event:any)=>{
        setquantity(event.target.value);
    }
    const handlesubmit=async (event:any)=>{
        event.preventDefault();
        const state={
          type,
          airport_name,
          aircraft_no,
          quantity
        }
        var statedata:stateTypes = state;
        if(quantity<0)
          return errormsg('Quantity cannot be negative')
        if(quantity<=500)
          return errormsg('Quantity must be greater than 500')
        if(String(quantity)==="")
          return errormsg("Input is Required")
        await PostTransactionService(statedata)    
        setquantity(0)  
        setAirportname('')
        setAircraftno(0)
        setType('IN')
        const fetchfunc=FetchTransaction()
        await fetchfunc(dispatch)
    }
    return(
          <ThemeProvider theme={theme}>
          <ToastContainer limit={3} autoClose={1500}/>
          <div className="container">
            <div className="row">
              <div className="col-12">
              <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} style={{marginTop:'20px'}}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{textAlign:'center'}}>
                      Add Transaction
                    </Typography>
                    <Typography component="h1" variant="h5">
                    </Typography>
                    <Box component="form" onSubmit={handlesubmit} noValidate sx={{ mt: 1 }}>
                    <FormControl fullWidth>
                      <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          style={{width:'70%',marginRight:'auto',marginLeft:'15%'}}
                          value={type}
                          label="Age"
                          onChange={handletype}
                      >
                          <MenuItem value={"IN"}>IN</MenuItem>
                          <MenuItem value={"OUT"}>OUT</MenuItem>
                      </Select>
                      </FormControl>
                      <br/><br/>
                      
                      <Autocomplete
                        id="disable-close-on-select"
                        disableCloseOnSelect
                        options={AirportList}
                        style={{width:'70%',marginRight:'auto',marginLeft:'15%'}}
                        value={airport_name}
                        onChange={handlename}
                        renderInput={(params:any) => 
                        <TextField {...params} label="Airports" 
                        value={airport_name} id="filled-search" variant="filled"
                        />}
                        />
                        <br/>
                      {
                      type==="OUT"&&
                            <Autocomplete
                              id="disable-close-on-select"
                              disableCloseOnSelect
                              options={AircraftList}
                              style={{width:'70%',marginRight:'auto',marginLeft:'15%'}}
                              onChange={handleno}
                              renderInput={(params:any) => 
                            <TextField {...params} label="Aircraft number" 
                                value={aircraft_no} id="filled-search" variant="filled"
                              />}
                            />
                      }
                      
                      <TextField
                        margin="normal"
                        required
                        style={{width:'70%',marginRight:'auto',marginLeft:'15%'}}
                        name="Quantity"
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={handlequantity}
                        id="filled-search" variant="filled"
                      />
                      <div className="ui pointing label" style={{marginRight:'auto',marginLeft:'10%'}}>
                            Please enter a positive value less than fuel capacity
                      </div>
                      <br/><br/>
                      {
                        checkFunc(state)===true&&<Button
                          type="submit"
                          style={{width:'70%',marginRight:'auto',marginLeft:'15%'}}
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Add Transaction
                        </Button>
                      }
                      {
                        checkFunc(state)===false&&<Button
                          type="submit"
                          disabled
                          style={{width:'70%',marginRight:'auto',marginLeft:'15%'}}
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Add Transaction
                        </Button>
                      }
                    </Box>
                  </Box>
              </div>
            </div>
          </div>
    </ThemeProvider>
        )
}
export default TransactionForm