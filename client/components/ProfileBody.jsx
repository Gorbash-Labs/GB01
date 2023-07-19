import React, { useState } from 'react';
import Post from '../components/Post.jsx';

const ProfileBody = ({ posts }) => {
  if (posts.length) {
    const postArray = posts.map((el) => Post(el));
    return <div className="postContainer">{postArray}</div>;
  }
  return <div>Loading Posts....</div>;
};

export default ProfileBody;
