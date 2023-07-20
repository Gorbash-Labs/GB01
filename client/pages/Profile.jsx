import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//add containers and requirements for JS
import Navbar from '../components/Navbar.jsx';

const Profile = (props) => {
  const navigate = useNavigate();

  const handleLogOutUser = () => {
    localStorage.removeItem('username');
    navigate('/home');
  };

  return (
    <div>
      <p>Hello {localStorage.getItem('username')}</p>
      <button onClick={handleLogOutUser}>Log Out</button>
    </div>
  );
};

export default Profile;
