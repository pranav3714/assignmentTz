import React, { useState } from "react";
import axios from 'axios';
import logo from "../logo.svg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let Registration = () => {
    const [name, setName] = useState("")
    const [dob, setDob] = useState(0)
    const [gender, setGender] = useState("")
    const [imageName, setImageName] = useState({})
    const [imageData, setImageData] = useState(logo)
    const [address, setAddress] = useState("")
    const [district, setDistrict] = useState("")
    const [state, setState] = useState("Maharashtra")

    toast.configure({
        autoClose: 2000
    })

    let imageHandler = async (e) => {
        let fr = new FileReader(), file = e.target.files[0]
        if (file.size > 1000000) {
            alert("Files greater than 1 mb not allowed")
            return
        }
        else if (file.type.split("/")[0] !== "image") {
            alert("Only image allowed")
            return

        }
        setImageName(file)
        fr.onload = () => {
            setImageData(fr.result)
        }
        fr.readAsDataURL(file)
    }
    let return18YearPast = () => {
        let dateToday = new Date(),
            year = dateToday.getFullYear() - 18,
            month = ("0" + (dateToday.getMonth() + 1)).slice(-2),
            day = ("0" + dateToday.getDate()).slice(-2),
            tmaxDateString = year + "-" + month + "-" + day
        return tmaxDateString
    }
    let submitHandler = (e) => {
        e.preventDefault()
        let fd = new FormData(),
            [fname, sname, lname] = name.trim().split(" ")
        fd.append("image", imageName)
        fd.set("fname", fname)
        fd.set("sname", sname)
        fd.set("lname", lname)
        fd.set("dob", dob)
        fd.set("gender", gender)
        fd.set("district", district)
        fd.set("state", state)
        fd.set("houseAddress", address)
        axios.post("http://localhost:4000/voter/add", fd, {
            headers: {'authorization': `Bearer ${localStorage.getItem("token")}`}
        }).then((resp) => {
            const notify = () => toast("Submit Successful")
            //e.target.reset()
            notify()

        }).catch((err) => {
            console.log(err)
            const notify = () => toast("Submit Failed")
            notify()
        })
    }

    return (
        <div className="container-fluid row mt-3">
            <div className="col-lg-6">
                <form id="userRegister" onSubmit={submitHandler} encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="name" className="float-left">Name</label>
                        <input type="text" className="form-control" id="name" value={name} placeholder="Firstname Surname Lastname" onChange={(e) => {
                            setName(e.target.value)
                        }} onBlur={() => {
                            let format = /[!@#$%^&*()_+\-=[{}\];':"\\|,.<>/?]+/;
                            if (name.split(" ").length !== 3) {
                                setName("")
                                let notify = () => toast("Username should be in (FIRSTNAME SURNAME LASTNAME) format");
                                notify()
                            }
                            if (format.test(name)) {
                                setName("")
                                let notify = () => toast("Bad Name");
                                notify()
                            }

                        }} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob" className="float-left">Date</label>
                        <input type="date" className="form-control" id="dob" max={return18YearPast()} onChange={(e) => {
                            setDob(e.target.valueAsNumber)
                        }} required />
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-1">Gender</label>
                        <div className="col-sm-10">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="male" value="M" onChange={(e) => {
                                    setGender(e.target.value)
                                }} required />
                                <label className="form-check-label mr-5" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="female" value="F" onChange={(e) => {
                                    //console.log(e.target.value)
                                    setGender(e.target.value)
                                }} required />
                                <label className="form-check-label" htmlFor="male">Female</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" className="float-left">Address</label>
                        <input type="text" className="form-control" id="address" placeholder="C701 Suraj CHS" value={address} onChange={(e) => {
                            setAddress(e.target.value)
                        }} onBlur={(e) => {
                            if (address.split(" ").length < 2) {
                                setAddress("")
                                const notify = () => toast("Address too short");
                                notify()
                            }
                        }} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="district" className="float-left">District</label>
                        <input type="text" className="form-control" id="district" placeholder="Raigarh" value={district} onChange={(e) => {
                            setDistrict(e.target.value)
                        }} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state" className="float-left">State</label>
                        <select className="form-control" id="state" onChange={(e) => {
                            //console.log(e.target.value)
                            setState(e.target.value)
                        }} required >
                            <option>Maharashtra</option>
                            <option>Karnataka</option>
                            <option>Goa</option>
                        </select>
                    </div>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile" accept="image/*" onChange={imageHandler} required />
                        <label className="custom-file-label" htmlFor="customFile">{imageName.name}</label>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
            <div className="col-lg-6">
                <div className="text-center">
                    <img src={imageData} className="rounded" alt="voterimg" width="700" height="600" />
                </div>
            </div>
        </div>
    )
}


export default Registration;
