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

 //EDIT a Tech API
 const handleEdit = (e) => {};
 //DELETE a Tech API
 const handleDelete = async (e) => {
   e.stopPropagation();
   const tech_id = e.target.id;
   try {
    const response = await fetch ('/api/tech/' + tech_id, {
      method: 'DELETE'
    });
    alert('You deleted a WHOLE TECH, hope your happy with yourself..');
    fetchData();
  } catch (err) {
    return next({
      log: 'error in Card delete: handleDelete',
      message: 'error in the handleDelete'
    });
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
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      );
    });
  };
  //ADD a NEW Tech API
  const handleAddTechSubmit = async (e) => {
    e.preventDefault();

    const body = {
      name: e.target.name.value,
      link: e.target.link.value,
      image: e.target.image.value
        ? e.target.image.value
        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Ferret_icon_%28flipped%29_%28The_Noun_Project%29.svg/1200px-Ferret_icon_%28flipped%29_%28The_Noun_Project%29.svg.png',
      typeApi: false,
      typeFramework: false,
      typeLibrary: false,
      description: e.target.description.value,
      keywords: ['maps'],
    };

    try {
      setShowOverlay(false);

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
    <div className="home-body">
      <div className="main-container">
        {showOverlay && (
          <AddTechPopup
            overlayState={showOverlay}
            overlayOff={() => setShowOverlay(false)}
            handleAddTechSubmit={handleAddTechSubmit}
          />
        )}

        <div className="content-header">
          <h1>Tech Topics</h1>
          <button className="button" onClick={() => setShowOverlay(true)}>
            NEW TOPIC
          </button>
        </div>
        <div className="topic-container">{renderBox()}</div>
      </div>
    </div>
    //     <div className="main-header">
    //       <div>
    //         <div className="content">
    //           <div className="home-top-all-content">
    //             <div className="home-top-title-button">
    //               <h2>Cohort: CTRI 17</h2>
    //               <div>

    //               </div>
    //               <div></div>
    //             </div>
    //             {/* <div className="input-container">
    //               <input
    //                 type="text"
    //                 className="input-bar-home"
    //                 placeholder="Search APIs..."
    //               />
    //             </div> */}
    //           </div>

    //         </div>
    //       </div>
    //     </div>
    //     <div className="main-container">
    //       <div className="title-button-container"></div>

    //     </div>
    //   </div>
    // );
  );
};

export default Home;
