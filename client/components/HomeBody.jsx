import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function HomeBody() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  //render data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/tech', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        const newData = JSON.parse(JSON.stringify(data));
        setApiData(newData);
      } catch (err) { }
    };
    fetchData();
  }, []);
  //Render boxes
  const renderBox = () => {
    return apiData.map((item, index) => {
      console.log(item);

      return (
        <div type = 'button' className="box" key={index}  onClick={comments} id={item.tech_id}>
            <img src={item.image_url} alt="Tech" className="api-image"  /> 
            <a href={item.link} className="tech-item-name">
              {item.name}
            </a>
            <p>{item.description}</p> 
        </div>
      );
    });
  };

  //Click to renavigate to Post
  function comments(e) {
    const senderTechId = e.target.id;
    const senderName = e.target.name;
    navigate(`/comments/${senderTechId}`); // received as route.params
    //
  }

  return (
    <div className="one">
      
        <div className="grid-container">{renderBox()}</div>
      
    </div>
  )
}