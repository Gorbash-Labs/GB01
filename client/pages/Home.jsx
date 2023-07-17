import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import './Home.scss';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  const openOverlay = () => {
    setShowOverlay(true);
  };

  function comments() {
    navigate('/Comments');
  }
  const renderBox = (data) => {
    return data.map((item, index) => (
      <div className="box" key={index}>
        <div className="image-container">
          <img src={item.image} alt="API" className="api-image" />
        </div>
        <div className="api-content">
          <h3>{item.header}</h3>
          <a href={item.link}>{item.link}</a>
          <p>{item.paragraph}</p>
          <div className="button-comment">
            <button onClick={comments}>API Posts</button>
          </div>
        </div>
      </div>
    ));
  };

  const mockData = [
    {
      header: 'Google Maps API',
      link: 'https://developers.google.com/maps/documentation/javascript/overview',
      paragraph:
        'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
      image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
    },
    {
      header: 'Google Maps API',
      link: 'https://developers.google.com/maps/documentation/javascript/overview',
      paragraph:
        'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
      image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
    },
    {
      header: 'Google Maps API',
      link: 'https://developers.google.com/maps/documentation/javascript/overview',
      paragraph:
        'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
      image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
    },
    {
      header: 'Google Maps API',
      link: 'https://developers.google.com/maps/documentation/javascript/overview',
      paragraph:
        'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
      image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
    },
    {
      header: 'Google Maps API',
      link: 'https://developers.google.com/maps/documentation/javascript/overview',
      paragraph:
        'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
      image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
    },
    {
      header: 'Google Maps API',
      link: 'https://developers.google.com/maps/documentation/javascript/overview',
      paragraph:
        'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
      image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
    },
    {
      header: 'Google Maps API',
      link: 'https://developers.google.com/maps/documentation/javascript/overview',
      paragraph:
        'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
      image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
    },
    {
      header: 'Google Maps API',
      link: 'https://developers.google.com/maps/documentation/javascript/overview',
      paragraph:
        'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
      image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="main-header">
        <div>
          <div className="content">
            <h2>Cohort: CTRI 17</h2>
            <button className="button" onClick={openOverlay}>
              + ADD API
            </button>
            {showOverlay && (
              <div className="overlay">
                <div className="overlay-content">
                  <div>
                    <form>
                      <div className="formGroup">
                        <h2>Add API</h2>
                        <input
                          type="text"
                          className="input-one"
                          placeholder="Add API Name"
                          // value={}
                          // onChange={(event) => {
                          //
                          // }}
                        />
                        <input
                          type="text"
                          className="input-one"
                          placeholder="Add API URL"
                          // value={}
                          // onChange={(event) => {
                          //
                          // }}
                        />
                        <textarea
                          className="input-one"
                          rows="3"
                          maxLength="150"
                          placeholder="Add Brief Description"
                          // value={}
                          // onChange={(event) => {
                          //
                          // }}
                        />
                        <input
                          type="file"
                          className="input-one"
                          accept="image/*"
                          // onChange={(event) => {
                          //
                          // }}
                        />
                      </div>
                      <div className="btn">
                        <button type="submit" className="login-button">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="input-container">
            <input
              type="text"
              className="input-bar"
              placeholder="Search APIs..."
            />
          </div>
        </div>
      </div>
      <div className="one">
        <div className="scroll-container">
          <div className="grid-container">{renderBox(mockData)}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
