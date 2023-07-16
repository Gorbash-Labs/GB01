import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from '../components/Navbar.jsx'
import './Comments.css'

const Comments = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  //function set if the index should be shown or not
  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  //map or loop over the current data
  const comments = data.map((item, index) => (
    <div
      key={index}
      className={`accordion-item ${index === activeIndex ? "active" : ""}`}
    >
      <div className="accordion-header" onClick={() => handleAccordionClick(index)}>
        {item.title}
      </div>
      {index === activeIndex && (
        <div className="accordion-content">
          <div>{item.content}</div>
        </div>
      )}
    </div>
  ))
  return (
    <div>
    <Navbar />
      <div>test comment</div>
      <div className="accordion">
        {comments}
      </div>
    </div>
  )
}

export default Comments;


const data = [
  {
    title: "Setting up music lyrics with music match",
    content: "i had so much difficulty at first blah blah, but here are some tips blah blah",
  },
  {
    title: "Setting up music lyrics with music match",
    content: "i had so much difficulty at first blah blah, but here are some tips blah blah",
  },
  {
    title: "Setting up music lyrics with music match",
    content: "i had so much difficulty at first blah blah, but here are some tips blah blah",
  },
];

