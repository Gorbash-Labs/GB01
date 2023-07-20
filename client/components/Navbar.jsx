import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.scss';
import { UserIdContext } from '../contexts/Contexts';

export default function Navbar() {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { globalId, setGlobalId } = useContext(UserIdContext);

  function home() {
    navigate('/Home');
  }
  function Login() {
    navigate('/Login');
  }
  function Profile() {
    navigate('/Profile');
  }
  function LogOut() {
    setGlobalId('');
  }
  function CreateUser() {
    navigate('/createuser');
  }

  return (
    <div className="Nav">
      {typeof globalId === 'number' ? (
        <ul className="Navbar">
          <li>
            <img src="icon.png" className="icon" />
          </li>
          <li className="NavButton" onClick={home}>
            Home
          </li>
          <li className="NavButton" onClick={Profile}>
            Profile
          </li>
          <li className="NavButton" onClick={LogOut}>
            Log Out
          </li>
        </ul>
      ) : (
        <ul className="Navbar">
          <li>
            <img src="icon.png" className="icon" />
          </li>
          <li className="NavButton" onClick={home}>
            Home
          </li>
          <li className="NavButton" onClick={Login}>
            Login
          </li>
          <li className="NavButton">Create Account</li>
        </ul>
      )}
    </div>
  );
}
