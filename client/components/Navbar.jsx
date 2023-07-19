import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  function home() {
    navigate('/home');
  }
  function comments() {
    navigate('/feed');
  }
  function Login() {
    navigate('/login');
  }
  function Profile() {
    navigate('/profile');
  }

  function chat() {
    navigate('/chat');
  }

  return (
    <div className="Navbar">
      <div id="left">
        <p onClick={chat} id="first">
          CHAT
        </p>
      </div>
      <div id="right">
        <p onClick={home}>HOME</p>
        <p onClick={comments}>FEED</p>
        {localStorage.getItem('username') ? (
          <p onClick={Profile}>PROFILE</p>
        ) : (
          <p onClick={Login}>LOGIN</p>
        )}
      </div>
    </div>
  );
}
