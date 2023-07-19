import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//add containers and requirements for JS
import Navbar from '../components/Navbar.jsx'
import '../styles/Login.scss'




const Login = (props) => {

  const CLIENT_ID = "12511d91e841945b2edd";
  const CLIENT_SECRETS = "a0c26008058e961a4ceea77439f79c8ec02f916c";
  //create a state of invalid usernmae/passowrd initialixed to false
  const [validLogin, setvalidLogin] = useState(false);

  const [info, setInfo] = useState({ username: '', password: '' })
  const [userData, setUserData] = useState({})

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
  //     await fetch('dummy', {
  //       method: "POST",
  //       body: JSON.stringify({
  //         username: un,
  //         password: pw,
  //       }),
  //     }).then(res => {
  //       //convert with json
  //       res.json();
  //     }).then(resObj => {
  //       //expect object with key status: 'logged in' OR 'failed login'
  //       if (resObj.status === 'logged in') {
  //         //set loggedInStatus to their id number (give them a cookie stretch goal)
  //         props.loggedIn(resObj.userId);
  //         //navigate to home with their loggedIn cookie in place
  //         window.location.href = path.resolve(__dirName, './Home.jsx');
  //       } else if (resObj.status === 'failed login') {
  //         //change state of 'invalidLogin to true & reveal a div with 'invalid username or passowrd displayed
  //         setShowInvalidLogin(true);
  //       } else {
  //         //error! neither logged in NOR failed to login!
  //         throw new Error
  //       };
  //     }).catch(err => {
  //       console.log('retrival of Login Attempt failed: ', err)
  //     })
  //   } else { //-->new USER selected
  //     const url = path.resolve(__dirName, '/api/user/newuser');
  //     await fetch('dummy', { //-->/api/user/newuser
  //       method: "POST",
  //       body: JSON.stringify({
  //         username: un,
  //         password: pw,
  //       }),
  //     }).then(res => {
  //       res.json();
  //     }).then(resObj => {
  //       //expect object with key status: 'NEW logged in' OR 'failed login'
  //       if (resObj.status === 'logged in') {
  //         //set loggedInStatus to their id number (give them a cookie stretch goal)
  //         props.loggedIn(resObj.userId);
  //         //navigate to home with their loggedIn cookie in place
  //         window.location.href = path.resolve(__dirName, './Home.jsx');
  //       } else if (resObj.status === 'failed signup') {
  //         //change state of 'invalidLogin to true & reveal a div with 'invalid username or passowrd displayed
  //         setShowInvalidLogin(true);
  //       } else {
  //         //error! neither logged in NOR failed to login!
  //         throw new Error
  //       };
  //     }).catch(err => {
  //       console.log('retrieval of SignUp failed: ', err)
  //     })
  //   }
  // }


  useEffect(() => {
    const queryString = window.location.search;
    console.log("queryString is", queryString)
    const urlParams = new URLSearchParams(queryString);
    console.log("urlParams is", urlParams)
    const code = urlParams.get('code');
    console.log("code is", code)

    if (code && (!localStorage.getItem("accessToken"))) {
      async function getAccessToken() {
        await fetch(`http://localhost:3000/getAccessToken?code=${code}`, {
          method: "GET"
        }).then(res => {
          console.log("res is", res)
          return res.json()
        }).then(data => {
          console.log("frontend data: ", data)
          if (data.access_token) {
            console.log("data.accessToken is", data.access_token)
            localStorage.setItem("accessToken", data.access_token)
            setvalidLogin(!validLogin);


          }
        })

      }
      getAccessToken();
    }

  }, [])


  async function getUserData() {
    await fetch(`http://localhost:3000/getUserData`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(response => {
      return response.json()
    }).then(data => {
      console.log("userData is", data)
      setUserData(data)
    })
  }

  function loginByGithub() {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
  }

  const handleClick = async e => {
    const res = await fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: info.username,
        password: info.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log("res is", res)
    if (res) {
      setvalidLogin(true);
    }
  }

  return (
    <div>
      <Navbar />
      <body>
        {!localStorage.getItem("accessToken") && !validLogin ?
          <>
            <div className="formHeader">
              <h3>Welcome back!</h3>
              <h3>Log in with your name and password</h3>
            </div>
            <div class="container">
              <div class="login-form">
                <h2>Login</h2>
                <label for="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={info.username}
                  onChange={e => {
                    setInfo({ ...info, username: e.target.value })
                  }} />
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={info.password}
                  onChange={e => {
                    setInfo({ ...info, password: e.target.value })
                  }} />
                <button type="submit" onClick={handleClick}>Login</button>
              </div>
            </div>
            <hr width="70%" />

            <div class="container" onClick={loginByGithub}>
              <a class="github-button">
                <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" alt="GitHub logo" class="github-logo" />
                <span>Login with GitHub</span>
              </a>
            </div>
          </>
          :
          <>
            <h2>Successfully Logged In</h2>
            <button onClick={getUserData}>Get User Data</button>
            {Object.keys(userData).length !== 0 ?
              <>
                <h4>Hi there {userData.login}</h4>
              </>
              :
              <>
                <h4>No data available</h4>
              </>
            }

            <footer>
              <p>&copy; 2023 Goru. All rights reserved.</p>
            </footer>
          </>
        }
      </body >
    </div>
  )
}



export default Login

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