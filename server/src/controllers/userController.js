const db = require('../config/profileSchema.js');
const bcrypt = require('bcrypt');


const userController = {};

// works
userController.makeUser = async (req, res, next) => {
  const { username, password, contact } = req.body;
  console.log('username, password, contact:', username, password, contact);

  // Expect req.body has username and password
  if (username === undefined || password === undefined)
    return next({
      log: 'Express error handler caught at userController.makeUser',
      message: { err: 'Name or pw does not exist' },
    });

  //Check and see if username is taken
  const result = await db.query('SELECT name FROM users WHERE name = $1', [username]);
  
  if (result.rows.length > 0) {
    res.locals.existingUser = true;
    return next({
      log: 'usercontroller.makeuser: User tried to sign up for a username that is already taken',
      status: 400,
      message: 'Username taken',
    });
  }

  // DATABASE CODE FOR CREATING USER GOES HERE
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user in DB with hashed Pwd
    const text = `INSERT INTO users (name, password, contact, community) VALUES ($1, $2, $3, $4)`;
    const values = [username, hashedPassword, contact, 1]; // 1 for CTRI17

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
    console.log('Error while adding user:', err);

    return next({
      log: 'Express error handler caught at userController.makeUser',
      message: { err: 'Unable to create user' },
    });
  }
};

// works
userController.newSession = (req, res, next) => {
  // Here after creating or authenticating. Make a new 1.5 minute session and send them cookies.
  // http enhances security by making cookies only accessible server side
  const hours = 1;
  const maxAgeInMs = hours * 60 * 60 * 1000;
  res.cookie('SSID', res.locals.userId, { maxAge: maxAgeInMs, httpOnly: true });
  next();
};

userController.endSession = (req, res, next) => {
  res.clearCookie('SSID');
  next();
};

// works with checking hashed pw
userController.authenticate = async (req, res, next) => {
  // If they have a valid session already, next()
  if (req.cookies.SSID) return next();

  // If they don't have a valid session, check req.body for username + password
  const { username, password } = req.body;
  // Hash salt + Pwd and check database. If valid, next.
  try {
    // Add USER_ID on res.locals.userId
    const userResult = await db.query(`
      SELECT user_id, password 
      FROM users 
      WHERE name = $1`,
      [username]
    );
    // if user exists error
    if (userResult.rows.length === 0) {
      return next({
        log: 'usercontroller.authenticate: Invalid username or password',
        status: 401,
        message: 'Invalid username or password',
      });
    }
    // need to check pw with stored hashed pw
    const hashedPassword = userResult.rows[0].password;
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      return next({
        log: 'usercontroller.authenticate: Invalid password',
        status: 401,
        message: 'Invalid password',
      });
    }

    console.log('passwords match!')

    res.locals.userId = userResult.rows[0].user_id;

    console.log('UserId saved');

    return next();
  } catch (err) {
    console.log('Error while authenticating user:', err);

    return next({
      log: 'Express error handler caught at userController.authenticate',
      message: { err: 'Unable to authenticate' },
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
  const userName = req.params.id;
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

module.exports = userController;
