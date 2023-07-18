import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function HomeApiContainer(props) {
  // initializing the page
  // FIXME: keep an eye out here. I moved the apiData and setting of api data here, but not sure if this needs to be a global context back in the home page.
  const { apiData, setApiData } = props;

  // function renders each box on page loadup.
  // FIXME: this looks good, but might want to take a look at the div usage.
  const renderBox = (props) => {
    return apiData.map((item, index) => {
      console.log(item);

      return (
        <div className="box" key={index}>
          <div className="image-container">
            <img src={item.image_url} alt="Tech" className="api-image" />
          </div>
          <div className="api-content">
            <a href={item.link} className="tech-item-name">
              {item.name}
            </a>
            <p>{item.description}</p>
            <div className="button-comment">
              <button onClick={comments} id={item.tech_id}>
                Posts
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  // initializing navigate to be able to (i assume) to navigate to the comments page?
  const navigate = useNavigate();

  // FIXME: check up on this? I think link or usenavigate are both valid moves. In regard to sending a route.params, not sure about this. If they're trying to use url params would req.params achieve the same thing?
  function comments(e) {
    const senderTechId = e.target.id;
    const senderName = e.target.name;
    navigate(`/comments/${senderTechId}`); // received as route.params
  }

  return (
    <div className="one">
      <div className="scroll-container">
        <div className="grid-container">{renderBox()}</div>
      </div>
    </div>
  );
}
