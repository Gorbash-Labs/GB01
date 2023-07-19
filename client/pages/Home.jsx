import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import './Home.scss';
import { useNavigate, useParams } from 'react-router-dom';


const Home = () => {
  //overlay state for showing the form, set true to appear
  const [showOverlay, setShowOverlay] = useState(false);

  //state for the form inputs
  const [apiName, setApiName] = useState('');
  const [apiURL, setApiURL] = useState('');
  const [apiDescription, setApiDescription] = useState('');
  const [apiImageURL, setApiImageURL] = useState('');
  const [apiData, setApiData] = useState([]);

  const navigate = useNavigate();

  const openOverlay = () => {
    setShowOverlay(true);
  };

  const params = useParams();

  function comments(e) {
    const senderTechId = e.target.id;
    const senderName = e.target.name;
    navigate(`/comments/${senderTechId}`); // received as route.params
    //
  }

  const addAPI = async () => {
    console.log('addAPI inside');
    event.preventDefault();

    try {
      setShowOverlay(false);

      const response = await fetch('/api/tech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: apiName,
          link: apiURL,
          image: apiImageURL,
          typeApi: false,
          typeFramework: false,
          typeLibrary: false,
          description: apiDescription,
          // keywords: [],
        }),
      });

      const data = await response.json();
      console.log('success');
      console.log('data returned', data);
    } catch (err) {
      console.log(err);
    }
  };

  // initializing the page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/tech', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        const newData = JSON.parse(JSON.stringify(data));
        setApiData(newData);
      } catch (err) { }
    };
    fetchData();
  }, []);

  const renderBox = () => {
    return apiData.map((item, index) => {
      console.log(item);

      return (
        <div className="box" key={index}>
          <div className="image-container">
            <img src={item.image_url} alt="Tech" className="api-image" />
          </div>
          <div className="api-content">
            <a href={item.link} className="tech-item-name">
              {item.name}
            </a>
            <p>{item.description}</p>
            <div className="button-comment">
              <button onClick={comments} id={item.tech_id}>
                Posts
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <Navbar />

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
                  <button className="button" onClick={openOverlay}>
                    + ADD TECH
                  </button>
                </div>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  className="input-bar-home"
                  placeholder="Search APIs..."
                />
              </div>
            </div>
            {showOverlay && (
              <div className="overlay">
                <div className="overlay-content">
                  <div>
                    <form>
                      <div className="formGroup">
                        <h2>Add Tech</h2>
                        <input
                          type="text"
                          className="input-one"
                          placeholder="Add API Name"
                          value={apiName}
                          onChange={(event) => {
                            setApiName(event.target.value);
                          }}
                        />

                        <input
                          type="text"
                          className="input-one"
                          placeholder="Add API URL"
                          value={apiURL}
                          onChange={(event) => {
                            setApiURL(event.target.value);
                          }}
                        />
                        <textarea
                          className="input-one"
                          rows="3"
                          maxLength="150"
                          placeholder="Add Brief Description"
                          value={apiDescription}
                          onChange={(event) => {
                            setApiDescription(event.target.value);
                          }}
                        />
                        <input
                          type="text"
                          className="input-one"
                          placeholder="Add Image URL"
                          value={apiImageURL}
                          onChange={(event) => {
                            setApiImageURL(event.target.value);
                          }}
                        />
                        <input
                          type="file"
                          className="input-one"
                          accept="image/*"
                        />
                      </div>

                      <div className="btn">
                        <button className="login-button" onClick={addAPI}>
                          Submit!
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
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
