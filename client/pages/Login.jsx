import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//add containers and requirements for JS
import Navbar from '../components/Navbar.jsx'

const Login = () => {
  //create a state of invalid usernmae/passowrd initialixed to false
  const [invalidLogin, setShowInvalidLogin] = useState(false);
  //when someone puts in their form info, handle a login request
  const handleLogin = (e) => {
    //make a fetch request to the server to post a username and password login
    const username = e.target.username;
    const password = e.target.password;
      //if good match, post back the home page with access to create an api
      //else bad match, post back a toggle which shows div "username or password invalid"
    fetch ('dummy URL Endpoint For Server', {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then (res => {
      //convert with json
      res.json();
    }).then (resObj => {
      //expect object with key status: 'logged in' OR 'failed login'
      if (resObj.status === 'logged in') {
        //navigate to home with their loggedIn cookie in place
        window.location.href = path.resolve(__dirName, './Home.jsx')
      } else if (resObj.status === 'failed login') {
        //change state of 'invalidLogin to true & reveal a div with 'invalid username or passowrd displayed
        setShowInvalidLogin(true)
      } else {
        //error! neither logged in NOR failed to login!
        return error
      }
    }).catch (err => {
      console.log('retrival of Login Attempt failed: ', err)
    })
  }
  return (
    <div className='wrapper'>
      <Navbar />
      <div className="body2">
        <div className="form_contents">
          <div className="login_form_container">
            <form className='login_form'>
              <label>Username</label>
              <input type='text' className='login_username' placeholder='Username'></input>
              <label>Password</label>
              <input type='text' className='login_password' placeholder='Password'></input>
            </form>
          </div>
        </div>
          <div className='response_button'>
            {invalidLogin && (<div className='invalid_login'>Invalid Username Or Password</div>)}
            <div className="submit_button_box">
              <button className="form_submit_button">Submit Login Credentials</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login