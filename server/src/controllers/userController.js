const db = require('../config/profileSchema.js');

const userController = {};

userController.makeUser = async (req, res, next) => {
  const { username, password, contact } = req.body;
  //Check and see if username is taken
  const result = await db.query('SELECT name FROM users WHERE name = $1', [
    username,
  ]);

  if (result.rows.length > 0) {
    res.locals.existingUser = true;
    return next({
      log: 'usercontroller.makeuser: User tried to sign up for a username that is already taken',
      status: 400,
      message: 'Username taken',
    });
  }

  // Expect req.body has username and password
  if (username === undefined || password === undefined)
    return next({
      log: 'Express error handler caught at userController.makeUser',
      message: { err: 'Name or pw does not exist' },
    });

  // Create new user in DB with hashed Pwd
  const text = `INSERT INTO users (name, password, contact, community)
                VALUES ($1, $2, $3, $4)`;
  const values = [username, password, contact, 1]; // 1 for CTRI17

  // DATABASE CODE FOR CREATING USER GOES HERE
  try {
    await db.query(text, values);
    console.log('user added successfully');

    // Add USER_ID on res.locals.userId
    const { rows } = await db.query(
      `SELECT user_id FROM users WHERE name = $1`,
      [username]
    );
    const { user_id } = rows[0];

    res.locals.userId = user_id;
    console.log(res.locals.userId);
    return next();
  } catch (err) {
    return next('Express error handler caught at userController.makeUser');
  }
};

userController.newSession = (req, res, next) => {
  // Here after creating or authenticating. Make a new 1.5 minute session and send them cookies.
  res.cookie('SSID', res.locals.userId, { maxAge: 90000, httpOnly: true });
  next();
};

userController.endSession = (req, res, next) => {
  res.clearCookie('SSID');
  next();
};

userController.authenticate = async (req, res, next) => {
  // Here for verifying authentication of new users
  // If they have a valid session already, next()
  if (req.cookies) next;

  // If they don't have a valid session, check req.body for username + password
  const { username, password } = req.body;
  console.log(req.body);
  // Hash salt + Pwd and check database. If valid, next.
  try {
    // Add USER_ID on res.locals.userId
    const { rows } = await db.query(
      `SELECT user_id FROM users WHERE name = $1 AND password = $2`,
      [username, password]
    );
    console.log(rows[0].user_id);
    const id = rows[0].user_id;

    if (!id) {
      return next({
        log: 'usercontroller.authenticate: Invalid username or password',
        status: 401,
        message: 'Invalid username or password',
      });
    }

    res.locals.userId = id;

    console.log('UserId saved');

    return next();
  } catch (err) {
    return next({
      log: 'Error occured in userController.authenticate.',
    });
  }
};

userController.authorizeEdit = (req, res, next) => {
  // Here to edit or delete. Verify that they have a valid session and that User_ID is the author of req/params/id. If not, error.
  const postAuthorId = req.locals.postRequest.userId;
  if (req.cookies('SSID') === postAuthorId) {
    // User is authorized to edit or delete their own post
    next();
  } else {
    // User not authorized to edit/delete another's post
    return next({
      log: 'usercontroller.authorizeEdit: User not authorized to modify another users post.',
      status: 401,
      message: 'Unauthorized action.',
    });
  }
};

userController.findUser = async (req, res, next) => {
  const userName = req.params.userName;
  const lookupText = 'SELECT * FROM users WHERE name = $1';
  const lookupVals = [userName];
  try {
    const { rows } = await db.query(lookupText, lookupVals);
    console.log('Retrieved user lookup: ', rows);
    if (rows.length === 0) {
      return next({
        log: 'Failed to find matching user in userController.findUser',
        message: { err: 'Lookup error.' },
      });
    }
    res.locals.userRequest = rows[0];
    next();
  } catch (err) {
    return next({
      log: 'Encountered lookup error in postController.findPostsByUser',
      message: { err: 'Lookup error.' },
    });
  }
};

userController.findAllUsers = async (req, res, next) => {
  const lookupText = 'SELECT * FROM users';
  try {
    const { rows } = await db.query(lookupText);
    console.log('Retrieved user lookup: ', rows);
    if (rows.length === 0) {
      return next({
        log: 'Failed to find matching user in userController.findUser',
        message: { err: 'Lookup error.' },
      });
    }
    res.locals.userRequest = rows;
    next();
  } catch (err) {
    return next({
      log: 'Encountered lookup error in postController.findPostsByUser',
      message: { err: 'Lookup error.' },
    });
  }
};

// CREATE TABLE users (
//   user_id SERIAL PRIMARY KEY,
//   name TEXT NOT NULL,
//   password TEXT NOT NULL,
//   contact TEXT NOT NULL,
//   permissions INTEGER DEFAULT 0
// )

userController.updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const { name, password, contact } = req.body;
  const lookupText = `UPDATE users 
  SET name = $2, password = $3, contact = $4 
  WHERE user_id = $1`;
  const lookupVals = [userId, name, password, contact];
  try {
    const response = await db.query(lookupText, lookupVals);
    console.log('Retrieved updated user: ', response);
    if (!response) {
      return next({
        log: 'Failed to update user in userController.updateUser',
        message: { err: 'Lookup error.' },
      });
    }
    res.locals.newUserInfo = rows[0];
    next();
  } catch (err) {
    return next({
      log: 'Encountered update error in userController.updateUser',
      message: { err: 'Lookup error.' },
    });
  }
};

module.exports = userController;
