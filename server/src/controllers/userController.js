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
    const userId = await db.query(`SELECT user_id FROM users WHERE name = $1`, [
      username,
    ]);

    // @TONY -- I think this query returns an array, we need [0] for the first element.
    res.locals.userId = userId;
    console.log('userId saved');

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

userController.authenticate = (req, res, next) => {
  // Here for verifying authentication of new users
  // If they have a valid session already, next()
  if (req.cookies('SSID')) next;

  // If they don't have a valid session, check req.body for username + password
  const {username, passowrd} = req.body;
  // Hash salt + Pwd and check database. If valid, next.
  try {
    // Add USER_ID on res.locals.userId
    const userIdResult = await db.query(`SELECT user_id FROM users WHERE name = $1, password = $2`, [
      username, password
    ]);

    if (userIdResult.length == 0){
      return next ({
        log: 'usercontroller.authenticate: Invalid username or password',
        status: 401,
        message: 'Invalid username or password',
      });
    }

    res.locals.userId = userId[0];
    console.log('userId saved');

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
  if (req.cookies('SSID') === postAuthorId){
    // User is authorized to edit or delete their own post
    next();
  } else {
    // User not authorized to edit/delete another's post
    return next ({
      log: 'usercontroller.authorizeEdit: User not authorized to modify another users post.',
      status: 401,
      message: 'Unauthorized action.',
    });
  }
};

userController.findUser = (req, res, next) => {
  next();
  //get user onto res.locals.userRequest
};

module.exports = userController;
