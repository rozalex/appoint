import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Appointment = props => (
  <tr>
    <td>{props.appointment.username}</td>
    <td>{props.appointment.description}</td>
    <td>{props.appointment.duration}</td>
    <td>{props.appointment.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.appointment._id}>edit</Link> | <a href="#" onClick={() => { props.deleteAppintment(props.appointment._id) }}>delete</a>
    </td>
  </tr>
)

export default class AppointmentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {appointments: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/appointments/')
      .then(response => {
        this.setState({ appointments: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise = (id) => {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      appointments: this.state.appointments.filter(el => el._id !== id)
    })
  }

  appointmentList() {
    return this.state.appointments.map(currentappointment => {
      return <Appointment appointment={currentappointment} deleteAppintment={this.deleteAppintment} key={currentappointment._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Appointments</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.appointmentList() }
          </tbody>
        </table>
      </div>
    )
  }
}