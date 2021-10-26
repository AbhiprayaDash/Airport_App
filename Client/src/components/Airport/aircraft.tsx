import React from 'react'
import axios from 'axios';
import { Fragment } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WelcomeNavigation from '../Welcome/welcomenav'

type statetypes={
    number:number,
    airline:string,
    response:any
}
type propTypes={
    history:any
}
interface typeProvider{
    aircraft_no:number,
    airline:string
}
class AircraftController extends React.Component<propTypes,statetypes>{
    constructor(props:propTypes)
    {
        super(props);
        this.state ={
            number:0,
            airline:'',
            response:[],
        }
        this.handlenumber=this.handlenumber.bind(this);
        this.handleairline=this.handleairline.bind(this);
    }
    componentDidMount()
    {
        var loaddata = async()=>{
            const response = await axios.get('http://localhost:9000/aircraft')
            this.setState({response:response.data})
        }
        loaddata()
    }
    componentDidUpdate()
    {
        var loaddata = async()=>{
            const response = await axios.get('http://localhost:9000/aircraft')
            if(JSON.stringify(this.state.response)!==JSON.stringify(response.data))
            {
                console.log('added')
                this.setState({response:response.data})
            }
        }
        loaddata()
    }
    handlenumber(event:any){
        this.setState({number: event.target.value});
    }
    handleairline(event:any){
        const val:string = event.target.value
        this.setState({airline: val});
    }
    handlesubmit=async (event:any)=>{
        event.preventDefault();
        const reqbody = {
            aircraft_no:this.state.number,
            airline:this.state.airline
        }
        try{
            await axios.post('http://localhost:9000/aircraft',reqbody)
            const response = await axios.get('http://localhost:9000/aircraft')
            this.setState({response:response.data})
            this.props.history.push("/dashboard")
        }
        catch(e){
            console.log(e)
        }
    }
    render()
    {
        const responsedata:Array<typeProvider> = this.state.response
        const theme = createTheme();
        return(
            <Fragment>
                <WelcomeNavigation/>
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
            <LockOutlinedIcon />
          </Avatar>
          <Box component="form" onSubmit={this.handlesubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="number"
              value={this.state.number}
              label="Aircraft Number"
              name="text"
              onChange={this.handlenumber}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Airlines"
              value={this.state.airline}
              label="Airlines"
              type="text"
              onChange={this.handleairline}
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
    <table style={{alignContent:'center',alignItems:'center',marginLeft:'780px',border:'1px solid black'}} className="center">
               <tbody>
                <tr>
                    <th style={{border:'1px solid black'}}><h2>Aircraft No  </h2></th>
                    <th style={{border:'1px solid black'}}><h2>Airplane</h2></th>
                </tr>
                    {
                    responsedata.map(function(value:typeProvider,index:number){
                        return <tr key={index}>
                        <td style={{border:'1px solid black'}} ><p>{value.aircraft_no}</p></td>
                        <td style={{border:'1px solid black'}}><p>{value.airline}</p></td>
                      </tr>
                    })
                    }
                    </tbody>
                </table>
                
            </Fragment>
        )
    }
}
export default AircraftController








