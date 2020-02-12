import React from "react";
import Login from "../components/Login";
import logo from "../logo.svg"
import "./Home.css"

let Home = () => {
    return (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Login></Login>
        </header>
    )
}

export default Home;