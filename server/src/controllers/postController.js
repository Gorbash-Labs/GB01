const db = require('../config/profileSchema.js');

const postController = {};



postController.findPost = (req,res,next) => {
  next();
  //req.params.id == postId
  //res.locals.postRequest;
}

postController.makePost = (req,res,next) => {
  next();
  //body
}

postController.editPost = (req,res,next) => {
  next();
  //req.params.id postId + body
}

postController.deletePost = (req,res,next) => {
  next();
  //req.params.id postId
}

postController.findPostsByUser = (req,res,next) => {
  next();
  //req.params.id = userId
  //res.locals.postList
}

postController.findPostsByTech = (req,res,next) => {
  next();
  //req.params.id 
  // res.locals.postList
}

module.exports = postController;