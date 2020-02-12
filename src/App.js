import React from 'react';
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import RegistrationForm from './components/RegistrationForm';
import SearchHolder from "./components/SearchHolder";
import "./bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/login">
          <Home />
        </Route>
        {(!localStorage.getItem("token")) ? "" : <div>
          <Route path="/dashboard">
            <RegistrationForm />
          </Route>
          <Route path="/search">
            <SearchHolder />
          </Route>
        </div>}
        <Route path="/" exact render={() => (<Redirect to="/login"></Redirect>)}>
        </Route>
      </div>
    </Router>
  );
}

export default App;
