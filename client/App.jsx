import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
// import helperFunctions from './helper-functions.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//add containers and requirements for JS
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Comments from './pages/Comments.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import styles from './_appStyles.scss';
import './app.scss';

const App = () => {
  //create a High Level state for whether the user is logged in or not
  //make the loggedInStatus either false OR the User's ID/cookie from database as idenfier
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Home />}
          loggedIn={setLoggedInStatus}
          userId={loggedInStatus}
        />
        <Route
          path='home'
          element={<Home />}
          loggedIn={setLoggedInStatus}
          userId={loggedInStatus}
        />
        <Route
          path='comments/:id'
          element={<Comments />}
          loggedIn={setLoggedInStatus}
          userId={loggedInStatus}
        />
        <Route
          path='login'
          element={<Login />}
          loggedIn={setLoggedInStatus}
          userId={loggedInStatus}
        />
        <Route
          path='profile'
          element={<Profile />}
          loggedIn={setLoggedInStatus}
          userId={loggedInStatus}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// const mdTestString =
// 'Inside the **App** with *markdown*!\n' +
// '\n``` const test = [1,2,3];```\n[reddit](www.reddit.com)';

// return <div>{helperFunctions.md(mdTestString)}</div>;
