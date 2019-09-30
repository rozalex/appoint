import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as constants from '../consts/env';

const Navbar = ({loggedIn, setLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = window.localStorage.getItem('appointuser');
    const pass = window.localStorage.getItem('appointpass');    
    if (user && pass) {
      doLogin(user, pass)
    }
  }, []);

  const doLogin = async (user, pass) => {
    const loginData = {
      username: user ? user: username,
      password: pass ? pass: password
    }

    const {data} = await axios.post(`${constants.DB_URL}/users/authenticate`, loginData);
    if (data.user) {
      setLoggedIn(true);
      window.localStorage.setItem('appointuser', data.user.username);
      window.localStorage.setItem('appointpass', loginData.password);
    }
  }

  const onUsernameChange = event => setUsername(event.target.value);
  const onPasswordChange = event => setPassword(event.target.value);

  return (
    <nav className="navbar navbar-light bg-light navbar-expand-lg">
      <Link to="/" className="navbar-brand">AppPoint.</Link>
      {
        loggedIn ? 
        <React.Fragment>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Appointment List</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Appointment</Link>
              </li>
              <li className="navbar-item">
                <Link to="/user" className="nav-link">Create User</Link>
              </li>
            </ul>
          </div>
          <div className="flexout">
            <button 
              type="button" 
              className="form-control form-control-sm"
              onClick={() => {
                setLoggedIn(false);
                localStorage.removeItem('appointuser');
                localStorage.removeItem('appointpass');
              }}>
                Logout
            </button>
          </div> 
        </React.Fragment>
        :
        <div className="md-form form-sm flexin">
            <input type="text" value={username} onChange={onUsernameChange} placeholder="username" className="form-control form-control-sm" />
            <input type="password" value={password} onChange={onPasswordChange} placeholder="password" className="form-control form-control-sm" />
            <button 
              type="button" 
              className="form-control form-control-sm"
              onClick={() => {doLogin(null, null)}}>
                Login
            </button>
        </div>
      }
    </nav>
  );
}

export default Navbar;