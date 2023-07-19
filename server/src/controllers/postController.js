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
        log: 'Failed to find any matching posts.',
        message: { err: 'Lookup error.' },
      });
    }
    console.log('Retrieved post lookup: ', rows[0]);
    res.locals.postRequest = rows[0];
    next();
  } catch (err) {
    return next({
      log: 'Encountered lookup error in postController.findPost',
      message: { err: 'Lookup error.' },
    });
  }
};

//kenny was here
postController.makePost = async (req, res, next) => {
  // An authorized user is posting
  // Get username from cookies/session
  //const { username } = req.cookies;
  // const uploader_id = req.cookies('SSID');
  // Get post from body
  console.log('hello');
  let {
    title,
    tech_id, //needs to be unique to added tech. e.g., youtube api is 1 and google maps api is 2
    uploader_id, //can stay 0 for now? because no specific user atm, but loaded placeholder user in user table as user_id 0
    typeReview, //false
    typeAdvice, //false
    typeCodeSnippet, //false
    typeHelpOffer, //false
    languageid, //5 for javascript
    comment,
  } = req.body;
  console.log(
    title,
    tech_id,
    uploader_id,
    typeReview,
    typeAdvice,
    typeCodeSnippet,
    typeHelpOffer,
    languageid,
    comment,
  );
  // {
  //   "title": "Youtube",
  //   "tech_id": 4,
  //   "uploader_id": 0,
  //   "typeReview": false,
  //   "typeAdvice": false,
  //   "typeCodeSnippet": false,
  //   "typeHelpOffer": false,
  //   "languageid": 5,
  //   "comment": "hello",
  //   "image": "hello"
  // }
  // retreive tech id, uploader id, and language id
  // code

  try {
    // Add the post to the DB
    console.log('Starting insert...');
    await db.query(
      `INSERT INTO posts (title, tech, uploader, type_review, type_advice, type_code_snippet, type_help_offer, language, comment) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
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
      ],
    );
    // This could get PostId for confirmation and potentially better communication w/ front end
    console.log('Insert success');
    return next();
  } catch (err) {
    return next({
      log: 'Encountered insert error in postController.makePost',
      message: { err: 'Insert error.' },
    });
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
      log: 'Encountered lookup error in postController.findPostsByUser',
      message: { err: 'Lookup error.' },
    });
  }
};

postController.findPostsByTech = async (req, res, next) => {
  // Get all post with req.params.id == techId
  // Attach to res.locals.postList;
  const techId = req.params.id;
  console.log('TechID from route params: ', techId);
  const lookupText = 'SELECT * FROM posts WHERE tech = $1';
  const lookupVals = [techId];
  try {
    console.log('Starting lookup...');
    const { rows } = await db.query(lookupText, lookupVals);
    // console.log('Retrieved post lookup: ', rows);
    res.locals.postList = rows;
    return next();
  } catch (err) {
    return next({
      log: 'Encountered lookup error in postController.findPostsByTech',
      message: { err: 'Lookup error.' },
    });
  }
};

module.exports = postController;
