import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//add containers and requirements for JS
import Navbar from '../components/Navbar.jsx'
import './Home.css'
const Home = () => {
  return (
    <div className='wrapper'>
      <Navbar />
      <div className='pageMaterial'>
        <div className='homeHead'>
          <div className="cohortId">potato</div>
          <button className="createApi">brocoli</button>
        </div>
      </div>
      <div className='pageMaterial'>
        <div class="searchbarHome">searchbar</div>
      </div>
    </div>
  )
};

export default Home;