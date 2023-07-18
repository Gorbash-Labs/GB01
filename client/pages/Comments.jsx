import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';
import '../styles/Comments.scss';
import Navbar from '../components/Navbar.jsx';
import HelperFunctions from '../helper-functions';

const Comments = () => {
  //this is the state for the accordian, when the accordian is clicked it invokes an active index
  const [activeIndex, setActiveIndex] = useState(null);

  //state overlay that is changed to true when the button is clicked in order to appear
  const [showOverlay, setShowOverlay] = useState(false);

  //here are the states for the form to keep track of each input
  const [editorContent, setEditorContent] = useState('');
  const initialVal = ` - Technical notes / Key insights`;
  const [techName, setTechName] = useState('');
  const [techLink, setTechLink] = useState('');
  const [techDescription, setTechDescription] = useState('');
  const [techImage, setTechImage] = useState('');
  const [entry, setEntry] = useState();
  const [image, setImage] = useState();

  //from here we had starting typing out the states to handle the backend format but realized we did not have enough time so it is not connected/finished
  /*
      CREATE TABLE posts(
        post_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        tech INTEGER NOT NULL,
        FOREIGN KEY(tech) REFERENCES techs(tech_id),
        uploader INTEGER NOT NULL,
        FOREIGN KEY(uploader) REFERENCES users(user_id),
        type_review BOOLEAN,
        type_advice BOOLEAN,
        type_code_snippet BOOLEAN,
        type_help_offer BOOLEAN,
        language INTEGER NOT NULL,
        FOREIGN KEY(language) REFERENCES languages (language_id),
        comment VARCHAR(5000) NOT NULL,
        image TEXT
    )
  */

  // title TEXT NOT NULL,
  const [titleEntry, setTitleEntry] = useState();

  // tech INTEGER NOT NULL,
  const [currentTech, setCurrentTech] = useState();
  // uploader INTEGER NOT NULL,

  // type_review BOOLEAN,

  // type_code_snippet BOOLEAN,

  // type_advice BOOLEAN,

  // type_help_offer BOOLEAN,

  // comment VARCHAR(5000) NOT NULL,

  // language INTEGER NOT NULL,
  const [languageEntry, setLanguageEntry] = useState();
  const [commentEntries, setCommentEntries] = useState([]);

  //to find id of our url
  const { id } = useParams();

  const addComment = async () => {
    event.preventDefault();
    console.log(id, titleEntry, entry, image);
    try {
      setShowOverlay(false);
      //on the button click the overlay is set back to false
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          // userId: number, found via backend

          tech_id: id,
          typeReview: false,
          typeAdvice: false,
          typeCodeSnippet: false,
          typeHelpOffer: false,
          languageid: 1,
          title: titleEntry,
          comment: entry,
          image: image,
        }),
      });

      const data = await response.json();
      console.log('success');
      console.log('data returned', data);
    } catch (err) {
      console.log(err);
    }
  };

  // initializing the page
  useEffect(() => {
    //the tech id is linked to the home page box technology clicked
    const techId = id;

    const fetchData = async () => {
      try {
        const response = await fetch('/api/tech/' + techId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        const newData = JSON.parse(JSON.stringify(data));
        // newData =  {tech: tech-obj, posts: [post-obj, post-obj, ..]}
        setCommentEntries(newData.posts);
        setCurrentTech(newData.tech);
        setTechName(newData.tech.name);
        setTechDescription(newData.tech.description);
        setTechLink(newData.tech.link);
        setTechImage(newData.tech.image_url);
        console.log(newData);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const openOverlay = (e) => {
    // e.preventDefault();
    setShowOverlay(true);
  };

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleEditorChange = (content, editor) => {
    setEditorContent(content);
  };

  const comments = commentEntries.map((item, index) => {
    console.log(item);
    return (
      <div
        key={index}
        className={`accordion-item ${index === activeIndex ? 'active' : ''}`}
      >
        <div className="accordion-header-outer">
          <div
            className="accordion-header"
            onClick={() => handleAccordionClick(index)}
          >
            <div>{item.title}</div>
            <div className="details">
              <p className="username">{item.username}</p>
              <p className="tags">Posted by: Steve</p>
            </div>
          </div>
        </div>
        {index === activeIndex && (
          <div className="accordion-content">
            <div>
              <div className="experience">
                {HelperFunctions.md(item.comment)}
              </div>
              <img src={item.image} alt="Image" className="accordion-image" />
            </div>
          </div>
        )}
      </div>
    );
  });

  return (
    <div>
      <Navbar />
      <div className="main-header">
        <div>
          <div className="content">
            <div className="comment-data-box">
              <img className="comment-data-image" src={techImage}></img>
              <div>
                <a href={techLink} className="comment-tech-link">
                  <h2>{techName}</h2>
                </a>
                <p className="comment-tech-description">{techDescription}</p>
              </div>
            </div>
            <button className="button" onClick={openOverlay}>
              + ADD POST
            </button>
            {showOverlay && (
              <div className="overlay-comments">
                <div className="overlay-content-comments">
                  <div>
                    <form>
                      <div className="formGroup-two">
                        <div>
                          <h2>Add FORM</h2>
                          <hr className="line" />
                          <input
                            type="text"
                            className="input-one-first"
                            placeholder="Title"
                            value={titleEntry}
                            onChange={(event) => {
                              setTitleEntry(event.target.value);
                            }}
                          />
                          <h5></h5>
                          <input
                            type="text"
                            className="input-one-c"
                            placeholder="Language Used"
                            // required
                            value={languageEntry}
                            onChange={(event) => {
                              setLanguageEntry(event.target.value);
                            }}
                          />
                          <Editor
                            apiKey="ba2mzqsjqzq6lv0fu4numgypg3j9125otxy4rpzttx7vji3q"
                            initialValue={initialVal}
                            className="custom-editor"
                            onEditorChange={handleEditorChange}
                            value={entry}
                            onChange={(event) => {
                              console.log(event.target.value);
                              setEntry(event.target.value);
                            }}
                            init={{
                              height: 300,
                              max_height: 340,
                              menubar: true,
                              plugins: [
                                'advlist autolink lists link image',
                                'charmap print preview anchor help',
                                'searchreplace visualblocks code',
                                'insertdatetime media table paste wordcount',
                              ],
                              toolbar:
                                'undo redo | formatselect | bold italic | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | link image',
                              content_style:
                                'body { font-family: Arial, sans-serif; font-size: 14px }',
                            }}
                          />
                          <input
                            type="file"
                            className="input-one-image"
                            accept="image/*"
                            value={image}
                            onChange={(event) => {
                              setImage(event.target.value);
                            }}
                          />
                        </div>
                        <div className="btn">
                          <button
                            type="submit"
                            className="login-button"
                            onClick={addComment}
                          >
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

      <div className="accordion">{comments}</div>
    </div>
  );
};

export default Comments;

//this was our mock data before working with the database

// const data = [
//   {
//     username: "bob",
//     title: "Creating a project using Music Match Lyrics",
//     languageUsed: "JavaScript",
//     datePosted: Date.now(),
//     experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla.",
//     image: "https://i.ibb.co/K5YV4Yx/Screenshot-2023-07-16-at-5-23-39-PM.png"
//   },
//   {
//     username: "bob",
//     title: "Creating a project using Music Match Lyrics",
//     languageUsed: "JavaScript",
//     datePosted: Date.now(),
//     experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla.",
//     image: "https://i.ibb.co/K5YV4Yx/Screenshot-2023-07-16-at-5-23-39-PM.png"
//   },
//   {
//     username: "bob",
//     title: "Creating a project using Music Match Lyrics",
//     languageUsed: "JavaScript",
//     datePosted: Date.now(),
//     experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis sem nec metus dapibus feugiat. In hac habitasse platea dictumst. Nulla facilisi. Maecenas id ligula ligula. Nulla viverra facilisis neque, ut gravida neque lobortis non. Morbi sodales odio in tortor finibus, at tempor odio lobortis. In sed lacus vel elit vestibulum semper vitae sed nisl. Mauris tristique libero non sem vestibulum dignissim. Praesent varius venenatis felis, sed feugiat lectus vestibulum vitae. Donec eleifend sollicitudin facilisis. Ut viverra lectus non facilisis fringilla.",
//     image: "https://i.ibb.co/K5YV4Yx/Screenshot-2023-07-16-at-5-23-39-PM.png"
//   },
// ];
