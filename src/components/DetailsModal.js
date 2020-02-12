import React from "react";
import logo from "../logo.svg"

class DetailsModal extends React.Component {
    render() {
        return (
            <div className="modal fade details-modal-lg" tabIndex="-1" data-show="true" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" id="myModal" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">AEGFGFHJ7836487HEJF</h5>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <img src={logo} width="300" height="300" alt="voterimg" ></img>
                                    <div style={{ display: "block" }}>
                                        <p className="d-flex align-items-start"><b>Pranav Pillai Surendran</b></p>
                                        <p className="d-flex align-items-start" style={{ margin: "0px" }}>Gender: Male</p>
                                        <p className="d-flex align-items-start" style={{ margin: "0px" }}>DOB: 19/09/1998</p>
                                        <p className="d-flex align-items-start" style={{ margin: "0px" }}>Address: C701 Matruchaaya Heritage</p>
                                        <p className="d-flex align-items-start" style={{ margin: "0px" }}>District: Rajkot</p>
                                        <p className="d-flex align-items-start" style={{ margin: "0px" }}>State: Maharashtra</p>
                                        <p className="d-flex align-items-start" style={{ margin: "0px" }}>Issue Date: 11/02/2020</p>
                                        <button className="btn btn-primary d-flex align-items-start mt-3">Print ID</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailsModal;