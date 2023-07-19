import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import '../styles/Home.scss';
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
  const [typeApi, setTypeApi] = useState(false)
  const [typeFramework, setTypeFramework] = useState(false)
  const [typeLibrary, setTypeLibrary] = useState(false)

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
  // useEffect(() => {
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
          typeApi: typeApi,
          typeFramework: typeFramework,
          typeLibrary: typeLibrary,
          description: apiDescription,
          keywords: ['maps'],
        }),
      });

      const data = await response.json();
      console.log('success');
      console.log('data returned', data);
    } catch (err) {
      console.log(err);
    }
  };
// }, [apiName,apiURL,apiDescription]);

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
      } catch (err) {}
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

  const handleSelectChange = (selectedOption) => {

    setTypeApi(false);
    setTypeFramework(false);
    setTypeLibrary(false);
  
    if (selectedOption === 'Api') {
      setTypeApi(true);
    } else if (selectedOption === 'Framework') {
      setTypeFramework(true);
    } else if (selectedOption === 'Library') {
      setTypeLibrary(true);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="main-header">
        
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
                    
                      <div className="formGroup">
                        <h2>Add Tech</h2>
                        <input type="text" className="input-one" placeholder="Add API Name" value={apiName}onChange={(event) => {setApiName(event.target.value);}} />
                        <input type="text"className="input-one"placeholder="Add API URL"value={apiURL}onChange={(event) => { setApiURL(event.target.value);}}/>
                        <textarea className="input-one"rows="3"maxLength="150"placeholder="Add Brief Description"value={apiDescription}onChange={(event) => {setApiDescription(event.target.value);}} />
                        <input type="text"className="input-one"placeholder="Add Image URL"value={apiImageURL}onChange={(event) => {setApiImageURL(event.target.value); }}/>
                        <input type="file"className="input-one"accept="image/*"/>
                        <select className="input-one" placeholder = 'Select your type'onChange={(e) => handleSelectChange(e.target.value)}>
                          <option value = ''disabled selected>Select Type of Tech</option>
                          <option> Framework </option>
                          <option> Api </option>
                          <option> Library </option>
                        </select>
                        <button className="login-button" onClick={addAPI}>Submit!</button>
                      </div>
                    
                  </div>
                </div>
              </div>
            )}
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
