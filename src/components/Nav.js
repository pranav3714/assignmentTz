import React from "react";
import logo from "../logo.svg";

let Nav = (props) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">
                <img src={logo} width="30" height="30" alt="ReactLogo" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className={(props.item === "register") ? "nav-item active" : "nav-item"} >
                            <a className="nav-link" href="/dashboard">Register Voter</a>
                        </li>
                        <li className={(props.item === "search") ? "nav-item active" : "nav-item"}>
                            <a className="nav-link" href="/search">Search</a>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={() => {
                                localStorage.clear()
                                window.location = "/login"
                            }} >Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Nav