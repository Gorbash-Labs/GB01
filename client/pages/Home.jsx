import React, { useReducer, useEffect, useContext, createContext } from 'react';
import Navbar from '../components/Navbar.jsx';
import Apicard from '../components/Apicard.jsx';
import './Home.scss';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';

import {
  homePageActions as actions,
  homePageStateInit as overlayStateInit,
  homePageReducer as overlayStateReducer,
} from '../reducers/homePageReducers.jsx';

import {
  StateContext as OverlayFormContext,
  DispatchContext as OverlayDispatchContext,
} from '../contexts/contexts.jsx';

const Home = () => {
  const [overlayState, overlayDispatch] = useReducer(
    overlayStateReducer,
    overlayStateInit,
  );

  const navigate = useNavigate();
  const params = useParams();

  function comments(e) {
    const senderTechId = e.target.id;
    const senderName = e.target.name;
    navigate(`/comments/${senderTechId}`); // received as route.params
  }

  // initializing the page
  useEffect(() => {
    overlayDispatch({ type: actions.LOAD });
  }, []);

  // loading state changed: making a fetch IF NOT IDLE
  useEffect(() => {
    const { loading, apiImageURL, apiDescription, apiName, apiUrl } =
      overlayState;
    switch (loading) {
      case 'load': {
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
            overlayDispatch({ type: actions.NEW_DATA, payload: newData });
          } catch (err) {
            console.log('Error occurred loading data from backend');
          }
        };
        fetchData();
        break;
      }

      case 'submit': {
        const fetchData = async () => {
          try {
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
                keywords: ['maps'],
              }),
            });

            const data = await response.json();
            console.log('success');
            console.log('data returned', data);
            if (data.length > overlayState.apiData.length) {
              overlayDispatch({ type: actions.NEW_DATA, payload: data });
            }
            overlayDispatch({ type: actions.EXIT });
          } catch (err) {
            console.log('Error occurred submitting data to backend');
          }
        };
        break;
      }

      default:
        break;
    }
  }, [overlayState.loading]);

  return (
    <OverlayDispatchContext.Provider value={overlayDispatch}>
      <OverlayFormContext.Provider value={overlayState}>
        <MainHeader />
        <ApisContainer comments={comments} />
      </OverlayFormContext.Provider>
    </OverlayDispatchContext.Provider>
  );
};

const ApisContainer = ({ comments }) => {
  const { apiData } = useContext(OverlayFormContext);
  const renderBox = () => {
    return apiData.map((item, index) => {
      return (
        <div className='box' key={index}>
          <div className='image-container'>
            <img src={item.image_url} alt='Tech' className='api-image' />
          </div>
          <div className='api-content'>
            <a href={item.link} className='tech-item-name'>
              {item.name}
            </a>
            <p>{item.description}</p>
            <div className='button-comment'>
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
    <div className='one'>
      <div className='scroll-container'>
        <div className='grid-container'>{renderBox()}</div>
      </div>
    </div>
  );
};

const MainHeader = () => {
  const { visible, apiName, apiURL, apiDescription, apiImageURL } =
    useContext(OverlayFormContext);
  const dispatch = useContext(OverlayDispatchContext);
  return (
    <div className='main-header'>
      <div>
        <div className='content'>
          <div className='home-top-all-content'>
            <div className='home-top-title-button'>
              <h2>Cohort: CTRI 17</h2> {/* Hard coded org name */}
              <div>
                <img src='./logo.png'></img>
              </div>
              <div>
                <button
                  className='button'
                  onClick={() => {
                    dispatch({ type: actions.SHOW_OVERLAY });
                  }}>
                  + ADD TECH
                </button>
              </div>
            </div>
            <div className='input-container'>
              <SearchBar />
            </div>
          </div>
          {visible && (
            <div className='overlay'>
              <div className='overlay-content'>
                <div>
                  <form>
                    <div className='formGroup'>
                      <button
                        className='exitButton'
                        onClick={() => {
                          dispatch({ type: actions.EXIT });
                        }}>
                        X
                      </button>
                      <h2>Add Tech</h2>
                      <input
                        type='text'
                        className='input-one'
                        placeholder='Add API Name'
                        value={apiName}
                        onChange={event => {
                          dispatch({
                            type: actions.NAME_INPUT,
                            payload: event.target.value,
                          });
                        }}
                      />

                      <input
                        type='text'
                        className='input-one'
                        placeholder='Add API URL'
                        value={apiURL}
                        onChange={event => {
                          dispatch({
                            type: actions.URL_INPUT,
                            payload: event.target.value,
                          });
                        }}
                      />
                      <textarea
                        className='input-one'
                        rows='3'
                        maxLength='150'
                        placeholder='Add Brief Description'
                        value={apiDescription}
                        onChange={event => {
                          dispatch({
                            type: actions.DESCRIPTION_INPUT,
                            payload: event.target.value,
                          });
                        }}
                      />
                      <input
                        type='text'
                        className='input-one'
                        placeholder='Add Image URL'
                        value={apiImageURL}
                        onChange={event => {
                          dispatch({
                            type: actions.IMAGE_URL_INPUT,
                            payload: event.target.value,
                          });
                        }}
                      />
                      <input
                        type='file'
                        className='input-one'
                        accept='image/*'
                      />
                    </div>

                    <div className='btn'>
                      <button
                        className='login-button'
                        onClick={() => {
                          dispatch({ type: 'SUBMIT' });
                        }}>
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
