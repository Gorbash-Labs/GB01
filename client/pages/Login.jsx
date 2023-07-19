import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//add containers and requirements for JS
import Navbar from '../components/Navbar.jsx';

const Login = () => {

  const navigate = useNavigate();

  const [loggedInState, setloggedInState] = useState(0);

  const handleLoginSubmit = () => {
    const users = {
      kevin: '1234',
      tyler: '1234',
    };

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    if (users[username] && users[username] === password) {
      console.log('here');
      localStorage.setItem('username', username);
      navigate('/home');
    } else {
      setloggedInState(1);
    }
  };
  // //create a state of invalid usernmae/passowrd initialixed to false
  // const [invalidLogin, setShowInvalidLogin] = useState(false);

  // //when someone puts in their form info, handle a login request
  // const handleLogin = async (e) => {
  //   console.log("Event Data: ", e);
  //   //make a fetch request to the server to post a username and password login
  //   const un = e.target.username;
  //   const pw = e.target.password;
  //   //check if new user is toggled
  //   const newUser = e.target.new_user;
  //   if (!newUser) { //-->login request (NOT a new user)
  //     const url = path.resolve(__dirName, '/api/user/login')
  //     //if good match, post back the home page with access to create an api
  //     //else bad match, post back a toggle which shows div "username or password invalid"
  //     await fetch ( 'dummy', {
  //       method: "POST",
  //       body: JSON.stringify({
  //         username: un,
  //         password: pw,
  //       }),
  //     }).then (res => {
  //       //convert with json
  //       res.json();
  //     }).then (resObj => {
  //       //expect object with key status: 'logged in' OR 'failed login'
  //       if (resObj.status === 'logged in') {
  //         //set loggedInStatus to their id number (give them a cookie stretch goal)
  //         props.loggedIn(resObj.userId);
  //         //navigate to home with their loggedIn cookie in place
  //         window.location.href = path.resolve(__dirName, './Home.jsx');
  //       } else if  (resObj.status === 'failed login') {
  //         //change state of 'invalidLogin to true & reveal a div with 'invalid username or passowrd displayed
  //         setShowInvalidLogin(true);
  //       } else {
  //         //error! neither logged in NOR failed to login!
  //         throw new Error
  //       };
  //     }).catch (err => {
  //       console.log('retrival of Login Attempt failed: ', err)
  //     })
  //   } else { //-->new USER selected
  //     const url = path.resolve(__dirName, '/api/user/newuser');
  //     await fetch ('dummy', { //-->/api/user/newuser
  //       method: "POST",
  //       body: JSON.stringify({
  //         username: un,
  //         password: pw,
  //       }),
  //     }).then (res => {
  //       res.json();
  //     }) .then (resObj => {
  //       //expect object with key status: 'NEW logged in' OR 'failed login'
  //       if (resObj.status === 'logged in') {
  //         //set loggedInStatus to their id number (give them a cookie stretch goal)
  //         props.loggedIn(resObj.userId);
  //         //navigate to home with their loggedIn cookie in place
  //         window.location.href = path.resolve(__dirName, './Home.jsx');
  //       } else if  (resObj.status === 'failed signup') {
  //         //change state of 'invalidLogin to true & reveal a div with 'invalid username or passowrd displayed
  //         setShowInvalidLogin(true);
  //       } else {
  //         //error! neither logged in NOR failed to login!
  //         throw new Error
  //       };
  //     }).catch (err => {
  //       console.log('retrieval of SignUp failed: ', err)
  //     })
  //   }
  // }

  return (
    <div>
      <input type="text" placeholder="username" id="username"></input> <br></br>
      <input type="text" placeholder="password" id="password"></input> <br></br>
      <button onClick={handleLoginSubmit}>Submit</button>
      {loggedInState === 1 ? <p>incorrect username and password</p> : ''}
    </div>
  );
};

export default Login;

/* 

const [UN, setUN] = setState('')

const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: UN, password: PW }),      <-
      });
      console.log(response);
      const data = response.json();
      if (response.ok) {
        console.log('Frontend Login successful');
        setIsLoggedIn(true);
      } else {
        console.log('Frontend Login unsuccesful');
        setIncorrect('Incorrect combination. Try again.');
      }
    } catch (err) {
      console.error('Error in Frontend Login');
    }
  };



  HTML:
  <Button onClick={() => handleLogin())}>

  <input 
  type='text' 
  className='login_username' 
  placeholder='Username' 
  onChange={(e) => setPW(e.target.value)
  ></input>



  function mergedFunction() {
    const username = dummy.innerhtml
    setUN(username)
    handleLogin()
  }


  <Button classname='dummy' onClick={mergedFunction}>

*/
