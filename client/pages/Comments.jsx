import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';
import '../stylesheets/Comments.scss';
import HelperFunctions from '../helper-functions';
import AddCommentPopup from '../components/AddCommentPopup.jsx';

const Comments = () => {
  //this is the state for the accordian, when the accordian is clicked it invokes an active index
  const [activeIndex, setActiveIndex] = useState(null);

  //state overlay that is changed to true when the button is clicked in order to appear
  const [showOverlay, setShowOverlay] = useState(false);

  //here are the states for the form to keep track of each input
  const [editorContent, setEditorContent] = useState('');
  const [techName, setTechName] = useState('');
  const [techLink, setTechLink] = useState('');
  const [techDescription, setTechDescription] = useState('');
  const [techImage, setTechImage] = useState('');
  const [entry, setEntry] = useState();
  const [image, setImage] = useState();

  const [commentsData, setcommentsData] = useState([]);

  //from here we had starting typing out the states to handle the backend format but realized we did not have enough time so it is not connected/finished

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
  const [commentEntries, setCommentEntries] = useState([]);
  const [commentData, setcommentData] = useState([]);

  const handleAddCommentClick = async (e) => {
    console.log('Comment Submit Event: ', e);
    e.preventDefault();

    const body = {
      tech_id: id,
      typeReview: document.getElementById('tags_review').checked,
      typeAdvice: document.getElementById('tags_advice').checked,
      typeCodeSnippet: document.getElementById('tags_code_snippet').checked,
      typeHelpOffer: document.getElementById('tags_help_offer').checked,
      languageid: 1,
      title: document.querySelector('#title').value,
      comment: document.querySelector('#comment').value,
      image: null,
    };

    console.log('Comment body tags:  ', body);
    try {
      await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log(err);
    }

    fetchData();
    setShowOverlay(false);
  };

  //to find id of our url
  const { id } = useParams();

  // initializing the page
  useEffect(() => {
    //the tech id is linked to the home page box technology clicked
    fetchData();
  }, []);

  const fetchData = async () => {
    const techId = id;

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
      // idk what this does
      setCurrentTech(newData.tech);
      setTechName(newData.tech.name);
      setTechDescription(newData.tech.description);
      setTechLink(newData.tech.link);
      setTechImage(newData.tech.image_url);

      setcommentData(data.posts);

      console.log('New Data: ', newData);

      /*
      commentData = {
        posts: [{comment, image, language, post_id, tech, title, uploader(int)}, {...} ],
        tech: {tech: 2}
      }
      */
    } catch (err) {}
  };

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

  const editComment = (e) => {

  };
  const deleteComment = async (e) => {
    //-->get the post id # so we can look it up for deletion
    console.log('event to delete', e);
    const post_id = e.target.id;
    const response = await fetch('/api/post/' + post_id, {
      method: 'DELETE',
    });
    //return a delete statement
    console.log('response of delete', response.json());
    alert('You deleted a comment, hope your happy with yourself..');
    fetchData();
    setActiveIndex(null)
  };

  return (
    <div className="main-body-comments">
      <div className="main-container-comments">
        <div className="main-header">
          <div className="comment-data-box">
            <img
              className="comment-data-image"
              src={techImage}
              width={80}
              height={80}
            ></img>
            <div className="comment-data-box-text">
              <h2>{techName}</h2>
              <p className="comment-tech-description">{techDescription}</p>
            </div>
          </div>
          <button
            className="new-comment-button"
            onClick={() => setShowOverlay(true)}
          >
            NEW COMMENT
          </button>
          {showOverlay && (
            <AddCommentPopup
              handleAddCommentClick={handleAddCommentClick}
              handleCancel={() => setShowOverlay(false)}
            />
          )}
        </div>

        {/* <div className="input-container">
        <input type="text" className="input-bar" placeholder="Search APIs..." />
      </div> */}

        <div className="accordion">
          {commentData.map((item, index) => {
            return (
              <div
                key={index}
                className={`accordion-item ${
                  index === activeIndex ? 'active' : ''
                }`}
              >
                <div className="accordion-header-outer">
                  <div
                    className="accordion-header"
                    onClick={() => handleAccordionClick(index)}
                  >
                    <p className="comment-title">{item.title}</p>
                    <div className="details">
                      <p className="username">Created by {item.name}</p>
                      <div className="tags-container">
                        Tags:
                        {item.type_review && (
                          <p className="tags-label">Review</p>
                        )}
                        {item.type_advice && (
                          <p className="tags-label">Advice</p>
                        )}
                        {item.type_code_snippet && (
                          <p className="tags-label">Code</p>
                        )}
                        {item.type_help_offer && (
                          <p className="tags-label">Help!</p>
                        )}
                      </div>
                      <div className="buttons-div">
                        {/* <button
                          className="edit_button"
                          onClick={editComment}
                          id={item.post_id}
                        >
                          EDIT
                        </button> */}
                        <button
                          className="delete_button"
                          onClick={deleteComment}
                          id={item.post_id}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {index === activeIndex && (
                  <div className="accordion-content">
                    <div>
                      <div className="experience">
                        {HelperFunctions.md(item.comment)}
                      </div>
                      <img
                        src={item.image}
                        alt="Image"
                        className="accordion-image"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
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
