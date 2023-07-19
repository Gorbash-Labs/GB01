const db = require('../config/profileSchema.js');

const postController = {};

postController.findPost = async (req, res, next) => {
  // Get a post with req.params.id == postId
  // Attach to res.locals.postRequest;
  const postId = req.params.id;
  const lookupText = 'SELECT * FROM posts WHERE post_id = $1';
  const lookupVals = [postId];
  try {
    const { rows } = await db.query(lookupText, lookupVals);
    if (rows.length === 0) {
      // no results
      return next({
        log: err,
      });
    }
    console.log('Retrieved post lookup: ', rows[0]);
    res.locals.postRequest = rows[0];
    next();
  } catch (err) {
    return next({
      log: err,
    });
  }
};

postController.makePost = async (req, res, next) => {
  // An authorized user is posting
  // Get username from cookies/session
  //const { username } = req.cookies;
  // const uploader_id = req.cookies('SSID');
  const uploader_id = 8;
  // Get post from body
  const {
    tech_id,
    typeReview,
    typeAdvice,
    typeCodeSnippet,
    typeHelpOffer,
    languageid,
    title,
    comment,
  } = req.body;
  const image = '';
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
    // This could get PostId for confirmation and potentially better communication w/ front end
    return next();
  } catch (err) {
    return next({ log: err });
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
  // Get all post with req.params.id == techId
  // Attach to res.locals.postList;
  console.log(res.locals.userRequest);
  const userId = res.locals.userRequest.user_id;
  const lookupText = 'SELECT * FROM posts WHERE uploader = $1';
  const lookupVals = [userId];
  try {
    const { rows } = await db.query(lookupText, lookupVals);
    console.log('Retrieved post lookup: ', rows);
    res.locals.postList = rows;
    next();
  } catch (err) {
    return next({
      log: err,
    });
  }
};

postController.findPostsByTech = async (req, res, next) => {
  // Get all post with req.params.id == techId
  // Attach to res.locals.postList;
  const techId = req.params.id;
  const lookupText = 'SELECT * FROM posts WHERE tech = $1';
  const lookupVals = [techId];
  try {
    const { rows } = await db.query(lookupText, lookupVals);
    // console.log('Retrieved post lookup: ', rows);
    res.locals.postList = rows;
    next();
  } catch (err) {
    return next({
      log: err,
    });
  }
};

module.exports = postController;
