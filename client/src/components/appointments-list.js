import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as constants from '../consts/env';

const Appointment = ({appointment, deleteAppointment}) => (
  <tr>
    <td>{appointment.provider}</td>
    <td>{appointment.username}</td>
    <td>{appointment.description}</td>
    <td>{appointment.duration}</td>
    <td>{appointment.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+appointment._id}>edit</Link> | <a href="#" onClick={() => {deleteAppointment(appointment._id)}}>delete</a>
    </td>
  </tr>
)

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);  
  
  const fetchAppointments = async () => {
    const provider = window.localStorage.getItem('appointuser');
    const {data} = await axios.get(`${constants.DB_URL}/appointments/?provider=${provider}`);
    setAppointments(data);
  }
  
  const deleteAppointment = (id) => {
    axios.delete(`${constants.DB_URL}/appointments/${id}`)
      .then(response => { console.log(response.data)});
  
    setAppointments(appointments.filter(el => el._id !== id));
  }

  const appointmentList = () => {
    return appointments.map(currentappointment => {
      return <Appointment appointment={currentappointment} deleteAppointment={deleteAppointment} key={currentappointment._id}/>;
    })
  }

  if (!appointments.length) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3>Logged Appointments</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Provider</th>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointmentList()}
        </tbody>
      </table>
    </div>
  )
};

export default AppointmentsList;