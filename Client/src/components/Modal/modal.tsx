import { Modal, Paper } from "@mui/material";
import React from "react";
import { FC, Fragment } from "react";
import AircraftForm from "../Airport/aircraftform";
import AirportForm from "../Airport/airportform";
import TransactionForm from "../Transaction/transactionform";

export const ModalComponent:FC = () =>{
        const [OpenAirport, setOpenfuncAirport] = React.useState(false);
        const handleCloseAirport = () => setOpenfuncAirport(false);
        const [OpenAircraft, setOpenfuncAircraft] = React.useState(false);
        const handleCloseAircraft = () => setOpenfuncAircraft(false);
        const [OpenTransaction, setOpenfuncTransaction] = React.useState(false);
        const handleCloseTransaction = () => setOpenfuncTransaction(false);
    return(
        <Fragment>
            <div className="container">
              <div className="row">
                <div className="col-12">
                <Modal
                  open={OpenAirport}
                  onClose={handleCloseAirport}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Paper style={{width:'50%',maxWidth:'600px',height:'60%',maxHeight:'600px',alignContent:'center',marginLeft:'auto',marginRight:'auto',marginTop:'200px'}}>
                    <AirportForm/>
                  </Paper>
                </Modal>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Modal
                    open={OpenAircraft}
                    onClose={handleCloseAircraft}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                  <Paper style={{width:'50%',maxWidth:'600px',height:'60%',maxHeight:'350px',alignContent:'center',marginLeft:'auto',marginRight:'auto',marginTop:'200px'}}>
                    <AircraftForm/>
                  </Paper>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12">
                <Modal
                  open={OpenTransaction}
                  onClose={handleCloseTransaction}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                <Paper style={{width:'50%',maxWidth:'600px',height:'60%',maxHeight:'500px',alignContent:'center',marginLeft:'auto',marginRight:'auto',marginTop:'200px'}}>
                  <TransactionForm/>
                </Paper>
                </Modal>
                </div>
              </div>
            </div>   
        </Fragment>
                 
    )
}