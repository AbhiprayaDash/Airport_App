import { fetchAircaft } from "../Redux/Aircraft"
import { fetchAirport } from "../Redux/Airport"
import { FetchTransaction } from "../Redux/Transaction"

export const Loaddata = async(Aircraftres:any,Airportres:any,Transactionres:any,dispatch:any) =>{
    if(Airportres.length===0)
      {
          try{
              const fetchfunc=fetchAirport()
              await fetchfunc(dispatch)
          }
          catch(e:any)
          {
              console.log(e)
          }
      }
      if(Transactionres.length===0)
      {
        try{
          const fetchfunc=FetchTransaction()
          await fetchfunc(dispatch)
        }
        catch(e:any)
        {
            console.log(e)
        }
      }
      if(Aircraftres.length===0)
      {
        try{
          const fetchfunc=fetchAircaft()
          await fetchfunc(dispatch)
        }
        catch(e:any)
        {
          console.log(e)
        }
      } 
}