import React, { useReducer, useEffect, useContext, createContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';
import './Comments.scss';
import Navbar from '../components/Navbar.jsx';
import HelperFunctions from '../helper-functions';

import {
  commentsActions as actions,
  commentsPageStateInit,
  commentsPageReducer,
} from '../reducers/commentsPageReducers.jsx';

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
        console.log('loading comments page...');
        const request = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        fetch(`/api/tech/${id}`, request)
          .then(res => res.json())
          .then(data => {
            console.log('data received...');
            const { name, link, description, image_url } = data.tech;
            dispatch({
              type: actions.NEW_TECH_DATA,
              payload: { name, link, description, image_url },
            });
            console.log('Updating posts: ', data.posts);
            dispatch({ type: actions.NEW_POSTS_DATA, payload: data.posts });
          })
          .catch(err => {
            console.log('Error when loading page: ', err);
          });
        break;
      }

      case 'submit_form': {
        console.log('Submitting form...');
        const { title, editor, language } = state.form;
        let test;
        const request = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            languageid: 1, // hard-coded : need parsing for language here
            comment: editor, // hard code this if not working
            tech_id: id,
            uploader_id: 0,
            typeReview: false,
            typeAdvice: false,
            typeCodeSnippet: false,
            typeHelpOffer: false,
          }),
        };
        fetch(`/api/post/${id}`, request)
          .then(res => {
            console.log('Initial response received');
            test = res;
            return res.json();
          })
          .then(data => {
            console.log('Success! Data: ', data);
            test = data;
            if (data.length > state.comments.length)
              dispatch({ type: actions.NEW_POSTS_DATA, payload: data });
          })
          .catch(err => {
            console.log('Error in post submission: ', err);
            console.log('Last response: ', test);
            dispatch({ type: actions.LOAD_PAGE });
          });
        break;
      }

      default:
        break;
    }
  }, [state.loading]);

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

  let comments = [];
  for (let index = 0; index < state.comments.length; index++) {
    const activeIndex = state.accordianIndexExpanded;
    const item = state.comments[index];

    comments.push(
      <div
        key={index}
        className={`accordion-item ${index === activeIndex ? 'active' : ''}`}>
        <div className='accordion-header-outer'>
          <div
            className='accordion-header'
            onClick={e => {
              e.preventDefault();
              dispatch({ type: actions.EXPAND_ACCORDION, payload: index });
            }}>
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
      </div>,
    );
  }

  return (
    <>
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
  const state = useContext(StateContext);
  const tech = state.tech;
  const { visible } = useContext(FormContext);
  const dispatch = useContext(DispatchContext);
  return (
    <div className='main-header'>
      <div>
        <div className='content'>
          <div className='comment-data-box'>
            <img className='comment-data-image' src={tech.image}></img>
            <div>
              <a href={tech.link} className='comment-tech-link'>
                <h2>{tech.name}</h2>
              </a>
              <p className='comment-tech-description'>{tech.description}</p>
            </div>
          </div>
          <button
            className='button'
            onClick={e => {
              e.preventDefault();
              dispatch({ type: actions.OPEN_OVERLAY });
            }}>
            + ADD POST
          </button>
          {visible && (
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
            value={form.title}
            onChange={event => {
              dispatch({
                type: actions.FORM_INPUT,
                payload: { formVar: 'title', input: event.target.value },
              });
            }}
          />
          <h5></h5>
          <input
            type='text'
            className='input-one-c'
            placeholder='Language Used'
            value={form.language}
            onChange={event => {
              dispatch({
                type: actions.FORM_INPUT,
                payload: { formVar: 'language', input: event.target.value },
              });
            }}
          />
          <Editor
            apiKey='ba2mzqsjqzq6lv0fu4numgypg3j9125otxy4rpzttx7vji3q'
            className='custom-editor'
            onEditorChange={(value, editor) => {
              dispatch({
                type: actions.FORM_INPUT,
                payload: { formVar: 'editor', input: value },
              });
            }}
            value={form.editor}
            init={{
              height: 300,
              max_height: 340,
              menubar: true,
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
            value={form.image}
            onChange={event => {
              dispatch({
                type: actions.FORM_INPUT,
                payload: { formVar: 'imageFile', input: event.target.value },
              });
            }}
          />
        </div>
        <div className='btn'>
          <button
            type='submit'
            className='login-button'
            onClick={e => {
              e.preventDefault();
              dispatch({ type: actions.SUBMIT_FORM });
            }}>
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
