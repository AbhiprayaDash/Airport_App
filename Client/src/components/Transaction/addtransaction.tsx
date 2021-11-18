import React,{Fragment} from "react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationComponent from "../Navigation/navcomponent";
import TransactionForm from "./transactionform";

type stateTypes= {
    type:string,
    airport_name:string,
    aircraft_no:Number,
    quantity:Number
}
type propTypes={
}

class AddTransaction extends React.Component<propTypes,stateTypes>{
    render()
    {
        return(
            <Fragment>
            <NavigationComponent/>
            <TransactionForm />
    </Fragment>
        )
    }
}

export default AddTransaction