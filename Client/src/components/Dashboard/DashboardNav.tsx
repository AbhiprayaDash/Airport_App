import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@material-ui/core";
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import {  Modal, Paper } from '@mui/material';
import AirportForm from '../Airport/airportform';
import AircraftForm from '../Airport/aircraftform';
import TransactionForm from '../Transaction/transactionform';


const headersData = [
  {
    label: "Report",
    href: "/report",
  },
  {
    label: "Chart Report",
    href: "/chart",
  },
  {
    label: "Log Out",
    href: "/logout",
  },
];

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

export default function DashboardNavigation() {
  const [OpenAirport, setOpenfuncAirport] = React.useState(false);
  const handleOpenAirport = () => setOpenfuncAirport(true);
  const handleCloseAirport = () => setOpenfuncAirport(false);
  const [OpenAircraft, setOpenfuncAircraft] = React.useState(false);
  const handleOpenAircraft= () => setOpenfuncAircraft(true);
  const handleCloseAircraft = () => setOpenfuncAircraft(false);
  const [OpenTransaction, setOpenfuncTransaction] = React.useState(false);
  const handleOpenTransaction = () => setOpenfuncTransaction(true);
  const handleCloseTransaction = () => setOpenfuncTransaction(false);
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                      <Modal
                        open={OpenAirport}
                        onClose={handleCloseAirport}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Paper style={{width:'70%',height:'600px',maxHeight:'550px',maxWidth:'500px',marginRight:'auto',marginLeft:'auto',marginTop:'10%',marginBottom:'auto'}}>
                        <AirportForm/>
                        </Paper>
                      </Modal>
                    </div>
                </div>
            </div>
            
          <Modal
            open={OpenAircraft}
            onClose={handleCloseAircraft}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Paper style={{width:'70%',height:'600px',maxHeight:'350px',maxWidth:'500px',marginRight:'auto',marginLeft:'auto',marginTop:'10%'}}>
            <AircraftForm/>
            </Paper>
          </Modal>
          <Modal
            open={OpenTransaction}
            onClose={handleCloseTransaction}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Paper style={{width:'70%',height:'600px',maxHeight:'500px',maxWidth:'500px',marginRight:'auto',marginLeft:'auto',marginTop:'10%',marginBottom:'auto'}}>
            <TransactionForm/>
            </Paper>
          </Modal>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Toolbar className={toolbar}>
              <h1>{DashboardLogo}</h1>
              <div>{getMenuButtons()}</div>
            </Toolbar>
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
          <Modal
            open={OpenAirport}
            onClose={handleCloseAirport}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Paper style={{width:'70%',height:'600px',maxHeight:'550px',maxWidth:'500px',marginRight:'auto',marginLeft:'auto',marginTop:'10%',marginBottom:'auto'}}>
              <AirportForm/>
            </Paper>
          </Modal>
            
          <Modal
            open={OpenAircraft}
            onClose={handleCloseAircraft}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Paper style={{width:'70%',height:'600px',maxHeight:'350px',maxWidth:'500px',marginRight:'auto',marginLeft:'auto',marginTop:'10%'}}>
            <AircraftForm/>
            </Paper>
          </Modal>
          <Modal
            open={OpenTransaction}
            onClose={handleCloseTransaction}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Paper style={{width:'70%',height:'600px',maxHeight:'500px',maxWidth:'500px',marginRight:'auto',marginLeft:'auto',marginTop:'10%',marginBottom:'auto'}}>
            <TransactionForm/>
            </Paper>
          </Modal>
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
    return headersData.map(({ label, href }) => {
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
        Dashboard
      </h2>
    </Fragment>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
