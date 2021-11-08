import React,{Fragment} from 'react'
import NavigationComponent from '../Navigation/navcomponent'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUpFormComponent from './signupform';

type statetypes={
    name:string,
    password:string,
    email:string,
    signedup:boolean
}
type propTypes={
    history:any
}
class SignUpComponent extends React.Component<propTypes,statetypes>{
    render()
    {
    
        return(
          <Fragment>
            <NavigationComponent/>
            <ToastContainer limit={3} autoClose={2000}/>
            <SignUpFormComponent history={this.props.history}/>
          </Fragment>
      )
  }
}
export default SignUpComponent


