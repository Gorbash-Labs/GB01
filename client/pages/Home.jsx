import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import './Home.scss';
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  const [apiName, setApiName] = useState('');
  const [apiURL, setApiURL] = useState('');
  const [apiDescription, setApiDescription] = useState('');
  const [apiImageURL, setApiImageURL] = useState('');
  const [apiData, setApiData] = useState([])
  
  const openOverlay = () => {
    setShowOverlay(true);
  };



  function comments(){
    navigate("/Comments")
  }

  const mockData = [
    {
      header: "Google Maps API",
      link: "https://developers.google.com/maps/documentation/javascript/overview",
      paragraph: "Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.",
      image: "https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png",
    },
    {
      header: "Google Maps API",
      link: "https://developers.google.com/maps/documentation/javascript/overview",
      paragraph: "Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.",
      image: "https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png",
    },
    {
      header: "Google Maps API",
      link: "https://developers.google.com/maps/documentation/javascript/overview",
      paragraph: "Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.",
      image: "https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png",
    },
    {
      header: "Google Maps API",
      link: "https://developers.google.com/maps/documentation/javascript/overview",
      paragraph: "Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.",
      image: "https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png",
    },
    {
      header: "Google Maps API",
      link: "https://developers.google.com/maps/documentation/javascript/overview",
      paragraph: "Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.",
      image: "https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png",
    },
    {
      header: "Google Maps API",
      link: "https://developers.google.com/maps/documentation/javascript/overview",
      paragraph: "Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.",
      image: "https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png",
    },
    {
      header: "Google Maps API",
      link: "https://developers.google.com/maps/documentation/javascript/overview",
      paragraph: "Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.",
      image: "https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png",
    },
    {
      header: "Google Maps API",
      link: "https://developers.google.com/maps/documentation/javascript/overview",
      paragraph: "Google Maps API allows you to embed maps into your website or application and customize them to fit your needs.",
      image: "https://i.ibb.co/jzvCsB1/Screenshot-2023-07-16-at-3-17-57-PM.png",
    },
  ];

  const addAPI = async () => {
    console.log('addAPI inside')
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
          keywords: ['maps'],
        }),
      });

      const data = await response.json();
      console.log('success')
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
        setApiData(newData)
        
      } catch (err) {}
    };
    fetchData();
  }, []);



  const renderBox = () => {
    return apiData.map((item, index) => (
      <div className="box" key={index}>
        <div className="image-container">
          <img src={item.image} alt="API" className="api-image" />
        </div>
        <div className="api-content">
          <h3>{item.header}</h3>
          <a href={item.link}>{item.link}</a>
          <p>{item.description}</p>
          <div className="button-comment">
            <button onClick={comments}>API Posts</button>
          </div>
        </div>
      </div>
    ));
  }




  return (
    <div>
      <Navbar />

      <div className="main-header">
        <div>
          <div className="content">
            <h2>Cohort: CTRI 17</h2>
            <button className="button" onClick={openOverlay}>+ ADD API</button>
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
                          value={apiName}
                          onChange={(event) => {
                              setApiName(event.target.value)
                          }}
                        />
                        <input
                          type="text"
                          className="input-one"
                          placeholder="Add API URL"
                          value={apiURL}
                          onChange={(event) => {
                              setApiURL(event.target.value)
                          }}
                        />
                        <textarea
                          className="input-one"
                          rows="3"
                          maxLength="150"
                          placeholder="Add Brief Description"
                          value={apiDescription}
                          onChange={(event) => {
                              setApiDescription(event.target.value)
                          }}
                        />
                         <input
                          type="text"
                          className="input-one"
                          placeholder="Add Image URL"
                          value={apiImageURL}
                          onChange={(event) => {
                              setApiImageURL(event.target.value)
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
          <div className="input-container">
            <input type="text" className="input-bar" placeholder="Search APIs..." />
          </div>
        </div>
      </div>
      <div className="one">
        <div className="scroll-container">
          <div className="grid-container">
            {renderBox()}    
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

/* 

*** state for techs:

    const [techs, setTechs] = useState([]);

*** POST a new tech / post: 

  const addMarker = async () => {
    if (newMarkerName.length > 0) {
      try {
        const response = await fetch('/api/map/add', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newMarkerName,
            lat: center.lat,
            lng: center.lng,
          }),
        });

        //parse data
        const data = await response.json();

        console.log(data);
        console.log(data.sort((a, b) => a.title.localeCompare(b.title)));
        //sort data
        //set make updates wtih response
        setMarkers(data.sort((a, b) => a.title.localeCompare(b.title)));
        setnewMarkerName('');
      } catch (err) {}
    } else {
      console.log('require title');
    }
  };

*** useEffect for when page starts:

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/map/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        //parse data
        const data = await response.json();

        console.log(data);
        console.log(data.sort((a, b) => a.title.localeCompare(b.title)));
        //sort data
        //set make updates wtih response
        setMarkers(data.sort((a, b) => a.title.localeCompare(b.title)));
      } catch (err) {}
    };

    fetchData();
  }, []);
  







*/