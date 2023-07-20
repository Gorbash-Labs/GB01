import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//add containers and requirements for JS
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import '../styles/Login.scss';
import { UserIdContext } from '../contexts/Contexts.jsx';

const Login = (props) => {
  const CLIENT_ID = '12511d91e841945b2edd';
  const CLIENT_SECRETS = 'a0c26008058e961a4ceea77439f79c8ec02f916c';
  //create a state of invalid usernmae/passowrd initialixed to false
  const [validLogin, setvalidLogin] = useState(false);
  const navigate = useNavigate()
  const { setGlobalId } = useContext(UserIdContext)

  const [info, setInfo] = useState({ username: '', password: '' });
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  // Load Apis
  useEffect(() => {
    const queryString = window.location.search;
    console.log('queryString is', queryString);
    const urlParams = new URLSearchParams(queryString);
    console.log('urlParams is', urlParams);
    const code = urlParams.get('code');
    console.log('code is', code);

    if (code && !localStorage.getItem('accessToken')) {
      async function getAccessToken() {
        await fetch(`http://localhost:3000/getAccessToken?code=${code}`, {
          method: 'GET',
        })
          .then((res) => {
            console.log('res is', res);
            return res.json();
          })
          .then((data) => {
            console.log('frontend data: ', data);
            if (data.access_token) {
              console.log('data.accessToken is', data.access_token);
              localStorage.setItem('accessToken', data.access_token);
              setvalidLogin(!validLogin);
            }
          });
      }
      getAccessToken();
    }
  }, []);

  //Check log in
  useEffect(() => {
    // check if the session is avaiable
    console.log('checking for active session');
    const checkSession = async () => {
      const res = await fetch('/api/user/checkSession', {
        method: 'GET',
      });
      const data = await res.json();
      console.log(data);
      if (data.authenticate) {
        setGlobalId(data.id);
        setvalidLogin(true);
      }
    };
    checkSession();
    setLoading(false);
  }, []);

  //Gitapi
  async function getUserData() {
    await fetch(`http://localhost:3000/getUserData`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('userData is', data);
        setUserData(data);
      });
  }

  function loginByGithub() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
  }

  // Handle regular Login
  const handleClick = async (e) => {
    const res = await fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: info.username,
        password: info.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const id = await res.json();
    console.log('res is', id);
    if (typeof id === 'number') {
      setGlobalId(id);
      setvalidLogin(true);

    } else {
      alert("invalid username/password")
    }
  };

  return (
    <div>
      <Navbar />
      <div className="loginbackground">
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
                  className='logininput'
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
                  className='logininput'
                  name="password"
                  required
                  value={info.password}
                  onChange={e => {
                    setInfo({ ...info, password: e.target.value })
                  }} />
                <button id='allbuttons' type="submit" onClick={handleClick}>Login</button>
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
                <div className="text">
                  <h4>Hey there {userData.login}</h4>
                </div>

                <img className="user-image" src={userData.avatar_url} />
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
          )}
        </div>
      </div>
    );
  }
};

export default Login;
