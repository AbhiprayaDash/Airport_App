import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  Button,
  Avatar,
} from "@material-ui/core";
import '../../css/toolbar.css'
import '../../css/sidebar.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from "@material-ui/icons/Menu";
import  { useState, useEffect, Fragment, FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ModalComponent } from "../Modal/modal";
import { SideBar } from "./sidebar";
import axios from "axios";
import '../../css/dashboard.css'
const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "black",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  designLink:{
    color:'black',
    "&:hover": {
      background: "#4361ee",
    },
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
    "&:hover": {
      background: "#3f37c9",
      color:'white'
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "10px 10px",
  },
}));
type PropTypes={
  SidebarData:Array<any>,
  headersData:Array<any>,
  history:any
}

const DashboardNavigation:FC<PropTypes>=(props:PropTypes)=>{
  const { header, toolbar, drawerContainer } = useStyles();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const [username,setUsername]=useState<string>('')

  const { mobileView, drawerOpen } = state;
  const loaduser= async (UserObject:any)=>{
    const id:any=UserObject.user.id;
    const response:any = await axios.get(`http://localhost:9000/v1/users/username/${id}`)
    setUsername(response.data)
  }
  const handlelogout = () =>{
    props.history.push('/logout')
  }
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
    const AccessToken:string=localStorage.getItem('user')|| 'null'
    const base64Url:any = AccessToken.split('.')[1];
    const UserObject:any = JSON.parse(window.atob(base64Url));
    loaduser(UserObject)
    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);
  const displayDesktop = () => {
    return (
      <Fragment>
            <ModalComponent/>
            <Toolbar className={toolbar} style={{marginLeft:'60%',zIndex:-1,float:'right',color:'#e5e5e5'}} >
              
              {/* <div>{getMenuButtons()}</div> */}
              <div className="container">
                <div className="row">
                  <div className="col-8">

                  </div>
                  <div className="col-4" style={{display:'flex'}}>
                    
                    <Avatar src="/broken-image.jpg" />
                    <h4 style={{color:'black',marginTop:'2%',marginRight:'5%',marginLeft:'4%'}}>{username}</h4> 
                    <div className="dropdown">
                      <button type="button" className="btn btn-dark " data-toggle="dropdown" style={{borderRadius:'50%',marginTop:'4%'}}>
                        <i className="fas fa-caret-down"></i>
                      </button>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" onClick={handlelogout}>Logout</a>
                      </div>
                    </div>
                    {/* <button type="button" className="btn btn-secondary" style={{marginLeft:'10%'}} onClick={handlelogout}>Logout</button> */}
                  </div>
                </div>
              </div>
            </Toolbar>

        
            <SideBar SidebarData={props.SidebarData}/>

      </Fragment>
    );
  };
  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    return (
      <Fragment>
          <ModalComponent/>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
              <Toolbar>
              <IconButton
                {...{
                  edge: "start",
                  color: "inherit",
                  "aria-label": "menu",
                  "aria-haspopup": "true",
                  onClick: handleDrawerOpen,
                }}
              >
                  <MenuIcon />
              </IconButton>

            <Drawer
              {...{
                anchor: "left",
                open: drawerOpen,
                onClose: handleDrawerClose,
              }}
            >
                <div className={drawerContainer}>
                  {getDrawerChoices()}
                </div>   
            </Drawer>
            <div>{DashboardLogo}</div>
            </Toolbar>
              </div>
            </div>
          </div>
      </Fragment>
    );
  };
  const getDrawerChoices = () => {
    return props.headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const DashboardLogo = (
    <Fragment>
      <h2 className="logo" style={{fontWeight:'bold'}}>
        <DashboardIcon style={{fontSize:'30px'}}>
        </DashboardIcon>
        Airfuel
      </h2>
    </Fragment>
  );

   const getMenuButtons = () => {
      return (
        <Button
          {...{
            key: 'label',
            color: "inherit",
            to: 'href',
            component: RouterLink,
            // className: menuButton,
          }}
        >
          Logout
        </Button>
      );
  };
  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
export default DashboardNavigation