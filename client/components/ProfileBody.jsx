import React from 'react';

const ProfileBody = ({ posts }) => {
  if (posts.length) {
    const postBody = posts.map((item, index) => {
      return (
        <div className={`post ${index}`} key={`post ${index}`}>
          <div className="commentHeader">
            <div>{item.title}</div>
            <div className="details">
              <p className="username">{item.username}</p>
              <p className="tags">Posted by: {item.username}</p>
            </div>
          </div>

          <div className="commentBody">
            <div className="experience">{item.comment}</div>
            <img src={item.image} alt="Image" className="accordion-image" />
          </div>
        </div>
      );
    });
    return <div className="postContainer">{postBody}</div>;
  }
  return <div>Loading Posts....</div>;
};

export default ProfileBody;
