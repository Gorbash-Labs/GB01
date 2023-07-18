import React from 'react'

import { useNavigate } from 'react-router-dom';

function techCard(props) {
  const navigate = useNavigate();

  function handleCommentClick() {
    navigate(`/comments/${props.id}`); // received as route.params
  }

  return (
    <div className="box">
    <div className="image-container">
      <img src={props.image_url} alt="Tech" className="api-image" />
    </div>
    <div className="api-content">
      <a href={props.link} className="tech-item-name">
        {props.name}
      </a>
      <p>{props.description}</p>
      <div className="button-comment">
        <button onClick={handleCommentClick} id={props.tech_id}>
          Comments
        </button>
      </div>
    </div>
  </div>
  )
}

export default techCard