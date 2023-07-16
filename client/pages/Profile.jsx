import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//add containers and requirements for JS
import Navbar from '../components/Navbar.jsx'

const Profile = () => {
  return (
    <div>
    <Navbar />
      <div>test profile!! </div>
    </div>
  )
}

export default Profile