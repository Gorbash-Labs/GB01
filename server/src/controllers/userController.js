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
      status: 300,
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

    res.locals.userId = userId;
    console.log('userId saved');

    return next();
  } catch (err) {
    return next('Express error handler caught at userController.makeUser');
  }
};

userController.newSession = (req, res, next) => {
  // Here after creating or authenticating. Make a new 1.5 minute session and send them cookies.
  res.cookies('SSID', res.locals.userID, { maxAge: 90000, httpOnly: true });
  next();
};

userController.endSession = (req, res, next) => {
  res.clearCookie('SSID');
  next();
};

userController.authenticate = (req, res, next) => {
  // Here for verifying authentication of new users
  // If they have a valid session already, next()

  // If they don't have a valid session, check req.body for username + password
  // Hash salt + Pwd and check database. If valid, next.

  // Otherwise, redirect to login page

  next();
};

userController.authorizeEdit = (req, res, next) => {
  // Here to edit or delete. Verify that they have a valid session and that User_ID is the author of req/params/id. If not, error.
  next();
};

userController.findUser = (req, res, next) => {
  // Check session. If valid, next(). Otherwise, redirect to login.
  next();
  //res.locals.userRequest
};

module.exports = userController;
