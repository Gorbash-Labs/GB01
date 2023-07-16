const db = require('../config/profileSchema.js');

const userController = {};

userController.makeUser = (req, res, next) => {
  // Expect req.body has username and password
  // Create new user in DB with hashed Pwd

  // DATABASE CODE FOR CREATING USER GOES HERE

  
  // Add USER_ID on res.locals.userId
  // Add cookies for user
  next();
};

userController.newSession = (req, res, next) => {
  // Here after creating or authenticating. Make a new session and send them cookies.
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
