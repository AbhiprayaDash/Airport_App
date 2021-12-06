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
import {  Modal, Paper } from '@mui/material';
import AirportForm from '../Airport/airportform';
import AircraftForm from '../Airport/aircraftform';
import TransactionForm from '../Transaction/transactionform';
import DashboardNavigation from './DashboardNav';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


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

const Dashboard = ()=> {
    const [open, setOpen] = React.useState(true);
    const [OpenAirport, setOpenfuncAirport] = React.useState(false);
    const handleCloseAirport = () => setOpenfuncAirport(false);
    const [OpenAircraft, setOpenfuncAircraft] = React.useState(false);
    const handleCloseAircraft = () => setOpenfuncAircraft(false);
    const [OpenTransaction, setOpenfuncTransaction] = React.useState(false);
    const handleCloseTransaction = () => setOpenfuncTransaction(false);
    return (
          <React.Fragment>
            <div className="container">
              <div className="row">
                <div className="col-12">
                <Modal
                  open={OpenAirport}
                  onClose={handleCloseAirport}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Paper style={{width:'50%',maxWidth:'600px',height:'60%',maxHeight:'600px',alignContent:'center',marginLeft:'auto',marginRight:'auto',marginTop:'200px'}}>
                    <AirportForm/>
                  </Paper>
                </Modal>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Modal
                    open={OpenAircraft}
                    onClose={handleCloseAircraft}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                  <Paper style={{width:'50%',maxWidth:'600px',height:'60%',maxHeight:'350px',alignContent:'center',marginLeft:'auto',marginRight:'auto',marginTop:'200px'}}>
                    <AircraftForm/>
                  </Paper>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12">
                <Modal
                  open={OpenTransaction}
                  onClose={handleCloseTransaction}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                <Paper style={{width:'50%',maxWidth:'600px',height:'60%',maxHeight:'500px',alignContent:'center',marginLeft:'auto',marginRight:'auto',marginTop:'200px'}}>
                  <TransactionForm/>
                </Paper>
                </Modal>
                </div>
              </div>
            </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <DashboardNavigation/>
              </div>
              <br/><br/>
              </div>
                <div className="row">
                  <div className="col-12">
                          <Box
                                component="main"
                                sx={{
                                  backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                      ? theme.palette.grey[100]
                                      : theme.palette.grey[900],
                                  height: '100%',
                            }}
                          >
                            <Toolbar />
                            <div className="row">
                              <div className="col-12">
                                  <DisplayAirports/>
                              </div>
                            </div>
                            <br/>
                            <div className="row">
                              <div className="col-12">
                                  <DisplayAircrafts/>
                              </div>
                            </div>
                            <br/>
                            <div className="row">
                              <div className="col-12">
                                  <DisplayTransaction/>
                              </div>
                            </div>
                            <br/>
                            
                          </Box>
                        
                  </div>
                </div>
           </div>
          </React.Fragment>
    );
  }
export default Dashboard