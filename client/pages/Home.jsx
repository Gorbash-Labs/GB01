import React, { useState, useEffect } from 'react';
import '../stylesheets/Home.scss';
import { useNavigate, useParams } from 'react-router-dom';
import TechCard from '../components/TechCard.jsx';
import AddTechPopup from '../components/AddTechPopup.jsx';

const Home = () => {
  //overlay state for showing the form, set true to appear
  const [showOverlay, setShowOverlay] = useState(false);

  const [techCardState, settechCardState] = useState([]);

  // initializing the page
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/tech', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      settechCardState(data);
    } catch (err) {
      console.log('err', err);
    }
  };

  const renderBox = () => {
    return techCardState.map((item, index) => {
      return (
        <TechCard
          key={index}
          name={item.name}
          description={item.description}
          id={item.tech_id}
          image_url={item.image_url}
          link={item.link}
        />
      );
    });
  };

  const handleAddTechSubmit = async (e) => {
    e.preventDefault();

    const body = {
      name: e.target.name.value,
      link: e.target.link.value,
      image: e.target.image.value,
      typeApi: false,
      typeFramework: false,
      typeLibrary: false,
      description: e.target.description.value,
      keywords: ['maps'],
    };

    try {
      setShowOverlay(false)

      const response = await fetch('/api/tech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      fetchData();
  
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="main-header">
        <div>
          <div className="content">
            <div className="home-top-all-content">
              <div className="home-top-title-button">
                <h2>Cohort: CTRI 17</h2>
                <div>
                  <img src="./logo.png"></img>
                </div>
                <div>
                  <button className="button" onClick={()=> setShowOverlay(true)}>
                    + ADD TOPIC
                  </button>
                </div>
              </div>
              {/* <div className="input-container">
                <input
                  type="text"
                  className="input-bar-home"
                  placeholder="Search APIs..."
                />
              </div> */}
            </div>
            {showOverlay && <AddTechPopup 
            overlayOff = {() => setShowOverlay(false)}
            handleAddTechSubmit={handleAddTechSubmit}/>}
          </div>
        </div>
      </div>
      <div className="one">
        <div className="scroll-container">
          <div className="grid-container">{renderBox()}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// const mockData = [
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
//   {
//     header: 'Google Maps API',
//     link: 'https://developers.google.com/maps/documentation/javascript/overview',
//     paragraph:
//       'Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.',
//     image: 'https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png',
//   },
// ];
