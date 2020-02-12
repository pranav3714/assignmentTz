import React from "react";
import Nav from "./Nav";
import Registeration from "./Registration";

let RegistrationForm = (props) => {
    return (
        <div>
            <Nav item="register" />
            <Registeration />
        </div>
    )
}

export default RegistrationForm