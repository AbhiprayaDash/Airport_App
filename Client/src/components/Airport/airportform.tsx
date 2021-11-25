import  { FC, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import { postAirportData } from './airportservice';
import AirplanemodeActiveSharpIcon from '@mui/icons-material/AirplanemodeActiveSharp';
import { errormsg } from '../Toast/toastservice';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchAirport, FetchAirportList } from '../../Redux/Airport';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { saveAirportName } from '../../Redux/AirportSlice';
import { ToastContainer } from 'react-toastify';

const AirportForm:FC = () =>{
    const [fuelcapacity,setfuelcapacity] = useState<number>(0)
    const [fuelavailable,setfuelavailable] = useState<number>(0)
    const AirportList:any = useAppSelector((state:any) => state.Airport.AirportList);
    const name:string = useAppSelector((state:any)=>state.Airport.name)
    const dispatch = useAppDispatch();
    
    
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
      console.log(value)
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
        const state={
            name,
            fuelcapacity,
            fuelavailable
        }
        const index = AirportList.indexOf(reqbody.name)
        if(index>=AirportList.length)
            return errormsg("Airport is not available")
        try{
            await postAirportData(reqbody,state,AirportList,index)
            const fetchfunc = FetchAirportList()
            await fetchfunc(dispatch)
            dispatch(saveAirportName(''))
            setfuelcapacity(0);
            setfuelavailable(0);
            const fetchAirports=fetchAirport()
            await fetchAirports(dispatch)
        }
        catch(e)
        {
          console.log(e)
        }
    }
    const theme = createTheme();
        return(
          <ThemeProvider theme={theme}>
            <ToastContainer limit={3} autoClose={1500}/>
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} style={{marginTop:'20px'}}>
            <AirplanemodeActiveSharpIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Airport
            </Typography>
            <Box component="form" onSubmit={handlesubmit} noValidate sx={{ mt: 1 }}>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              options={AirportList}
              sx={{ width: 400 }}
              value={name}
              onInputChange={handlename}
              renderInput={(params:any) => 
              <TextField {...params} label="Airports" 
              value={name}
              />}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Fuel Available"
                value={fuelavailable}
                label="Fuel Available"
                type="number"
                onChange={handlefuelav}
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Fuel Capacity"
                value={fuelcapacity}
                label="Fuel Capacity"
                type="number"
                onChange={handlefuelcap}
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
    )
}
export default AirportForm