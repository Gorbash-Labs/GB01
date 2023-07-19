import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = ({ user }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate('/home');
  };
  return (
    <div className="header">
      <div className="headerLeft">
        <button className="homeButton" value="Home" onClick={handleSubmit}>
          Home
        </button>
        <div className="basicInfoContents">
          <ul className="basicInfo">
            <li className="username">Username: {user.name}</li>
            <li className="username">Password: {user.password}</li>
            <li className="username">Contact: {user.contact}</li>
          </ul>
          <button className="editButton" value="Edit">
            Edit
          </button>
        </div>
      </div>
      <div className="headerRight">
        <h1>Hello {user.name}</h1>
        <div
          className="imgContainer"
          style={{ backgroundImage: `url("${user.imgUrl}")` }}
        >
          <button className="editImg"></button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
