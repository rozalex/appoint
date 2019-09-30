import React, { useState } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  Navbar, 
  AppointmentsList, 
  EditAppointment, 
  CreateAppointment, 
  CreateUser
} from "./components"


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
        <div className="container">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <br/>
        {
           loggedIn &&
           <div>
            <Route path="/" exact component={AppointmentsList} />
            <Route path="/edit/:id" component={EditAppointment} />
            <Route path="/create" component={CreateAppointment} />
            <Route path="/user" component={CreateUser} />
          </div>
        }

      </div>
    </Router>
  );
}

export default App;
