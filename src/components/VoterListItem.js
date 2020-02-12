import React, { useState } from "react";
import PdfTemplate from "./PdfTemplate";
import { PDFDownloadLink } from "@react-pdf/renderer";

let ucFirst = (stringg) => {
    stringg = stringg.trim()
    let value = ""
    let srr = stringg.split(" ")
    srr.forEach(element => {
        value = value + " " + element.charAt(0).toUpperCase() + element.slice(1)
    });
    return value
}

let VoterListItem = (props) => {
    let [getVoter, setVoter] = useState({})
    let clickHandler = (e) => {
        let targetId = e.target.dataset.id,
            voterDataArray = props.voters.filter(voter => voter["_id"] === targetId),
            [voter] = voterDataArray
        setVoter(voter)
    }
    return (
        <div className="container-fluid" style={{ display: "inline-block" }}>
            <div className="row">
                {props.voters.map(voter => <div className="card ml-3 mt-3" key={voter["_id"]} style={{ width: "18rem", display: "inline-block" }}>
                    <img className="card-img-top" width="200" height="350" src={voter.image} alt={voter.fname + "_image"} />
                    <div className="card-body">
                        <h5 className="card-title">{ucFirst(`${voter.fname} ${voter.sname} ${voter.lname}`)}</h5>
                        <p className="card-text">{voter["_id"].toUpperCase()}</p>
                        <p className="card-text">{ucFirst(voter["district"])}</p>
                        <button className="btn btn-primary" data-id={voter["_id"]} onClick={clickHandler} data-toggle="modal" data-target="#myModal" >Details</button>
                    </div>
                </div>)}
            </div>
            <div className="modal fade details-modal-lg" tabIndex="-1" data-show="true" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="myModal">
                <div className="modal-dialog modal-lg" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{`${getVoter["_id"]}`.toUpperCase()}</h5>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <img src={getVoter.image} width="250" height="300" alt="voterimg" ></img>
                                    <div style={{ display: "block" }}>
                                        <p className="ml-3 d-flex align-items-start"><b>{ucFirst(`${getVoter.fname} ${getVoter.sname} ${getVoter.lname}`)}</b></p>
                                        <p className="ml-3 d-flex align-items-start" style={{ margin: "0px" }}>Gender: {(getVoter.gender === "m") ? "Male" : "Female"}</p>
                                        <p className="ml-3 d-flex align-items-start" style={{ margin: "0px" }}>DOB: {new Date(getVoter.dob).toLocaleDateString()}</p>
                                        <p className="ml-3 d-flex align-items-start" style={{ margin: "0px" }}>Address: {ucFirst(`${getVoter.houseAddress}`)}</p>
                                        <p className="ml-3 d-flex align-items-start" style={{ margin: "0px" }}>District: {ucFirst(`${getVoter.district}`)}</p>
                                        <p className="ml-3 d-flex align-items-start" style={{ margin: "0px" }}>State: {ucFirst(`${getVoter.state}`)}</p>
                                        <p className="ml-3 d-flex align-items-start" style={{ margin: "0px" }}>Issue Date: {new Date(getVoter.createdAt).toLocaleDateString()}</p>
                                        <button className="btn btn-link ml-3 d-flex align-items-start" style={{ margin: "0px" }}>
                                            <PDFDownloadLink document={<PdfTemplate voterObj={getVoter} ucFirstFn={ucFirst} />} fileName={getVoter["_id"]+".pdf"}>
                                                {({ blob, url, loading, err }) => (loading ? 'Loading Document' : "Download Voter ID")}
                                            </PDFDownloadLink>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoterListItem;