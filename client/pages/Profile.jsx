import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//add containers and requirements for JS
import Navbar from '../components/Navbar.jsx'

const Profile = async (props) => {
/*
  if (props.loggedInStatus) { //-->we have a logged in user
    //get request to DB to fetch the userID's profile info (stretch goal)
    await fetch('dummy', { //--> go to Profile end point
      method: "POST",
      body: JSON.stringify({
        userId: props.loggedInStatus,
      }),
    })
  }
*/
  return (
    <div className="wrapper">
      <Navbar />
      <div className="body">
          <div className="profile_picture">Picture
            <div className="profile_image">Uploads image here</div>
          </div>
          <div className="profile_name">Name
            <div className="profile_text">Edit name form here</div>
          </div>
          <div className="profile_password">Password
            <div className="profile_pass">Edit pasword form here</div>
          </div>
          <div className="profile_friends">Friends List
            <div className="profile_friends_list">Your Friends</div>
          </div>
          <div className="profile_comments">Recent Comments
            <div className="profile_comments_list">Your recent comments on other APIs</div>
          </div>
          <div className="profile_apis">Recent API's Added
            <div className="profile_APIs_list">Your recent api's</div>
          </div>
      </div>
    </div>
  )
}

export default Profile