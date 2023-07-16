const db = require('../config/profileSchema.js');

const techController = {};


techController.getAllTech = (req,res,next) => {
  next();
  //res.locals.techList
}

techController.findTech = (req,res,next) => {
  next();
  //res.locals.techRequest
}

techController.makeTech = (req,res,next) => {
  next();
}

techController.searchTech = (req,res,next) => {
  next();
  //res.locals.techList
}



module.exports = techController;