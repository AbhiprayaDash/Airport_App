import { Fragment,FC, useState,useEffect } from "react"
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FetchTransaction} from "../../Redux/Transaction";
import SideNavbarTransaction from "./Sidenavtransaction";
import { fetchAircaft } from "../../Redux/Aircraft";
import { Card, CardContent, Paper } from "@mui/material";
import TransactionForm from '../Transaction/transactionform';
import {  Modal } from '@mui/material';
import MediaQuery from "react-responsive";
import DashboardNavigation from "../Dashboard/DashboardNav";
import { SidebarAirport } from "../Airport/airportsidedata";
import '../../css/table.css'
import '../../css/displayairport.css'
import { headerData } from "../Airport/navdataairport";
import { Transactioncolumns } from "../Airport/tabledata";
import TableComponent from "../table/table";
import moment from "moment";

type PropTypes ={
    history:any
}

const DisplayTransaction:FC<PropTypes> = (props:PropTypes) =>{
    const [OpenTransaction, setOpenfuncTransaction] = useState(false);
    const handleOpenTransaction = () => setOpenfuncTransaction(true);
    const handleCloseTransaction = () => setOpenfuncTransaction(false);
    const response:Array<any> = useSelector((state:any)=>state.Transaction.response)
    const Aircraftresult=useAppSelector<Array<any>>((state)=>state.Aircraft.response);
    let filterResponse:any = useAppSelector((state:any) => state.Transaction.filterResponse);
    const dispatch = useAppDispatch()
    const Responsecopy:Array<any> = [...response]
    const filteredResponse = Responsecopy.map((response:any)=>{
        let res:any = Object.assign({}, response);
        let DurationObj={
            date:moment(res.Duration.date).format("LLL")
        }
        res.Duration=DurationObj
        res.aircraft=res.hasOwnProperty('aircraft')?res.aircraft.aircraft_no:'No Aircraft'
        return res
    })
    filterResponse = filterResponse.map((response:any)=>{
        let res:any = Object.assign({}, response);
        let DurationObj={
            date:moment(res.Duration.date).format("LLL")
        }
        res.Duration=DurationObj
        res.aircraft=res.hasOwnProperty('aircraft')?res.aircraft.aircraft_no:'No Aircraft'
        return res
    })
    const loaddataAircraft=async()=>{
        if(Aircraftresult.length===0)
        {
            try{
                const fetchfuncAircraft = fetchAircaft()
                await fetchfuncAircraft(dispatch)
            }
            catch(e:any)
            {
                console.log(e)
            }
        } 
    }  
    const loaddata=async()=>{
        if(response.length===0)
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
    }
    useEffect(() => {
        loaddata()
        loaddataAircraft()
    }, []);
    
    return(
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                    <Modal
                        open={OpenTransaction}
                        onClose={handleCloseTransaction}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                    <Paper style={{width:'70%',height:'600px',maxHeight:'570px',maxWidth:'500px',marginRight:'auto',marginLeft:'auto',marginTop:'10%',marginBottom:'auto'}}>
                        <TransactionForm/>
                    </Paper>
                    </Modal>
                    </div>
                </div>
            </div>
            <div className="container-fluid" id="aircraftcontainer">
            <div className="row">
              <div className="col-12">
                <DashboardNavigation SidebarData={SidebarAirport} headersData={headerData} history={props.history}/>
              </div>
            </div>
            <br/><br/>
            <br/><br/>
            <div className="row">
                <MediaQuery minWidth={1200}>
                <div className="col-12">
                <Card >
                    <CardContent>
                    <div className="row">
                        <div className="col-10">
                            {/* <Typography
                                component="h2"
                                variant="h3"
                                color="inherit"
                                align="center"
                                style={{fontWeight:"bold"}}
                                fontFamily="Roboto"
                                noWrap
                                sx={{ flex: 1 }}
                            >
                                Transaction Details
                            </Typography> */}
                        </div>
                        <div className="col-2">
                            <button type="button" className="btn btn-success" onClick={handleOpenTransaction} style={{padding:'8px',marginBottom:'5px'}}>Add Transaction</button>
                        </div>
                    </div>
                    <br></br>
                        <div className="row">
                            <div className="col-3">
                                <SideNavbarTransaction/>
                            </div>
                            <div className="col-9">
                            {
                                filterResponse.length===0?<TableComponent response={filteredResponse} columns={Transactioncolumns}/>:<TableComponent response={filterResponse} columns={Transactioncolumns}/>
                            }
                            </div>
                        </div>
                    </CardContent>
                    </Card>
                </div>
                </MediaQuery>
                <MediaQuery maxWidth={600}>
                <div className="col-12">
                <Card >
                    <CardContent>
                    <div className="row">
                        <div className="col-8">
                            <Typography
                                component="h2"
                                variant="h3"
                                color="inherit"
                                align="center"
                                style={{fontWeight:"bold"}}
                                fontFamily="Roboto"
                                noWrap
                                sx={{ flex: 1 }}
                            >
                                Transaction Details
                            </Typography>
                        </div>
                        <div className="col-4">
                            <button type="button" className="btn btn-success" onClick={handleOpenTransaction} style={{padding:'8px',marginBottom:'5px'}}>Add Transaction</button>
                        </div>
                    </div>
                    <br></br>
                        <div className="row">
                            <div className="col-12">
                            {
                                filterResponse.length===0?<TableComponent response={filteredResponse} columns={Transactioncolumns}/>:<TableComponent response={filterResponse} columns={Transactioncolumns}/>
                            }
                            </div>
                        </div>
                    </CardContent>
                    </Card>
                </div>
                </MediaQuery>
            </div>
            </div>
        </Fragment>
    )
}
export default DisplayTransaction