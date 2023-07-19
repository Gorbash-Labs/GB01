import React from 'react';

function AddTechPopup(props) {
  console.log('props of AddTech Popup: ', props.overlayState)
  const [showOverlay, setShowOverlay] = props.overlayState;
  console.log(showOverlay, setShowOverlay);

  const handleAddTechSubmit = async (e) => {

    e.preventDefault();

    const body = {
      name: e.target.name.value,
      link: e.target.link.value,
      image: e.target.image.value,
      typeApi: false,
      typeFramework: false,
      typeLibrary: false,
      description: e.target.description.value,
      keywords: ['maps'],
    };

    try {
      setShowOverlay(false);

      const response = await fetch('/api/tech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log('success');
      console.log('data returned', data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="overlay">
      <div className="overlay-content">
        <div>
          <form onSubmit={handleAddTechSubmit}>
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
              {/* <input type="file" className="input-one" accept="image/*" /> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTechPopup;
