import axios from 'axios'

type stateTypes= {
    type:string,
    airport_name:string,
    aircraft_no:Number,
    quantity:Number
}
type propTypes={
    history:any
}
export async function PostTransactionService(state:stateTypes,props:propTypes):Promise<any>{
         if(state.type==="IN")
        {
            const reqbody = {type:state.type,airport_name:state.airport_name,quantity:state.quantity}
            try{
                await axios.post('http://localhost:9000/transaction',reqbody)
                props.history.push("/dashboard")
            }
            catch(e){
                console.log("Invalid Credentials")
            }
        }
        else{
            const reqbody = {type:state.type,airport_name:state.airport_name,aircraft_no:state.aircraft_no,quantity:state.quantity}
            try{
                await axios.post('http://localhost:9000/transaction',reqbody)
                props.history.push("/dashboard")
            }
            catch(e){
                console.log("Invalid Input Data")
            }
        }     
}