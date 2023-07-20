import React from 'react'

function test() {
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
                <div className="buttons">
                  <button className="edit_button" onClick= {editComment} id={item.post_id}>Edit Comment</button>
                  <button className="delete_button" onClick= {deleteComment} id={item.post_id}>Delete Comment</button>
                </div>
                <div>{item.title}

                </div>
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
  )
}

export default test