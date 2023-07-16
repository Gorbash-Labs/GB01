import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//add containers and requirements for JS
import Navbar from '../components/Navbar.jsx';


const Home = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const openOverlay = () => {
    setShowOverlay(true);
  };

  return (
    <div className='wrapper'>
      <Navbar />
      <div className='pageMaterial'>
        <div className='homeHead'>
          <div className="cohortId">potato</div>
          <div className="content">
            <button className="button" onClick={openOverlay}>ADD API</button>
          </div>
        <div>h</div>
          {showOverlay && (
            <div className="overlay">
              <div className="overlay-content">
                <div>
                  <form>
                    <div className="formGroup">
                      <h3>API</h3>
                      <input
                        type="text"
                        className="input-one"
                      // value={}
                      // onChange={(event) => {
                      //
                      // }}
                      />
                      <h3>Link:</h3>
                      <input
                        type="text"
                        className="input-one"
                      // value={}
                      // onChange={(event) => {

                      // }}
                      />
                    </div>
                    <button type="submit" className="login-button">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='pageMaterial'>
        <div class="searchbarHome">searchbar</div>
      </div>
    </div>
  )
};

export default Home;

