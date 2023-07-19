import React, { useEffect } from 'react';

const BasicInfo = ({
  user,
  edit,
  setNewUsername,
  setNewUserPass,
  setNewUserContact,
}) => {
  let viewMode = {};
  let editMode = {};
  if (edit) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }

  return (
    <div className="basicInfoContents">
      <ul className="basicInfo">
        <li className="name">
          <span>Username: </span>
          <span className="editHide" style={viewMode}>
            {user.name}
          </span>
          <input
            className="editShow"
            type="text"
            placeholder={user.name}
            style={editMode}
            onChange={(e) => setNewUsername(e.target.value)}
          ></input>
        </li>
        <li className="password">
          <span>Password: </span>
          <span className="editHide" style={viewMode}>
            {user.password}
          </span>
          <input
            className="editShow"
            type="text"
            placeholder="********"
            style={editMode}
            onChange={(e) => setNewUserPass(e.target.value)}
          ></input>
        </li>
        <li className="contact">
          <span>Contact: </span>
          <span className="editHide" style={viewMode}>
            {user.contact}
          </span>
          <input
            className="editShow"
            type="text"
            placeholder={user.contact}
            style={editMode}
            onChange={(e) => setNewUserContact(e.target.value)}
          ></input>
        </li>
      </ul>
    </div>
  );
};

export default BasicInfo;
