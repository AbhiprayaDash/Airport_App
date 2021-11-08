import React from 'react'
import { Fragment } from 'react';
import { ToastContainer} from 'react-toastify';
import NavigationComponent from '../Navigation/navcomponent';
import AircraftForm from './aircraftform';

type statetypes={
    number:number,
    airline:string
}
type propTypes={
    history:any
}
class AircraftController extends React.Component<propTypes,statetypes>{
    constructor(props:propTypes)
    {
        super(props);
        this.state ={
            number:162,
            airline:'IndiGo',
        }
    }
    render()
    {
        return(
            <Fragment>
                <ToastContainer limit={3} autoClose={1500}/>
            <NavigationComponent/>
            <AircraftForm history={this.props.history}/>
          </Fragment>
        )
    }
}
export default AircraftController