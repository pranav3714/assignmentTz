import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    toast.configure({
        autoClose: 2000
    })

    let changeHandler = (e) => {
        if(e.target.name === "username") setUsername(e.target.value)
        else setPassword(e.target.value)
    }
    let submitHandler = async (e) => {
        e.preventDefault()
        let data = {username, password}
        let resp = await axios.post("http://localhost:4000/admin/login", data)
        if (resp.data.message) {
            const notify = () => toast(resp.data.message)
            notify()
            return
        }
        localStorage.setItem("token", resp.data.token)
        localStorage.setItem("name", resp.data.name)
        window.location = "/dashboard"
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <input type="text" className="form-control" name="username" placeholder="Enter Username" value={username} onChange={changeHandler} required ></input>
                <input type="password" className="form-control mt-2" name="password" placeholder="Enter Password" value={password} onChange={changeHandler} required ></input>
                <button className="form-conrol btn btn-primary mt-2">Admin Login</button>
            </form>
        </div>
    )
}

export default Login
