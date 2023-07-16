
const db = require('../config/profileSchema.js');

const postController = {};



postController.findPost = (req,res,next) => {
  // Get a post with req.params.id == postId
  // Attach to res.locals.postRequest;

  next();
}

postController.makePost = (req,res,next) => {
// An authorized user is posting
// Get username from cookies/session
// Get post from body
// Add the post to the DB

  next();
}

postController.editPost = (req,res,next) => {
  // An authorized/authenticated user wants to edit the post saved to res.locals.postRequest.
  // Edit the post by database ID

  next();

}

postController.deletePost = (req,res,next) => {
  // An authorized/authenticated user wants to delete their post (res.locals.postRequest)
  // Delete the post from the database by databaseId.
  next();
}

postController.findPostsByUser = (req,res,next) => {
  // Using req.params.userId, generate res.locals.postlist

  next();
}

postController.findPostsByTech = (req,res,next) => {
  next();
  //req.params.id 
  // res.locals.postList
}

module.exports = postController;