import  { FC, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { errormsg } from '../../services/toastservice';
import LocalAirportSharpIcon from '@mui/icons-material/LocalAirportSharp';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FetchAircraftList} from "../../Redux/Aircraft"
import {saveAircraftNo} from "../../Redux/AircraftSlice"
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ToastContainer } from 'react-toastify';
import { aircraftformhandler, checkFunc } from '../../services/aircraftservice';

const airlineList =[
    "Air India",
    "IndiGo",
    "SpiceJet",
    "Go Air"
]
const AircraftForm:FC =()=>{
    const [airline,setairline] = useState<string>('')
    var AircraftList:any = useAppSelector((state:any) => state.Aircraft.AircraftList);
    const number:Number = useAppSelector((state:any)=>state.Aircraft.number)
    const theme = createTheme();
    const dispatch = useAppDispatch();
    const state={
      airline,
      number
    }
    const loaddata = async ()=>{
      if(AircraftList.length===0)
      {
        try{
          const fetchfunc = FetchAircraftList()
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

    
    const handleairline = (event:any,value:any)=>{
      if(value!==null&&value!==undefined)
      {
        setairline(value)
      }
    }
    const handlenumber=(event:any,value:any)=>{
      if(value!==null&&value!==undefined)
      {
        dispatch(saveAircraftNo(value))
      }
    }
    const handlesubmit=async (event:any)=>{
        event.preventDefault();
        const reqbody = {
            aircraft_no:number,
            airline:airline
        }
        try{
            aircraftformhandler(AircraftList,reqbody,dispatch)
            setairline('')
        }
        catch(e:any){
            errormsg(e.response.data)
        }
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
                      
                  }}
                  >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} style={{marginLeft:'47%'}}>
                      <LocalAirportSharpIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5" style={{textAlign:'center'}}>
                      Add Aircraft
                  </Typography>
                  <Box component="form" onSubmit={handlesubmit} noValidate sx={{ mt: 1 }}>
                    <Autocomplete
                        id="disable-close-on-select"
                        disableCloseOnSelect
                        options={AircraftList}
                        style={{width:'70%',marginRight:'auto',marginLeft:'15%'}}
                        value={number}
                        onChange={handlenumber}
                        renderInput={(params:any) => 
                    <TextField {...params} label="Aircraft number" 
                        value={number}
                        id="filled-number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="filled"
                    />}
                    />
                    <br/>
                  <Autocomplete
                        id="disable-close-on-select"
                        disableCloseOnSelect
                        options={airlineList}
                        style={{width:'70%',marginRight:'auto',marginLeft:'15%'}}
                        value={airline}
                        onChange={handleairline}
                        renderInput={(params:any) => 
                    <TextField {...params}
                        value={airline} label="Airline" fullWidth id="filled-search" variant="filled"
                    />}
                    />
                    
                    {
                    checkFunc(state)===true&&<Button
                      type="submit"
                      style={{width:'70%',marginRight:'auto',marginLeft:'15%'}}
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Add Aircraft
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
                      Add Aircraft
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
export default AircraftForm

