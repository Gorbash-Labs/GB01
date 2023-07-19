import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import '../styles/Homes.scss';
import { HomeHeader } from '../components/HomeHeader.jsx';
import { HomeBody } from '../components/HomeBody.jsx';

const Home = () => {
  return (
    <div className="homepage">
      <Navbar />
      <HomeHeader />
      <div className="input-container">
        <input
          type="text"
          className="input-bar-home"
          placeholder="Search APIs..."
        />
      </div>
      <HomeBody />
    </div>
  );
};

export default Home;
