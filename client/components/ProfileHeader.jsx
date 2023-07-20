import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicInfo from '../components/BasicInfo.jsx';
window.Buffer = window.Buffer || require('buffer').Buffer;

const ProfileHeader = ({ user, setUser, globalId }) => {
  const [userImg, setUserImg] = useState(user.profile_picture);
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState('Edit');
  const [newUsername, setNewUsername] = useState(user.name);
  const [newUserPass, setNewUserPass] = useState(user.name);
  const [newUserContact, setNewUserContact] = useState(user.name);
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const handleImg = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const fileObj = e.target.files[0];
    if (!fileObj) return;
    console.log('fileObj is ', fileObj);
    e.target.value = null;
    sendImg(fileObj);
    // upload(fileObj);
  };

  const sendImg = async (img) => {
    const formData = new FormData();
    formData.append('image', img, img.name);
    const res = await fetch(`/api/aws`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    console.log('response', data);
    setUserImg(data);
  };

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
      setUser(data);
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
          style={{
            backgroundImage: `url(${userImg})`,
          }}
          // style={{ backgroundImage: `url("${user.imgUrl}")` }}
        >
          <input
            style={{ display: 'none' }}
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
          />
          <button className="editImg" onClick={handleImg}></button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
