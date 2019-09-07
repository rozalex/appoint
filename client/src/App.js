import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import AppointmentList from "./components/appointments-list.component";
import EditAppointment from "./components/edit-appointment.component";
import CreateAppointment from "./components/create-appointment.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
        <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={AppointmentList} />
        <Route path="/edit/:id" component={EditAppointment} />
        <Route path="/create" component={CreateAppointment} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
