import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//add containers and requirements for JS
import Navbar from '../components/Navbar.jsx';
// import CLIENT_ID from '../../.env';

const Login = (props) => {
  useEffect(() => {
    // if (cookie exists) then redirect to home page
    console.log(document.cookie);
    const cookieString = document.cookie;
    const cookieObj = {};
    let currentlyBuilding = 'cookieName';
    let cookieName = '';
    let cookieVal = '';
    for (let i = 0; i < cookieString.length; i++) {
      let currentChar = cookieString[i];
      if (currentChar === '=') {
        currentlyBuilding = 'cookieVal';
      } else if (currentChar === ';') {
        currentlyBuilding = 'cookieName';
        cookieObj[cookieName] = cookieVal;
        cookieName = '';
        cookieVal = '';
      } else if (i === cookieString.length - 1) {
        cookieVal += currentChar;
        currentlyBuilding = 'cookieName';
        cookieObj[cookieName] = cookieVal;
        cookieName = '';
        cookieVal = '';
      } else if (currentChar === ' ') continue;
      else {
        if (currentlyBuilding === 'cookieName') cookieName += currentChar;
        if (currentlyBuilding === 'cookieVal') cookieVal += currentChar;
      }
    }
    console.log('cookieObj: ', cookieObj);
    if (cookieObj.userName) {
      localStorage.setItem('username', cookieObj.userName);
      window.location.href = 'http://localhost:8080';
      alert('Successfully Logged In');
    } else alert('Please log in');
  }, []);

  const handleLogin = (e) => {
    window.location.href = '/api/oauth';
  };

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
