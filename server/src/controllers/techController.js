const db = require('../config/profileSchema.js');

const techController = {};

// works
techController.getAllTech = async (req, res, next) => {
  // Get full list from db and Return full tech list on res.locals.techList
  try {
    const { rows } = await db.query(`SELECT * FROM techs`);
    res.locals.techList = rows;
    return next();
  } catch (err) {
    return next({
      log: 'Express error handler caught at techController.getAllTech',
      message: { err: 'Unable to get all tech' },
    });
  }

  //res.locals.techList
};

// havent touched yet
techController.findTech = async (req, res, next) => {
  // Look up id on db and place on res.locals.techRequest
  try {
    const { id } = req.params;
    console.log('Looking up tech with id ', id);
    const { rows } = await db.query(`SELECT * FROM techs WHERE tech_id = $1`, [
      id,
    ]);

    if (rows.length === 0) {
      return next({
        log: 'Express error handler caught at techController.findTech',
        message: { err: 'Error: bad request.' },
      });
    }
    res.locals.techRequest = rows[0];
    return next();
  } catch (err) {
    return next({
      log: 'Express error handler caught at techController.findTech',
      message: { err: 'Error: bad request.' },
    });
  }
};


// works
techController.makeTech = async (req, res, next) => {
  // Grab req.body and users cookies make a new db entry
  console.log('req.body:', req.body);
  console.log('in create tech')
  const {
    name,
    typeApi,
    typeFramework,
    typeLibrary,
    link,
    description,
    image,
    // keywords,
  } = req.body;
   
  
  const keywords = name.toLowerCase().split(' ').join(',');
  console.log('keyword:', keywords);
  // console.log('req.body:', name,typeApi,typeFramework,typeLibrary,link,description,image,keywords);           
  
  const text = `INSERT INTO techs (name, type_api, type_framework, type_library, link, description, image_url, keywords)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
  // console.log(name);  
  
  // console.log(keywords);
  
  const values = [
    name,
    typeApi,
    typeFramework,
    typeLibrary,
    link,
    description,
    image,
    keywords
  ];
  console.log('value:', values)
  try {
    // CREATE NEW CARD
    // console.log('in create tech')
    await db.query(text, values);
    console.log('added card');
    // CREATE KEYWORD ASSOCIATIONS
    // const { rows } = await db.query(
    //   `SELECT tech_id FROM techs WHERE name = $1`,
    //   [name]
    // );
    // // find tech_id
    // const tech_id = rows[0].tech_id;

    // console.log('New card id: ', tech_id);

    // if (keywords.length) {
    //   for (let i = 0; i < keywords.length; i++) {
    //     //find tech_keyword_id
    //     const { rows } = await db.query(
    //       `SELECT tech_keyword_id FROM tech_keywords WHERE keyword = $1`,
    //       [keywords[i]]
    //     );
    //     const tech_keyword_id = rows[0].tech_keyword_id;

    //     // console.log(tech_keyword_id);

    //     //insert to tech_v_tech_keyword
    //     await db.query(
    //       `INSERT INTO tech_keywords_v_techs (tech, tech_keyword) VALUES ($1, $2)`,
    //       [tech_id, tech_keyword_id]
    //     );
    //     // console.log('added keywords');
    //   }
    // }

    return next();
  } catch (err) {
    console.error('Error creating tech:', err);
    return next({
      log: 'Express error handler caught at techController.makeTech',
      message: { err: 'Unable to make new tech' },
    });
  }
};

// works with one word searches
techController.searchTech = async (req, res, next) => {
  const { searchString } = req.body;
  const query = `SELECT * FROM techs WHERE LOWER(keywords) LIKE $1`;
  const searchWords = searchString.toLowerCase().split(' ');

  try {
    const queryResult = await db.query(query, [`%${searchString.toLowerCase()}%`]);

    // matchingTechs = queryResult.rows;

    // res.locals.techList = res.locals.techList || [];
    // res.locals.techList = res.locals.techList.concat(matchingTechs);

    // Use the spread operator to concatenate the matching techs to the techList
    res.locals.techList = [...(res.locals.techList || []), ...queryResult.rows];

    return next();
  } catch (err) {
    console.log('Error while searching techs table:', err);

    return next({
      log: 'Express error handler caught at techController.searchTech',
      message: { err: 'Unable to search new tech' },
    });
  }
};

// working on delete controller
techController.deleteTech = async (req, res, next) => {
  const { id } = req.params;

  try {
    await db.query(`
    DELETE
    FROM techs
    WHERE tech_id = $1`,
    [id]
    );
    return next();

  } catch (err) {
    console.log('Error while deleting a tech:', err);

    return next({
      log: 'Express error handler caught at techController.deleteTech',
      message: { err: 'Unable to delete a tech' },
    });
  }
}


module.exports = techController;

// https://react.dev/
