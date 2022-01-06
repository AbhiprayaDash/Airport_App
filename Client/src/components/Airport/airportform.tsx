import  { FC, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import {checkInput, airportformhandler } from '../../services/airportservice';
import AirplanemodeActiveSharpIcon from '@mui/icons-material/AirplanemodeActiveSharp';
import { errormsg } from '../../services/toastservice';
import Autocomplete from '@mui/material/Autocomplete';
import {  FetchAirportList } from '../../Redux/Airport';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { saveAirportName } from '../../Redux/AirportSlice';
import { ToastContainer } from 'react-toastify';
import InvalidPage400component from '../InvalidPage/400page';

const AirportForm:FC = () =>{
    const [fuelcapacity,setfuelcapacity] = useState<number>(0)
    const [fuelavailable,setfuelavailable] = useState<number>(0)
    const AirportList:any = useAppSelector((state:any) => state.Airport.AirportList);
    const name:string = useAppSelector((state:any)=>state.Airport.name)
    const dispatch = useAppDispatch();
    const state={
      name,
      fuelcapacity,
      fuelavailable
    }
    const loaddata = async()=>{
      if(AirportList.length===0)
      {
        try{
          const fetchfunc=FetchAirportList()
          await fetchfunc(dispatch)
        }
        catch(e:any)
        {
            console.log(e)
        }
      }
    }
    useEffect(() => {
        loaddata()
    }, []);
    const handlename=(event:any,value:any)=>{
        if(value!==null&&value!==undefined)
        {
          dispatch(saveAirportName(value))
        }
    }
    const handlefuelav=(event:any)=>{
        setfuelavailable(event.target.value);
    }
    const handlefuelcap=(event:any)=>{
        setfuelcapacity(event.target.value);
    }
    const handlesubmit=async (event:any)=>{
        event.preventDefault();
        const reqbody = {
            name:name,
            fuelavailable:Number(fuelavailable),
            fuelcapacity:Number(fuelcapacity)
        }
        const index = AirportList.indexOf(reqbody.name)
        if(index>=AirportList.length)
            return errormsg("Airport is not available")
        try{
            airportformhandler(reqbody,state,AirportList,index,dispatch)
            setfuelcapacity(0);
            setfuelavailable(0);
        }
        catch(e)
        {
          <InvalidPage400component/>
        }
    }
    const theme = createTheme();
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
                    <AirplanemodeActiveSharpIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{textAlign:'center'}}>
                      Add Airport
                    </Typography>
                    <Box component="form" onSubmit={handlesubmit} noValidate sx={{ mt: 1 }}>
                    <Autocomplete
                      id="disable-close-on-select"
                      disableCloseOnSelect
                      options={AirportList}
                      style={{width:'70%',marginRight:'auto',marginLeft:'auto'}}
                      value={name}
                      onChange={handlename}
                      renderInput={(params:any) => 
                      <TextField {...params} label="Airports" 
                      value={name} id="filled-number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      />}
                      />
                      <TextField
                        margin="normal"
                        required
                        id="filled-number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="filled"
                        style={{width:'70%',marginRight:'auto',marginLeft:'15%'}}
                        name="Fuel Available"
                        value={fuelavailable}
                        label="Fuel Available"
                        type="number"
                        onChange={handlefuelav}
                      />
                      <div className="ui pointing label" style={{marginRight:'auto',marginLeft:'10%'}}>
                          Please enter a positive value less than fuel capacity
                      </div>
                      <TextField
                        margin="normal"
                        required
                        id="filled-number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="filled"
                        style={{width:'70%',marginRight:'auto',marginLeft:'15%'}}
                        name="Fuel Capacity"
                        value={fuelcapacity}
                        label="Fuel Capacity"
                        type="number"
                        onChange={handlefuelcap}
                      />
                      <div className="ui pointing label" style={{marginRight:'auto',marginLeft:'10%'}}>
                        Please enter a value less than 100000 and greater than 1000
                      </div>
                      <br/><br/>
                      {checkInput(state)===false&&
                          <Button
                            type="submit"
                            disabled
                            style={{width:'70%',marginRight:'auto',marginLeft:'15%'}}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Add Airport
                          </Button>
                      }
                      {checkInput(state)===true&&
                          <Button
                            type="submit"
                            style={{width:'70%',marginRight:'auto',marginLeft:'15%'}}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Add Airport
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
export default AirportForm