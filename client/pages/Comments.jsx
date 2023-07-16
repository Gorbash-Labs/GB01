import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//add containers and requirements for JS
import Navbar from '../components/Navbar.jsx'

const Comments = () => {
  return (
    <div>
    <Navbar />
      <div>test comment</div>
    </div>
  )
}

export default Comments