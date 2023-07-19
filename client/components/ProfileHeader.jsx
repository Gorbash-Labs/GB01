import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicInfo from '../components/BasicInfo.jsx';

const ProfileHeader = ({ user, userId }) => {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState('Edit');
  const [newUsername, setNewUsername] = useState(user.name);
  const [newUserPass, setNewUserPass] = useState(user.name);
  const [newUserContact, setNewUserContact] = useState(user.name);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/home');
  };
  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
      setEditText('Submit');
    } else {
      patchInfo(1);
      // patchInfo(userId);
      setEdit(false);
      setEditText('Edit');
      console.log(newUsername, newUserPass, newUserContact);
    }
  };

  const patchInfo = async (id) => {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newUsername,
          password: newUserPass,
          contact: newUserContact,
        }),
      });
      const data = await response.json();
    } catch (err) {
      console.log('err');
    }
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <button className="homeButton" value="Home" onClick={handleSubmit}>
          Home
        </button>
        <BasicInfo
          user={user}
          edit={edit}
          setNewUsername={setNewUsername}
          setNewUserPass={setNewUserPass}
          setNewUserContact={setNewUserContact}
        />
        <button className="editButton" value="Edit" onClick={handleEdit}>
          {editText}
        </button>
      </div>
      <div className="headerRight">
        <h1>Hello {user.name}</h1>
        <div
          className="imgContainer"
          style={{ backgroundImage: `url("${user.imgUrl}")` }}
        >
          <button className="editImg"></button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
