import { ThemeProvider } from "@emotion/react";
import { Button, Card, CardContent, Grid, Link, TextField } from "@mui/material";
import { Avatar, Box, Container, createTheme, CssBaseline, Typography } from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";
import { errormsg, successmsg } from "../Toast/toastservice";
import { postlogindata } from "./authservice";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NavigationComponent from "../Navigation/navcomponent";

type statetypes={
    password:string,
    email:string,
    loggedin:boolean
}
type propTypes={
    history:any
}
class LoginFormComponent extends React.Component<propTypes,statetypes>{
    constructor(props:propTypes)
    {
        super(props);
        this.state={
            password:'',
            email:'',
            loggedin:false
        }
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
    handlemail=(event:any)=>{
        this.setState({email: event.target.value});
    }
    handlepassword=(event:any)=>{
        this.setState({password: event.target.value});
    }
    handlesubmit=async (event:any)=>{
        event.preventDefault();
        const reqbody = {email:this.state.email,password:this.state.password}
        if(reqbody.email===""||reqbody.password==="")
        {
            return errormsg("Input is required")
        }
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
            <ThemeProvider theme={theme}>
                <NavigationComponent/>
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                    <CssBaseline />
                      <Card sx={{ maxWidth: 400, maxHeight:400 }}  style={{height:'100%',alignContent:'center',marginLeft:'auto',marginRight:'auto',marginTop:'15%',width:'80%',display: 'flex',flexDirection: 'column'}}>
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
                        Sign in
                      </Typography>
                      <Box component="form" onSubmit={this.handlesubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          type="email"
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
                            <Link href="/signup" variant="body1" >
                              <p style={{color:"black"}}>{"Don't have an account? Sign Up"}</p>
                            </Link>
                          </Grid>
                        </Grid>
                        <ToastContainer limit={3} autoClose={1500}/>
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
export default LoginFormComponent