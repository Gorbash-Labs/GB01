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
      message: { err: 'Lookup error findPost' },
    });
  }
};

postController.retrievePosts = async (req, res, next) => {
  // Get a post with req.params.id == postId
  // Attach to res.locals.postRequest;
  const lookupText = 'SELECT * FROM posts INNER JOIN users ON posts.uploader = users.user_id';
  //SELECT * FROM posts INNER JOIN users ON posts.uploader = users.user_id WHERE tech = $1
  try {
    const arrOfComments = await db.query(lookupText);
    console.log('Retrieved general comments: ', arrOfComments);
    res.locals.comments = arrOfComments;
    return next();
  } catch (err) {
    return next({
      log: 'Encountered lookup error in postController.retrievePosts',
      message: { err: 'Lookup error retrievePosts' },
    });
  }
};

postController.makePost = async (req, res, next) => {
  // An authorized user is posting
  // Get username from cookies/session
  //const { username } = req.cookies;
  // const uploader_id = req.cookies('SSID');
  const uploader_id = 2;
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

  /*
    CREATE TABLE posts(
        post_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        tech INTEGER NOT NULL,
        FOREIGN KEY(tech) REFERENCES techs(tech_id),
        uploader INTEGER NOT NULL,
        FOREIGN KEY(uploader) REFERENCES users(user_id),
        type_review BOOLEAN,
        type_advice BOOLEAN,
        type_code_snippet BOOLEAN,
        type_help_offer BOOLEAN,
        language INTEGER NOT NULL,
        FOREIGN KEY(language) REFERENCES languages (language_id),
        comment VARCHAR(5000) NOT NULL,
        image TEXT
    )

*/

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
    return next('error');
  }
};

postController.editPost = async (req, res, next) => {
  // An authorized/authenticated user wants to edit the post saved to res.locals.postRequest.
  // Edit the post by database ID
  const id = req.params.id;
  console.log('id')


  next();
};

postController.deletePost = async (req, res, next) => {
  // An authorized/authenticated user wants to delete their post (res.locals.postRequest)
  // Delete the post from the database by databaseId.
  console.log('DeletePost Req: ', req.params, req.query); //--> find id
  const id = Number(req.params.id);
  try {
    const response = await db.query(`DELETE FROM posts WHERE post_id=${id} `);
    //PARAMETERIZE ID when you get time for preventing injection to SQL
    res.locals.deleted = response;
    return next()
  } catch (err) {
    return next({
      log: 'Error in Deletion postController.deletePost',
      message: { err: 'error in postcontroller.deletePost function'}
    });
  }

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
      message: { err: 'Lookup error findPostsByUser' },
    });
  }
};

postController.findPostsByTech = async (req, res, next) => {
  // Get all post with req.params.id == techId
  // Attach to res.locals.postList;
  const techId = req.params.id;
  const lookupText = 'SELECT * FROM posts INNER JOIN users ON posts.uploader = users.user_id WHERE tech = $1';
  const lookupVals = [techId];
  try {
    const { rows } = await db.query(lookupText, lookupVals);
    // console.log('Retrieved post lookup: ', rows);
    res.locals.postList = rows;
    next();
  } catch (err) {
    return next({
      log: 'Encountered lookup error in postController.findPostsByTech',
      message: { err: 'Lookup error findPostsByTech' },
    });
  }
};

module.exports = postController;
