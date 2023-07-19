import React from 'react';

function AddTechPopup(props) {

  console.log('props of AddTech Popup: ', props.overlayState)
  const [showOverlay, setShowOverlay] = props.overlayState;
  console.log(showOverlay, setShowOverlay);

  const handleAddTechSubmit = async (e) => {

    e.preventDefault();


  return (
    <div className="overlay">
      <div className="overlay-content">
        <form onSubmit={props.handleAddTechSubmit}>
          <div className="formGroup">
            <h2>Add Tech</h2>
            <input
              type="text"
              className="input-one"
              placeholder="Add Tech Name"
              id="name"
            />

            <input
              type="text"
              className="input-one"
              placeholder="Add Tech URL"
              id="link"
            />
            <input
              type="text"
              className="input-one"
              placeholder="Add Brief Description"
              id="description"
            />
            <input
              type="text"
              className="input-one"
              placeholder="Add Image URL"
              id="image"
            />
            <input type="submit" value="Add" />
            <button onClick={props.overlayOff}>Cancel</button>

            {/* <input type="file" className="input-one" accept="image/*" /> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTechPopup;
