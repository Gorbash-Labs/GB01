import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  function home() {
    navigate('/Home');
  }
  function comments() {
    navigate('/Comments');
  }
  function Profile() {
    navigate('/Profile');
  }

  return (
    <ul className='Navbar'>
      <li onClick={home}>Home</li>
      <li onClick={comments}>Comments</li>
      <li onClick={Profile}>Profile</li>
    </ul>
  );
}
