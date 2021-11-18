import React,{Fragment} from 'react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationComponent from '../Navigation/navcomponent';
import AirportForm from './airportform';

class AirportController extends React.Component{
    render()
    {
        return(
            <Fragment>
                <NavigationComponent/>
                <AirportForm/>
            </Fragment>
        )
    }
}
export default AirportController



