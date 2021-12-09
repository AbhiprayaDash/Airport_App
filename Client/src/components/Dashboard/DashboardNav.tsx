import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@material-ui/core";
import '../../css/toolbar.css'
import '../../css/sidebar.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from "@material-ui/icons/Menu";
import  { useState, useEffect, Fragment, FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ModalComponent } from "../Modal/modal";
import { SideBar } from "./sidebar";

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
  headersData:Array<any>
}

const DashboardNavigation:FC<PropTypes>=(props:PropTypes)=>{
  const { header, toolbar, drawerContainer } = useStyles();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

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
            </Toolbar>
        <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <SideBar SidebarData={props.SidebarData}/>
          </div>
        </div>
      </div> 
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

  // const getMenuButtons = () => {
  //   return headersData.map(({ label, href }) => {
  //     return (
  //       <Button
  //         {...{
  //           key: label,


  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
export default DashboardNavigation