import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';
import '../styles/Posts.scss';
import Navbar from '../components/Navbar.jsx';
import HelperFunctions from '../helper-functions';

const Comments = () => {
  //this is the state for the accordian, when the accordian is clicked it invokes an active index
  const [activeIndex, setActiveIndex] = useState(null);

  //state overlay that is changed to true when the button is clicked in order to appear
  const [showOverlay, setShowOverlay] = useState(false);

  // PARENT STATES
  const [editorContent, setEditorContent] = useState('');
  const initialVal = ` - Technical notes / Key insights`;
  const [techName, setTechName] = useState('');
  const [techLink, setTechLink] = useState('');
  const [techDescription, setTechDescription] = useState('');
  const [techImage, setTechImage] = useState('');

  const [image, setImage] = useState();

  // LOCAL STATES
  const [postThreads, setPostThreads] = useState([]);
  const [searchLanguageText, setSearchLanguageText] = useState('');
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [postLanguageDropdown, setPostLanguageDropdown] = useState(false);
  const [lang, setLang] = useState(['C', 'C++', 'JavaScript', 'Python']);

  // ADD POST STATES
  // tech ID
  const { id } = useParams();
  // type_review BOOLEAN,
  const [isReview, setIsReview] = useState();
  // type_code_snippet BOOLEAN,
  const [isCodeSnippet, setIsCodeSnippet] = useState();
  // type_advice BOOLEAN,
  const [isAdvice, setIsAdvice] = useState();
  // type_help_offer BOOLEAN,
  const [isHelp, setIsHelp] = useState();
  // language
  const [postLanguageText, setPostLanguageText] = useState('');
  // title TEXT NOT NULL,
  const [titleEntry, setTitleEntry] = useState();
  // tech INTEGER NOT NULL,
  const [currentTech, setCurrentTech] = useState();
  // comment VARCHAR(5000) NOT NULL,
  const [entry, setEntry] = useState();
  // language INTEGER NOT NULL,
  const [languageEntry, setLanguageEntry] = useState();

  //FUNCTIONS
  const addPost = async () => {
    console.log(id, titleEntry, entry, image);
    try {
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
      console.log(response);
      const data = await response.json();
      setPostThreads(data);
      console.log('data returned', data);
      setShowOverlay(false);
      console.log('Closing Overlay');
    } catch (err) {
      console.log(err);
    }
  };

  // Select Dropdown
  const handleDropdownItemClick = (language) => {
    if (showOverlay) {
      setPostLanguageText(language);
      setPostLanguageDropdown(false);
    } else {
      setSearchLanguageText(language);
      setLanguageDropdown(false);
    }
  };

  // Download Pages
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
        setPostThreads(newData.posts);
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

  const posts = postThreads.map((item, index) => {
    // console.log(item);
    return (
      <div
        key={index}
        className={`accordion-item ${index === activeIndex ? 'active' : ''}`}
      >
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
    <div className="Post">
      <Navbar />
      <div className="content">
        <div className="tech-box">
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
            <div className="overlay-post">
              <div className="overlay-post-card">
                <h2>Add Goru Post</h2>

                <div className="searches">
                  <input
                    type="text"
                    className="input-bar"
                    placeholder="Title"
                    value={titleEntry}
                    onChange={(event) => {
                      setTitleEntry(event.target.value);
                    }}
                  />

                  <div className="language-bar-container">
                    <input
                      type="text"
                      className={`language-bar ${
                        postLanguageDropdown ? 'active' : ''
                      }`}
                      placeholder="Language"
                      value={postLanguageText}
                      onFocus={() => setPostLanguageDropdown(true)}
                      onBlur={() =>
                        setTimeout(() => setPostLanguageDropdown(false), 100)
                      }
                      onChange={(e) => {
                        setPostLanguageText(e.target.value);
                        setPostLanguageDropdown(true);
                      }}
                    />

                    {postLanguageDropdown && (
                      <ul className="dropdown-language">
                        <li className="divLine"></li>
                        {lang
                          .filter((lang) =>
                            lang
                              .toLowerCase()
                              .includes(postLanguageText.toLowerCase())
                          )
                          .map((filteredLang) => (
                            <li
                              id="language"
                              key={filteredLang}
                              onClick={() =>
                                handleDropdownItemClick(filteredLang)
                              }
                            >
                              {filteredLang}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>

                <Editor
                  apiKey="ba2mzqsjqzq6lv0fu4numgypg3j9125otxy4rpzttx7vji3q"
                  initialValue={initialVal}
                  className="custom-editor"
                  onEditorChange={(content) => {
                    console.log(content);
                    setEntry(content);
                  }}
                  value={entry}
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

                <div style={{ display: 'flex', gap: '15px' }}>
                  <button className="login-button" onClick={addPost}>
                    Submit
                  </button>
                  <button
                    className="login-button"
                    onClick={() => setShowOverlay(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="hero-search-box">
          <div className="categories">
            <div className="category">All</div>
            <div className="category">Reviews</div>
            <div className="category">Code Snippets</div>
            <div className="category">Advice</div>
            <div className="category">Help</div>
          </div>
          <div className="divLine"></div>

          <div className="searches">
            <input type="text" className="input-bar" placeholder="Search" />

            <div className="language-bar-container">
              <input
                type="text"
                className={`language-bar ${languageDropdown ? 'active' : ''}`}
                placeholder="Language"
                value={searchLanguageText}
                onFocus={() => setLanguageDropdown(true)}
                onBlur={() => setTimeout(() => setLanguageDropdown(false), 100)}
                onChange={(e) => {
                  setSearchLanguageText(e.target.value);
                  setLanguageDropdown(true);
                }}
              />

              {languageDropdown && (
                <ul className="dropdown-language">
                  <li className="divLine"></li>
                  {lang
                    .filter((lang) =>
                      lang
                        .toLowerCase()
                        .includes(searchLanguageText.toLowerCase())
                    )
                    .map((filteredLang) => (
                      <li
                        id="language"
                        key={filteredLang}
                        onClick={() => handleDropdownItemClick(filteredLang)}
                      >
                        {filteredLang}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            <button className="button-search">Search</button>
          </div>
        </div>

        <div className="accordion">
          {/* main display for information */}
          {posts}
        </div>
      </div>
    </div>
  );
};

export default Comments;

// const dropDown = ({ dropdownState }, { setDropdownState }, { arrayWatch }) => {
//   return (
//     <div className="language-bar-container">
//       <input
//         type="text"
//         className={`language-bar ${dropdownState ? 'active' : ''}`}
//         placeholder="Language"
//         value={languageText}
//         onFocus={() => setDropdownState(true)}
//         onBlur={() => setTimeout(() => setDropdownState(false), 100)}
//         onChange={(e) => {
//           setSearchLanguageText(e.target.value); // function no reference yet
//           setDropdownState(true);
//         }}
//       />

//       {languageDropdown && (
//         <ul className="dropdown-language">
//           <li className="divLine"></li>
//           {lang
//             .filter((lang) =>
//               lang.toLowerCase().includes(languageText.toLowerCase())
//             )
//             .map((filteredLang) => (
//               <li
//                 id="language"
//                 key={filteredLang}
//                 onClick={() => handleDropdownItemClick(filteredLang)}
//               >
//                 {filteredLang}
//               </li>
//             ))}
//         </ul>
//       )}
//     </div>
//   );
// };
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

/*
saves:

{languageDropdown && (
  <ul className="dropdown-language">
    <li
      id="language"
      onClick={() => handleDropdownItemClick('JavaScript')}
    >
      JavaScript
    </li>
    <li
      id="language"
      onClick={() => handleDropdownItemClick('Python')}
    >
      Python
    </li>
    <li
      id="language"
      onClick={() => handleDropdownItemClick('C++')}
    >
      C++
    </li>
  </ul>
)}
*/
