import React from 'react'
import { Fragment } from 'react';
import { ToastContainer} from 'react-toastify';
import NavigationComponent from '../Navigation/navcomponent';
import AircraftForm from './aircraftform';

class AircraftController extends React.Component{
    render()
    {
        return(
            <Fragment>
            <ToastContainer limit={3} autoClose={1500}/>
            <NavigationComponent/>
            <AircraftForm/>
          </Fragment>
        )
    }
}
export default AircraftController