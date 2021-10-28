import React, { Fragment } from "react";
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
import { postlogindata } from "./authservice";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {successmsg,errormsg} from '../Toast/toastservice'

type statetypes={
    password:string,
    email:string,
    loggedin:boolean
}
type propTypes={
    history:any
}
class LoginComponent extends React.Component<propTypes,statetypes>{
    constructor(props:propTypes)
    {
        super(props);
        this.state={
            password:'',
            email:'',
            loggedin:false
        }
        this.handlemail=this.handlemail.bind(this);
        this.handlepassword=this.handlepassword.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);
    }
    componentDidUpdate(){
      if(this.state.loggedin===true)
      {
        successmsg("Logged In successfully")
        setTimeout(
          () => {
              console.log('signed up')
              this.props.history.push("/dashboard")
            },
        2000
      );
      }
    }
    handlemail(event:any){
        this.setState({email: event.target.value});
    }
    handlepassword(event:any){
        this.setState({password: event.target.value});
    }
    handlesubmit=async (event:any)=>{
        event.preventDefault();
        const reqbody = {email:this.state.email,password:this.state.password}
        try{
            await postlogindata(reqbody)
            this.setState({loggedin:true});
        }
        catch(e){
            errormsg("Invalid User name or password")
            console.log(e)
        }
    }
    render()
    {
        const theme = createTheme();
        return(
          <Fragment>
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
                      Sign in
                    </Typography>
                    <Box component="form" onSubmit={this.handlesubmit} noValidate sx={{ mt: 1 }}>
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

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign In
                      </Button>
                      <Grid container>
                        <Grid item>
                          <Link href="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                          </Link>
                        </Grid>
                      </Grid>
                      <ToastContainer limit={3} autoClose={1500}/>
                    </Box>
                  </Box>
                </Container>
            </ThemeProvider>
          </Fragment>
        )
    }
}
export default LoginComponent






