const db = require('../config/profileSchema.js');

const postController = {};

postController.findPost = (req, res, next) => {
  // Get a post with req.params.id == postId
  // Attach to res.locals.postRequest;

  next();
};

postController.makePost = async (req, res, next) => {
  // An authorized user is posting
  // Get username from cookies/session
  const { username } = req.cookies;
  // Get post from body
  const {
    tech,
    typeReview,
    typeAdvice,
    typeCodeSnippet,
    typeHelpOffer,
    language,
    title,
    comment,
    image,
  } = req.body;

  // retreive tech id, uploader id, and language id
  // code

  try {
    // Add the post to the DB
    db.query(
      `INSERT INTO posts (title, tech, uploader, type_review, type_advice, type_code_snippet, type_help_offer, language, comment, image) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        title,
        tech_id,
        uploader_id,
        typeReview,
        typeAdvice,
        typeCodeSnippet,
        typeHelpOffer,
        languageid,
        comment,
        image,
      ]
    );

    return next();
  } catch (err) {
    return next('error');
  }
};

postController.editPost = (req, res, next) => {
  // An authorized/authenticated user wants to edit the post saved to res.locals.postRequest.
  // Edit the post by database ID

  next();
};

postController.deletePost = (req, res, next) => {
  // An authorized/authenticated user wants to delete their post (res.locals.postRequest)
  // Delete the post from the database by databaseId.
  next();
};

postController.findPostsByUser = async (req, res, next) => {
  // Using req.params.userId, generate res.locals.postlist
  // const { username } = req.params;
  // const text = ``;
  // try {
  //   const { rows } = await db.query(text, [username]);
  //   // if rows length is zero then it does not exist
  //   res.locals.postList = rows;
  //   return next();
  // } catch (err) {
  //   return next({
  //     log: 'Express error handler caught at postController.findPostsByUser',
  //     message: { err: 'Unable to find posts by this user' },
  //   });
  // }
};

postController.findPostsByTech = (req, res, next) => {
  next();
  //req.params.id
  // res.locals.postList
};

module.exports = postController;
