const db = require('../config/profileSchema.js');

const postController = {};

postController.findPost = async (req, res, next) => {
  // Get a post with req.params.id == postId
  // Attach to res.locals.postRequest;
  const postId = req.params.id;
  const lookupText = 'SELECT * FROM posts WHERE post_id = $1';
  const lookupVals = [postId];
  // 'SELECT * FROM posts WHERE post_id = $1';
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

    // create a new table for name or join with the one from above
    //res.locals

    next();
  } catch (err) {
    return next({
      log: 'Encountered lookup error in postController.findPost',
      message: { err: 'Lookup error.' },
    });
  }
};

postController.makePost = async (req, res, next) => {
  // An authorized user is posting
  // Get username from cookies/session
  //const { username } = req.cookies;
  const uploader_id = req.cookies['SSID'];
  console.log('uploader_id: ', uploader_id);
  // const uploader_id = 1;
  // Get post from body
  const {
    tech_id,
    typeReview,
    typeAdvice,
    typeCodeSnippet,
    typeHelpOffer,
    languageName,
    title,
    comment,
  } = req.body;

  const image = '';
  // retreive tech id, uploader id, and language id
  // code

  try {
    const { rows } = await db.query(
      `SELECT language_id FROM languages WHERE name = $1`,
      [languageName]
    );
    const languageId = rows[0].language_id;
    console.log('passed language id search', languageId);

    try {
      const values = [
        title,
        tech_id,
        uploader_id, // uploader is temp before session
        typeReview,
        typeAdvice,
        typeCodeSnippet,
        typeHelpOffer,
        languageId,
        comment,
        '', // no real image passing back yet ?
      ];
      console.log(values);
      // Add the post to the DB
      await db.query(
        `INSERT INTO posts (title, tech, uploader, type_review, type_advice, type_code_snippet, type_help_offer, language, comment, image) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        values
      );
      // INSERT INTO posts (title, tech, uploader, type_review, type_advice, type_code_snippet, type_help_offer, language, comment, image) VALUES ('Google Maps Java', '1', 8 , false, false, false, false, 4, ''
      console.log('Successfully Inserted Post');

      res.locals.techId = tech_id;
      return next();
    } catch (err) {
      return next({
        log: 'Encountered Insert to Posts error in postController.makePost',
        message: { err: 'MakePost error.' },
      });
    }
  } catch (err) {
    return next({
      log: 'Encountered find Language error in postController.makePost',
      message: { err: 'Find Language error.' },
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

postController.findLanguagesByTech = async (req, res, next) => {
  // get a list of languages
  const name = await db.query(`SELECT name FROM languages`);
  const languages = name.rows.map((pairing) => pairing.name);
  console.log(languages);
  res.locals.languages = languages;
  return next();
};

postController.findPostsByTech = async (req, res, next) => {
  // Get all post with req.params.id == techId
  // Attach to res.locals.postList;
  const techId = req.params.id;
  const lookupText = `SELECT posts.*, users.name AS uploader
  FROM posts 
  JOIN users ON posts.uploader = users.user_id
  WHERE tech = $1`;

  const lookupVals = [techId];
  try {
    const { rows } = await db.query(lookupText, lookupVals);
    // console.log('Retrieved post lookup: ', rows);
    res.locals.postList = rows;
    next();
  } catch (err) {
    return next({
      log: 'Encountered lookup error in postController.makePost',
      message: { err: 'MakePost error.' },
    });
  }
};

module.exports = postController;
