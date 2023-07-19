import React, { useState, useEffect, useContext, createContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';
import './Comments.scss';
import Navbar from '../components/Navbar.jsx';
import HelperFunctions from '../helper-functions';

const actions = {
  OPEN_OVERLAY: 'OPEN_OVERLAY',
  EXIT_OVERLAY: 'EXIT_OVERLAY',
  EXPAND_ACCORDION: 'EXPAND_ACCORDION',
  FORM_INPUT: 'FORM_INPUT', // types of form input are title, lang, contentEntry, image file
  SUBMIT_FORM: 'SUBMIT_FORM',
  LOAD_PAGE: 'LOAD_PAGE',
  NEW_TECH_DATA: 'NEW_TECH_DATA',
  NEW_POSTS_DATA: 'NEW_POSTS_DATA',
};

const commentsPageStateInit = {
  tech: {
    name: '',
    link: '',
    description: '',
    image_url: '',
  },
  form: {
    visible: false,
    title: '',
    language: '',
    editor: '',
    entry: '',
    imageFile: null,
  },
  comments: [],
  accordianIndexExpanded: null,
  loading: 'idle',
};

const commentsPageReducer = (state, action) => {
  switch (action.type) {
    case actions.OPEN_OVERLAY: {
      return { ...state, formVisible: true };
    }
    case actions.EXIT_OVERLAY: {
      return {
        ...state,
        form: { ...commentsPageStateInit.form },
      };
    }
    case actions.EXPAND_ACCORDION: {
      return { ...state, accordianIndexExpanded: action.payload };
    }
    case actions.FORM_INPUT: {
      const { stateVar, input } = action.payload;
      const newState = { ...state };
      newState[stateVar] = input;
      return newState;
    }
    case actions.SUBMIT_FORM: {
      return { ...state, loading: 'submit_form' };
    }
    case actions.LOAD_PAGE: {
      return { ...state, loading: 'load_page' };
    }
    case actions.NEW_TECH_DATA: {
      // happens on initial page load
      const tech = action.payload;
      return { ...state, loading: 'idle', tech };
    }
    case actions.NEW_POSTS_DATA: {
      // happens on initial page load AND successful post submission
      const comments = action.payload;
      return { ...state, loading: 'idle', comments };
    }
    default:
      return state;
  }
};

const StateContext = createContext();
const FormContext = createContext();
const DispatchContext = createContext();

const Comments = () => {
  // Tech ID specified by react route params
  const { id } = useParams();

  const [state, dispatch] = useReducer(
    commentsPageReducer,
    commentsPageStateInit,
  );

  // initial page load
  useEffect(() => {
    dispatch({ type: actions.LOAD_PAGE });
  }, []);

  // all loading state handlers (fetch requests)
  useEffect(() => {
    switch (state.loading) {
      case 'load_page': {
        const request = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        fetch('/api/tech', request)
          .then(res => res.json())
          .then(data => {
            dispatch({ type: actions.NEW_TECH_DATA, payload: data.tech });
            dispatch({ type: actions.NEW_POSTS_DATA, payload: data.posts });
          });
        break;
      }

      case 'submit_form': {
        const { title, entry, language } = state.form;
        const request = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            languageid: 1, // hard-coded : need parsing for language here
            comment: entry, // hard code this if not working
            tech_id: id,
            typeReview: false,
            typeAdvice: false,
            typeCodeSnippet: false,
            typeHelpOffer: false,
          }),
        };
        fetch('/api/post', request)
          .then(res => res.json())
          .then(data => {
            console.log('Success! Data: ', data);
            if (data.length > state.comments.length)
              dispatch({ type: actions.NEW_POSTS_DATA, payload: data });
          })
          .catch(err => {
            console.log('Error: ', err);
          });
        break;
      }

      default:
        break;
    }
  }, state.loading);

  //from here we had starting typing out the states to handle the backend format but realized we did not have enough time so it is not connected/finished
  /*
      CREATE TABLE posts(
        post_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        tech INTEGER NOT NULL,
          FOREIGN KEY(tech) REFERENCES techs(tech_id),
        uploader INTEGER NOT NULL, *TO-DO (currently hard-coded)
          FOREIGN KEY(uploader) REFERENCES users(user_id),
        type_review BOOLEAN, *TO-DO
        type_advice BOOLEAN, *TO-DO
        type_code_snippet BOOLEAN, *TO-DO
        type_help_offer BOOLEAN, *TO-DO
        language INTEGER NOT NULL,
          FOREIGN KEY(language) REFERENCES languages (language_id),
        comment VARCHAR(5000) NOT NULL,
        image TEXT
    )
  */

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
        console.log('Hello there hello there');
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

  const openOverlay = e => {
    // e.preventDefault();
    setShowOverlay(true);
  };

  const handleAccordionClick = index => {
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
        className={`accordion-item ${index === activeIndex ? 'active' : ''}`}>
        <div className='accordion-header-outer'>
          <div
            className='accordion-header'
            onClick={() => handleAccordionClick(index)}>
            <div>{item.title}</div>
            <div className='details'>
              <p className='username'>{item.username}</p>
              <p className='tags'>Posted by: Steve</p>
            </div>
          </div>
        </div>
        {index === activeIndex && (
          <div className='accordion-content'>
            <div>
              <div className='experience'>
                {HelperFunctions.md(item.comment)}
              </div>
              <img src={item.image} alt='Image' className='accordion-image' />
            </div>
          </div>
        )}
      </div>
    );
  });

  return (
    <>
      <Navbar />
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <FormContext.Provider value={state.form}>
            <MainHeader />
            <div className='input-container'>
              <input
                type='text'
                className='input-bar'
                placeholder='Search APIs...'
              />
            </div>
            <div className='accordion'>{comments}</div>
          </FormContext.Provider>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </>
  );
};

const MainHeader = () => {
  const { tech } = useContext(StateContext);
  const { visible } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);
  return (
    <div className='main-header'>
      <div>
        <div className='content'>
          <div className='comment-data-box'>
            <img className='comment-data-image' src={techImage}></img>
            <div>
              <a href={techLink} className='comment-tech-link'>
                <h2>{techName}</h2>
              </a>
              <p className='comment-tech-description'>{techDescription}</p>
            </div>
          </div>
          <button className='button' onClick={openOverlay}>
            + ADD POST
          </button>
          {showOverlay && (
            <div className='overlay-comments'>
              <div className='overlay-content-comments'>
                <div>
                  <Form />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Form = () => {
  const form = useContext(FormContext);
  const dispatch = useContext(DispatchContext);
  return (
    <form>
      <div className='formGroup-two'>
        <div>
          <h2>Add FORM</h2>
          <hr className='line' />
          <input
            type='text'
            className='input-one-first'
            placeholder='Title'
            value={titleEntry}
            onChange={event => {
              setTitleEntry(event.target.value);
            }}
          />
          <h5></h5>
          <input
            type='text'
            className='input-one-c'
            placeholder='Language Used'
            // require
            value={languageEntry}
            onChange={event => {
              setLanguageEntry(event.target.value);
            }}
          />
          <Editor
            apiKey='ba2mzqsjqzq6lv0fu4numgypg3j9125otxy4rpzttx7vji3q'
            initialValue={initialVal}
            className='custom-editor'
            onEditorChange={handleEditorChange}
            value={entry}
            onChange={event => {
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
            type='file'
            className='input-one-image'
            accept='image/*'
            value={image}
            onChange={event => {
              setImage(event.target.value);
            }}
          />
        </div>
        <div className='btn'>
          <button type='submit' className='login-button' onClick={addComment}>
            Submit
          </button>
        </div>
      </div>
    </form>
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
