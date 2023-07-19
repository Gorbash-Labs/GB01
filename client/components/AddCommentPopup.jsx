import React from 'react';
import { useParams } from 'react-router-dom';

import { Editor } from '@tinymce/tinymce-react';

function AddCommentPopup(props) {
  const { id } = useParams();
  


  return (
    <div className="overlay-comments">
      <div className="overlay-content-comments">
        <div>
          <div className="formGroup-two">
            <div>
              <h2>Add FORM</h2>
              <hr className="line" />
              <input
                type="text"
                className="input-one-first"
                placeholder="Title"
                id="title"
              />
              <h5></h5>
              <input
                type="text"
                className="input-one-c"
                placeholder="Language Used"
                // required
                id="language"
              />
              <input
                type="text"
                className="input-one-c"
                placeholder="comment"
                id="comment"
              />
              <input type="radio" id="tags_review" value="true"/>
              <label className="tags_text">Review</label>

              <input type="radio" id="tags_advice" value="true"/>
              <label className="tags_text">Advice</label>

              <input type="radio" id="tags_code_snippet" value="true"/>
              <label className="tags_text">Code Snippet</label>

              <input type="radio" id="tags_help_offer" value="true"/>
              <label className="tags_text">Help Offer</label>
              {/* <Editor
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
                    /> */}
              <button type="submit" onClick={props.handleAddCommentClick}>
                Submit
              </button>
              <button onClick={props.handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCommentPopup;
