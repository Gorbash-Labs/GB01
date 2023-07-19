import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//add containers and requirements for JS
import Navbar from '../components/Navbar.jsx';
// import CLIENT_ID from '../../.env';

const Login = (props) => {
  // const [resData, setResData] = useState();
  const handleLogin = () => {
    console.log('invoked handleLogin');
    fetch('localhost8080/oauth')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log('an error occurred'));
  };

  // async function handleLogin() {
  //   const res = await fetch('localhost8080/oauth');
  //   const data = await res.json();
  //   this.setResData({ data });
  // }

  // const handleClick =
  // const CLIENT_ID = process.env.CLIENT_ID;
  // console.log(CLIENT_ID);
  // console.log;
  const CLIENT_ID = '2887785098e44077bd7b';
  const hrefString =
    'https://github.com/login/oauth/authorize?scope=user:email&client_id=' +
    CLIENT_ID;
  console.log(CLIENT_ID);
  return (
    <div className="wrapper">
      <Navbar />
      <div className="body2">
        <a href={hrefString}>Click here</a>
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
