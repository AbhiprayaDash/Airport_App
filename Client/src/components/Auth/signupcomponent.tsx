import React,{Fragment} from 'react'
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
import {validateSignupData} from './authservice'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {successmsg} from '../Toast/toastservice'

type statetypes={
    name:string,
    password:string,
    email:string,
    signedup:boolean
}
type propTypes={
    history:any
}
class SignUpComponent extends React.Component<propTypes,statetypes>{
    constructor(props:propTypes)
    {
        super(props);
        this.state={
            name:'',
            password:'',
            email:'',
            signedup:false
        }
        this.handlename=this.handlename.bind(this);
        this.handlemail=this.handlemail.bind(this);
        this.handlepassword=this.handlepassword.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);
    }
    componentDidUpdate()
    {
      if(this.state.signedup===true)
      {
        successmsg("Signed up successfully,Login to Continue")
        setTimeout(
          () => {
              console.log('signed up')
              this.props.history.push("/login")
            },
        2000
      );
      }
    }
    handlemail(event:any){
        this.setState({email: event.target.value});
    }
    handlename(event:any){
        this.setState({name: event.target.value});
    }
    handlepassword(event:any){
        this.setState({password: event.target.value});
    }
    handlesubmit=async (event:any)=>{
        event.preventDefault();
        const reqbody = {name:this.state.name,email:this.state.email,password:this.state.password}
        try{
            await validateSignupData(reqbody)
            this.setState({signedup:true})
        }
        catch(e){
            console.log(e)
        }
    }
    render()
    {
        const theme = createTheme();
        const signedup = this.state.signedup
        return(
          <Fragment>
          <ToastContainer limit={3} autoClose={2000}/>
          {
            signedup===false && <div>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={this.handlesubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Name"
              name="name"
              value = {this.state.name}
              onChange={this.handlename}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value = {this.state.email}
              onChange={this.handlemail}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handlepassword}
              autoComplete="current-password"
            />
            {
            this.state.password!==""&&<Box component="div" display="inline" style={{color:'#5f6368'}}>Use 8 or more characters,must have uppercase and lowercase letter,at least 2 numbers and no spaces</Box>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Do have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
    }
    </Fragment>
        )
  }
}
export default SignUpComponent


