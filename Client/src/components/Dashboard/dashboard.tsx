import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {mainListItems} from './listitems'
import DisplayAircrafts from '../Airport/displayaircraft';
import DisplayAirports from '../Airport/displayairport';
import DisplayTransaction from '../Transaction/displaytransaction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Button, Modal, Paper } from '@mui/material';
import AirportForm from '../Airport/airportform';
import AircraftForm from '../Airport/aircraftform';
import TransactionForm from '../Transaction/transactionform';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

const Dashboard = ()=> {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [OpenAirport, setOpenfuncAirport] = React.useState(false);
  const handleOpenAirport = () => setOpenfuncAirport(true);
  const handleCloseAirport = () => setOpenfuncAirport(false);
  const [OpenAircraft, setOpenfuncAircraft] = React.useState(false);
  const handleOpenAircraft= () => setOpenfuncAircraft(true);
  const handleCloseAircraft = () => setOpenfuncAircraft(false);
  const [OpenTransaction, setOpenfuncTransaction] = React.useState(false);
  const handleOpenTransaction = () => setOpenfuncTransaction(true);
  const handleCloseTransaction = () => setOpenfuncTransaction(false);
  return (
    <React.Fragment>
      <Modal
        open={OpenAirport}
        onClose={handleCloseAirport}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper style={{width:'30%',alignContent:'center',marginLeft:'700px',marginTop:'200px'}}>
        <AirportForm/>
        </Paper>
      </Modal>
      <Modal
        open={OpenAircraft}
        onClose={handleCloseAircraft}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper style={{width:'30%',alignContent:'center',marginLeft:'700px',marginTop:'200px'}}>
        <AircraftForm/>
        </Paper>
      </Modal>
      <Modal
        open={OpenTransaction}
        onClose={handleCloseTransaction}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper style={{width:'30%',alignContent:'center',marginLeft:'700px',marginTop:'200px'}}>
        <TransactionForm/>
        </Paper>
      </Modal>
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '16px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <DashboardIcon/>
              Dashboard
            </Typography>
            <button type="button" className="btn btn-secondary" onClick={handleOpenAirport} style={{padding:'8px',marginRight:'10px'}}>Add Airport</button>
            <button type="button" className="btn btn-secondary" onClick={handleOpenAircraft} style={{padding:'8px',marginRight:'10px'}}>Add Aircraft</button>
            <button type="button" className="btn btn-secondary" onClick={handleOpenTransaction} style={{padding:'8px'}}>Add Transaction</button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Grid container
            spacing={3}>
              <Grid item xs>
                <DisplayAirports/>
              </Grid>
          </Grid>
          <br/>
          <Grid container
            spacing={3}>
              <Grid item xs>
                <DisplayAircrafts/>
              </Grid>
          </Grid>
            <br/>
          <Grid container
            spacing={3}>
              <Grid item xs>
                <DisplayTransaction/>
              </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
    </React.Fragment>
  );
}
export default Dashboard