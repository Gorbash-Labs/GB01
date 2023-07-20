import React from 'react';

import { useNavigate } from 'react-router-dom';

function techCard(props) {
  const navigate = useNavigate();

  function handleCommentClick() {
    navigate(`/comments/${props.id}`); // received as route.params
  }

  return (
    <div className="topic-item" onClick={handleCommentClick}>
      <div className="img-container">
        <img
          src={props.image_url}
          alt="Tech"
          className="api-image"
          width={70}
          height={70}
        />
      </div>

      <div className="text-container">
        <h3 href={props.link} className="topic-item-name">
          {props.name}
        </h3>
        <p>{props.description}</p>
        <div className="stats-container">
          <a>Created By: Tyler</a>
          <a>Posts: 5</a>
        </div>
      </div>
      <div className="buttons-container">
        <button
          onClick={
            props.handleEdit
          }
        >
          EDIT
        </button>
        <button
          id={props.id}
          onClick={
            props.handleDelete
          }
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default techCard;
