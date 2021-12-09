import React,{Fragment} from 'react'
import NavigationComponent from '../Navigation/navcomponent'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../images/tim-gouw-OwD1ON8O-O4-unsplash.jpg'
import ImageComponent from '../Image/image';

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
                <ImageComponent signin={false} register = {true} history={this.props.history} logo = {logo}/>
          </Fragment>
      )
  }
}
export default SignUpComponent


