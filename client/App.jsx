import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
// import helperFunctions from './helper-functions.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//add containers and requirements for JS
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Comments from './pages/Comments.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import styles from './_appStyles.scss';
import './app.scss'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route path="home" element={<Home />}/>
        <Route path="comments" element={<Comments />}/>
        <Route path="login" element={<Login />}/>
        <Route path="profile" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  )
};

export default App;






// const mdTestString =
// 'Inside the **App** with *markdown*!\n' +
// '\n``` const test = [1,2,3];```\n[reddit](www.reddit.com)';

// return <div>{helperFunctions.md(mdTestString)}</div>;