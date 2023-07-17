import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from '../components/Navbar.jsx';
import './Comments.css';

const Comments = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const openOverlay = () => {
    setShowOverlay(true);
  };

  const data = [
    {
      username: "bob",
      title: "Creating a project using Music Match Lyrics",
      languageUsed: "JavaScript",
      datePosted: Date.now(),
      experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla.",
      image: "https://i.ibb.co/K5YV4Yx/Screenshot-2023-07-16-at-5-23-39-PM.png"
    },
    {
      username: "bob",
      title: "Creating a project using Music Match Lyrics",
      languageUsed: "JavaScript",
      datePosted: Date.now(),
      experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla.",
      image: "https://i.ibb.co/K5YV4Yx/Screenshot-2023-07-16-at-5-23-39-PM.png"
    },
    {
      username: "bob",
      title: "Creating a project using Music Match Lyrics",
      languageUsed: "JavaScript",
      datePosted: Date.now(),
      experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla.",
      image: "https://i.ibb.co/K5YV4Yx/Screenshot-2023-07-16-at-5-23-39-PM.png"
    },
  ];

  console.log(data);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const comments = data.map((item, index) => (
    <div
      key={index}
      className={`accordion-item ${index === activeIndex ? "active" : ""}`}
    >
      <div className="accordion-header-outer">
        {/* <div>
          <p className='accordion-header-outer-p'></p>
        </div> */}
        <div className="accordion-header" onClick={() => handleAccordionClick(index)}>
          <div>
            {item.title}
          </div>
          <div className='details'>
              <p className="username">{item.username}</p>
              <p className="tags">tags</p>
              <p className="date">Date Posted: {new Date(item.datePosted).toLocaleString()}</p>
          </div>
        </div>
      </div>
      {index === activeIndex && (
        <div className="accordion-content">

          <div>
            <p className="experience">{item.experience}</p>

            <img src={item.image} alt="Image" className="accordion-image" />
          </div>

        </div>
      )}
    </div>
  ));

  return (
    <div>
      <Navbar />
      <div className="main-header">
        <div>
          <div className="content">
            <h2>API: GOOGLE MAPS</h2>
            <button className="button" onClick={openOverlay}>+ ADD POST</button>
            {showOverlay && (
              <div className="overlay-comments">
                <div className="overlay-content-comments">
                  <div>
                    <form>
                      <div className="formGroup-two">
                        <div>
                          <h2>Add FORM</h2>
                          <hr className='line'/>
                          <input
                            type="text"
                            className="input-one-first"
                            placeholder="Title"
                          />
                          <h5></h5>
                          <input
                            type="text"
                            className="input-one-c"
                            placeholder="Language Used"
                            required
                          />
                          <input
                            className="input-description"
                            rows="3"
                            maxLength="5000"
                            placeholder="Comment (max 5000 characters)"
                            required
                          />
                          <input
                            type="file"
                            className="input-one-c"
                            accept="image/*"
                          />
                        </div>
                        <div className="btn">
                          <button type="submit" className="login-button">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="input-container">
        <input type="text" className="input-bar" placeholder="Search APIs..." />
      </div>

      <div className="accordion">
        {comments}
      </div>
    </div>
  );
};

export default Comments;
