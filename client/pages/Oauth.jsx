import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//add containers and requirements for JS
import Navbar from '../components/Navbar.jsx';
// import CLIENT_ID from '../../.env';

const Login = (props) => {
  const handleLogin = () =>  {
    fetch()
  }
  // const handleClick =
  // const CLIENT_ID = process.env.CLIENT_ID;
  // console.log(CLIENT_ID);
  // console.log;
  // const CLIENT_ID = '2887785098e44077bd7b';
  // const hrefString =
  //   'https://github.com/login/oauth/authorize?scope=user:email&client_id=' +
  //   CLIENT_ID;
  // console.log(CLIENT_ID);
  return (
    <div className="wrapper">
      <Navbar />
      <div className="body2">
        {/* <a href={hrefString}>Click here</a> */}
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
