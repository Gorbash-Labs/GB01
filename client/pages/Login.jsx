import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//add containers and requirements for JS
import Navbar from '../components/Navbar.jsx'

const Login = () => {
  return (
    <div>
    <Navbar />
      <div>test login!!</div>
    </div>
  )
}

export default Login