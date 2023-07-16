const db = require('../config/profileSchema.js');

const techController = {};


techController.getAllTech = (req,res,next) => {
  // Get full list from db and Return full tech list on res.locals.techList
  
  next();
  //res.locals.techList
}

techController.findTech = (req,res,next) => {
  // Look up postId on db and place on res.locals.techRequest

  next();
}

techController.makeTech = (req,res,next) => {
  // Grab req.body and users cookies make a new db entry

  next();
}

techController.searchTech = (req,res,next) => {
  

  next();
  //res.locals.techList
}



module.exports = techController;