import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const errormsg=(msg:string)=>{
    toast.error(msg, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored"
    });
}
export const successmsg = (msg:string) =>{
    toast.success(msg, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored"
      });
}