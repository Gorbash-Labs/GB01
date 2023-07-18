import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//add containers and requirements for JS
import Navbar from '../components/Navbar.jsx';

const Login = (props) => {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="body2">
        <div className="submit_button_box">
          <button
            className="form_submit_button"
            value="Submit"
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            Submit Login Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
