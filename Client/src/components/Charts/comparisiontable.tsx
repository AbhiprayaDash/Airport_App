import { Paper } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import '../../css/comparisiontable.css'
import { useAppSelector } from "../../hooks";
import { FetchTransaction } from "../../Redux/Transaction";

type PropTypes={
    topfuelcap:Array<any>,
    topfuelavailable:Array<any>,
    topOuttransaction:Array<any>,
    topIntransaction:Array<any>,
    totalIntransaction:any,
    totalOuttransaction:any
}

export const Totaltransaction = () =>{
    const response:Array<any>= useAppSelector((state:any) => state.Transaction.response);
    const [totalIntransaction,settotalIntransaction] = useState<Number>(0)
    const [totalOuttransaction,settotalOuttransaction] = useState<Number>(0)
    const [totaltransaction,settotaltransaction] = useState<Number>(0)
    const transactiondata:Array<any> = response
    const loaddata =async ()=>{
        if(response.length===0)
        {
            const fetchfunctransaction =FetchTransaction()
            await fetchfunctransaction(dispatch)
        }
    } 
    useEffect(()=>{
        var totalin:any=0;
        var totalout:any=0
        response.filter((res:any)=>{
            return res.Type==="IN"
        }).map((transaction:any)=>{
            totalin+=transaction.quantity
        })
        response.filter((res:any)=>{
            return res.Type==="OUT"
        }).map((transaction:any)=>{
            totalout+=transaction.quantity
        })
        settotalIntransaction(totalin)
        settotalOuttransaction(totalout)
        settotaltransaction(totalin+totalout)
    },[response])
    useEffect(()=>{
        loaddata()
    },[])
    return(
        <Fragment>
            <Paper style={{backgroundColor:'#f9fafd',height:'25%'}} elevation={7}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h5 style={{color: '#98a6ad'}}>Total In Transaction</h5>
                            <br/>
                            <h3 >{totalIntransaction} Litres</h3>
                        </div>
                    </div>
                </div>
            </Paper>
            <br/>
            <Paper style={{backgroundColor:'#f9fafd',height:'25%'}} elevation={7}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h5 style={{color: '#98a6ad'}}>Total Out Transaction</h5>
                            <br/>
                            <h3>{totalOuttransaction} Litres</h3>
                        </div>
                    </div>
                </div>
                
            </Paper>
            <br/>
            <Paper style={{backgroundColor:'#f9fafd',height:'28%'}} elevation={7}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h5 style={{color: '#98a6ad'}}>Total Transaction</h5>
                            <br/>
                            <h3>{totaltransaction} Litres</h3>
                        </div>
                    </div>
                </div>
            </Paper> 
        </Fragment>
                        
    )
}
export const ComparisionTables:FC<PropTypes> = (props:PropTypes) =>{
    var count:any=0;
    return(
        <Fragment>
            <MediaQuery maxWidth={600}>
            <div className="row">
                <div className="col-6">
                <Paper elevation={7}>
                <p className="heading" style={{paddingRight:'200px'}}>Top Fuel Capacity</p>
                <br/>
                <div className="table-responsive-sm">
                <table className="table" style={{maxHeight:'400px',minHeight:'400px'}}>
                    <tbody>
                    {                  
                    props.topfuelcap.map((response:any)=>{
                    count++
                    return(
                        <tr>
                        {/* <th scope="row">{count}</th> */}
                        <td>{response.name}</td>
                        <td>{response.fuelcapacity}</td>
                        </tr>
                    )})
                    }
                    </tbody>
                </table>
                </div>
                </Paper> 
                </div>
                <div className="col-6">
                    <Paper elevation={7}>
                    <h2>Top 5 Fuel Available</h2>
                    <br/>
                    <div className="table-responsive-sm">
                    <table className="table" style={{maxHeight:'400px',minHeight:'400px'}}>
                        <tbody>
                        {      
                            props.topfuelavailable.map((response:any)=>{
                                count++
                                return(
                                    <tr>
                                    {/* <th scope="row">{count}</th> */}
                                    <td>{response.name}</td>
                                    <td>{response.fuelcapacity} L</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    </div>
                    </Paper>    
                </div>
                </div>
                <br/><br/>
                <div className="row">
                <div className="col-6">
                    <Paper elevation={7}>
                    <h2>Top 5 Out Transaction</h2>
                        <br/>
                    <div className="table-responsive-sm">
                    <table className="table" style={{maxHeight:'400px',minHeight:'400px'}}>
                        <tbody>
                        {      
                            props.topOuttransaction.map((response:any)=>{
                                count++
                                return(
                                    <tr>
                                    {/* <th scope="row">{count}</th> */}
                                    <td>{response.airport.name}</td>
                                    <td>{response.quantity}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    </div>
                    </Paper>    
                </div>
                <div className="col-6">
                    <Paper elevation={7}>
                    <h2>Top 5 In Transaction</h2>
                    <br/>
                    <div className="table-responsive-sm">
                    <table className="table" style={{maxHeight:'400px',minHeight:'400px'}}>
                        <tbody>
                        {      
                            props.topIntransaction.map((response:any)=>{
                                count++
                            return(
                                <tr>
                                {/* <th scope="row">{count}</th> */}
                                <td>{response.airport.name}</td>
                                <td>{response.quantity}</td>
                                </tr>
                            )
                            })
                        }
                        </tbody>
                    </table>
                    </div>
                    </Paper>    
                </div>
                <br/><br/><br/><br/><br/><br/>
                {/* <div className="row">
                    <div className="col-6">
                        <Totaltransaction/>
                    </div>
                </div> */}
            </div>     
            </MediaQuery>
            <MediaQuery minWidth={1200}>
                <div className="col-3">
                <Paper elevation={7}>
                <h2>Top 5 Fuel Capacity</h2>
                <br/>
                <div className="table-responsive-sm">
                <table className="table" style={{minHeight:'280px'}}>
                    <tbody>
                    {                  
                    props.topfuelcap.map((response:any)=>{
                    count++
                    return(
                        <tr>
                        {/* <th scope="row">{count}</th> */}
                        <td>{response.name}</td>
                        <td>{response.fuelcapacity}L</td>
                        </tr>
                    )})
                    }
                    </tbody>
                </table>
                </div>
                </Paper> 
                </div>
                <div className="col-3">
                    <Paper elevation={7}>
                    <h2>Top 5 Fuel Available</h2>
                    <br/>
                    <div className="table-responsive-sm">
                    <table className="table" style={{minHeight:'280px'}}>
                        <tbody>
                        {      
                            props.topfuelavailable.map((response:any)=>{
                                count++
                                return(
                                    <tr>
                                    {/* <th scope="row">{count}</th> */}
                                    <td>{response.name}</td>
                                    <td>{response.fuelcapacity}L</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    </div>
                    </Paper>    
                </div>
                <div className="col-3">
                    <Paper elevation={7}>
                    <h2>Top 5 Out Transaction</h2>
                        <br/>
                    <div className="table-responsive-sm">
                    <table className="table" style={{minHeight:'280px'}}>
                        <tbody>
                        {      
                            props.topOuttransaction.map((response:any)=>{
                                count++
                                return(
                                    <tr>
                                    {/* <th scope="row">{count}</th> */}
                                    <td>{response.airport.name}</td>
                                    <td>{response.quantity}L</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    </div>
                    </Paper>    
                </div>
                <div className="col-3">
                    <Paper elevation={7}>
                    <h2>Top 5 In Transaction</h2>
                    <br/>
                    <table className="table" style={{minHeight:'280px'}}>
                        <tbody>
                        {      
                            props.topIntransaction.map((response:any)=>{
                                count++
                            return(
                                <tr>
                                {/* <th scope="row">{count}</th> */}
                                <td>{response.airport.name}</td>
                                <td>{response.quantity}L</td>
                                </tr>
                            )
                            })
                        }
                        </tbody>
                    </table>
                    </Paper>    
            </div> 
            </MediaQuery>
                   
        </Fragment>
    )
}

function dispatch(dispatch: any) {
    throw new Error("Function not implemented.");
}
