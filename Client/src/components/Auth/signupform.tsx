import React from 'react'
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
import {errormsg, successmsg} from '../Toast/toastservice'
import { validateSignupData } from './authservice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';

type statetypes={
    name:string,
    password:string,
    email:string,
    signedup:boolean
}
type propTypes={
    history:any
}
class SignUpFormComponent extends React.Component<propTypes,statetypes>{
    constructor(props:propTypes)
    {
        super(props);
        this.state={
            name:'',
            password:'',
            email:'',
            signedup:false
        }
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
    handlemail=(event:any)=>{
        this.setState({email: event.target.value});
    }
    handlename=(event:any)=>{
        this.setState({name: event.target.value});
    }
    handlepassword=(event:any)=>{
        this.setState({password: event.target.value});
    }
    handlesubmit=async (event:any)=>{
        event.preventDefault();
        const reqbody = {name:this.state.name,email:this.state.email,password:this.state.password}
        if(reqbody.name===""||reqbody.email===""||reqbody.password==="")
          return errormsg("Input is required")
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
        var signedup = this.state.signedup
        return(
            signedup===false&&<ThemeProvider theme={theme}>
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                  <CssBaseline />
                  <Card sx={{ maxWidth: 450, maxHeight:550 }}  style={{height:'100%',alignContent:'center',marginLeft:'auto',marginRight:'auto',marginTop:'10%',width:'80%',display: 'flex',flexDirection: 'column'}}>
                  <CardContent>
                  <Box
                    sx={{
                      marginTop: 2,
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
                        type="email"
                        value = {this.state.name}
                        onChange={this.handlename}
                        autoComplete="name"
                        autoFocus
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="name"
                        type="email"
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
                        autoComplete="new-password"
                      />
                      <div className="ui pointing label">
                          Use 8 or more characters,must have uppercase and lowercase letter,at least 2 numbers and no spaces
                      </div>
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
                  </CardContent>
                  </Card>
                </div>
                </div>
                </div>
            </ThemeProvider>
        )
    }
}
export default SignUpFormComponent