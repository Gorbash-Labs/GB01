import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './Comments.scss';

const Comments = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const initialVal = ` - Technical notes / Key insights`

  const openOverlay = () => {
    setShowOverlay(true);
  };

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleEditorChange = (content, editor) => {
    setEditorContent(content);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(editorContent);
  };

  const data = [
    {
      username: "bob",
      title: "Creating a project using Music Match Lyrics",
      languageUsed: "JavaScript",
      datePosted: Date.now(),
      experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla.",
      image: "https://i.ibb.co/K5YV4Yx/Screenshot-2023-07-16-at-5-23-39-PM.png"
    },
    {
      username: "bob",
      title: "Creating a project using Music Match Lyrics",
      languageUsed: "JavaScript",
      datePosted: Date.now(),
      experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla.",
      image: "https://i.ibb.co/K5YV4Yx/Screenshot-2023-07-16-at-5-23-39-PM.png"
    },
    {
      username: "bob",
      title: "Creating a project using Music Match Lyrics",
      languageUsed: "JavaScript",
      datePosted: Date.now(),
      experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla.",
      image: "https://i.ibb.co/K5YV4Yx/Screenshot-2023-07-16-at-5-23-39-PM.png"
    },
  ];

  const comments = data.map((item, index) => (
    <div
      key={index}
      className={`accordion-item ${index === activeIndex ? "active" : ""}`}
    >
      <div className="accordion-header-outer">
        <div className="accordion-header" onClick={() => handleAccordionClick(index)}>
          <div>{item.title}</div>
          <div className="details">
            <p className="username">{item.username}</p>
            <p className="tags">tags</p>
            <p className="date">Date Posted: {new Date(item.datePosted).toLocaleString()}</p>
          </div>
        </div>
      </div>
      {index === activeIndex && (
        <div className="accordion-content">
          <div>
            <p className="experience">{item.experience}</p>
            <img src={item.image} alt="Image" className="accordion-image" />
          </div>
        </div>
      )}
    </div>
  ));

  return (
    <div>
      <div className="main-header">
        <div>
          <div className="content">
            <h2>API: GOOGLE MAPS</h2>
            <button className="button" onClick={openOverlay}>+ ADD POST</button>
            {showOverlay && (
              <div className="overlay-comments">
                <div className="overlay-content-comments">
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="formGroup-two">
                        <div>
                          <h2>Add FORM</h2>
                          <hr className="line" />
                          <input type="text" className="input-one-first" placeholder="Title" />
                          <h5></h5>
                          <input type="text" className="input-one-c" placeholder="Language Used" required />
                          {/* <textarea className="input-description" rows="3" maxLength="5000" placeholder="Comment (max 5000 characters)" required></textarea> */}
                          <Editor
                            apiKey="ba2mzqsjqzq6lv0fu4numgypg3j9125otxy4rpzttx7vji3q"
                            initialValue={initialVal}
                            value={editorContent}
                            className="custom-editor"
                            onEditorChange={handleEditorChange}
                            init={{
                              height: 300,
                              max_height: 340,
                              menubar: true,
                              plugins: [
                                'advlist autolink lists link image',
                                'charmap print preview anchor help',
                                'searchreplace visualblocks code',
                                'insertdatetime media table paste wordcount'
                              ],
                              toolbar:
                                'undo redo | formatselect | bold italic | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | link image',
                              content_style: 'body { font-family: Arial, sans-serif; font-size: 14px }'
                            }}
                          />
                          <input type="file" className="input-one-image" accept="image/*" />
                         
                        </div>
                        <div className="btn">
                          <button type="submit" className="login-button">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="input-container">
        <input type="text" className="input-bar" placeholder="Search APIs..." />
      </div>

      <div className="accordion">
        {comments}
      </div>
    </div>
  );
};

export default Comments;
