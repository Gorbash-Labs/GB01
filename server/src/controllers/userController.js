const db = require('../config/profileSchema.js');

const userController = {};

userController.makeUser = (req, res, next) => {
  next();
};

userController.newSession = (req, res, next) => {
  next();
};

userController.authenticate = (req, res, next) => {
  next();
};

userController.authorizeEdit = (req, res, next) => {
  next();
};

userController.findUser = (req, res, next) => {
  next();
  //res.locals.userRequest
};

module.exports = userController;
