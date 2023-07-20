import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';
import '../stylesheets/Comments.scss';
import HelperFunctions from '../helper-functions';
import AddCommentPopup from '../components/AddCommentPopup.jsx';

const Feed = () => {
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
    console.log("Comment Submit Event: ", e);
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

    console.log("Comment body tags:  ", body);
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

    fetchData()
    setShowOverlay(false)

  };


  // initializing the page
  useEffect(() => {
    //the tech id is linked to the home page box technology clicked
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/post/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('data', data.rows)

      // newData =  {tech: tech-obj, posts: [post-obj, post-obj, ..]}
      // idk what this does
      setCurrentTech(data.tech);
      setTechName(data.name);
      setTechDescription(data.comment);
      setTechLink(data.contact);
      setTechImage(data.image);



      setcommentData(data.rows);


      // console.log('New Data: ', newData);

      /*
      commentData = {
        posts: [{comment, image, language, post_id, tech, title, uploader(int)}, {...} ],
        tech: {tech: 2}
      }
      */
    } catch (err) {
      console.log(err)
    }
  };


  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleEditorChange = (content, editor) => {
    setEditorContent(content);
  };

  return (
    <div>
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
            <button className="button" onClick={() => setShowOverlay(true)}>
              + Add Comment
            </button>
            {showOverlay && (
              <AddCommentPopup
                handleAddCommentClick={handleAddCommentClick}
                handleCancel={() => setShowOverlay(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* <div className="input-container">
        <input type="text" className="input-bar" placeholder="Search APIs..." />
      </div> */}

      <div className="accordion">
        {commentData.map((item, index) => {
          console.log(item)
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
                  <div>{item.title}</div>
                  <div className="details">
                    <p className="username">{item.name}</p>
                    {item.type_review && <p className="tags_review">Review</p>}
                    {item.type_advice && <p className="tags_advice">Advice</p>}
                    {item.type_code_snippet && <p className="tags_code_snippet">Code</p>}
                    {item.type_help_offer && <p className="tags_help_offer">Help!</p>}
                  </div>
                </div>
              </div>
              {index === activeIndex && (
                <div className="accordion-content">
                  <div>
                    <div className="experience">
                      {HelperFunctions.md(item.comment)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default Feed;

