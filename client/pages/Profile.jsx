import React, { useContext, useEffect, useState } from 'react';
import '../styles/Profile.scss';
import { UserIdContext } from '../contexts/Contexts.jsx'; //userContext = username
import ProfileHeader from '../components/ProfileHeader.jsx';
import ProfileBody from '../components/ProfileBody.jsx';

const Profile = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState({});
  const { globalId } = useContext(UserIdContext);

  useEffect(() => {
    const getData = async () => {
      // const response = await fetch(`/api/user/${globalId}`);
      try {
        const response = await fetch(`/api/user/Steve`);
        const data = await response.json();
        setUser(data.user);
        setPosts(data.posts);
      } catch (err) {
        console.log('err');
      }
    };
    getData();
  }, []);

  return (
    <div className="profilePage">
      {/* TODO: button to navigate back to home page */}
      <ProfileHeader user={user} userId={UserContext} />
      <ProfileBody posts={posts} />
    </div>
  );
};

export default Profile;
