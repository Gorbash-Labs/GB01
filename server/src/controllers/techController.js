const db = require('../config/profileSchema.js');

const techController = {};

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

techController.makeTech = async (req, res, next) => {
  // Grab req.body and users cookies make a new db entry
  console.log(req.body);
  const {
    name,
    typeApi,
    typeFramework,
    typeLibrary,
    link,
    description,
    image,
    keywords,
  } = req.body;

  const text = `INSERT INTO techs (name, type_api, type_framework,
                type_library, link, description, image_url)
                VALUES ($1, $2, $3, $4,$5,$6,$7)`;
  const values = [
    name,
    typeApi,
    typeFramework,
    typeLibrary,
    link,
    description,
    image,
  ];

  try {
    // CREATE NEW CARD
    await db.query(text, values);
    console.log('added card');
    // CREATE KEYWORD ASSOCIATIONS

    const { rows } = await db.query(
      `SELECT tech_id FROM techs WHERE name = $1`,
      [name]
    );
    // find tech_id

    const tech_id = rows[0].tech_id;

    console.log('New card id: ', tech_id);

    if (keywords.length) {
      for (let i = 0; i < keywords.length; i++) {
        //find tech_keyword_id
        const { rows } = await db.query(
          `SELECT tech_keyword_id FROM tech_keywords WHERE keyword = $1`,
          [keywords[i]]
        );
        const tech_keyword_id = rows[0].tech_keyword_id;

        console.log(tech_keyword_id);

        //insert to tech_v_tech_keyword
        await db.query(
          `INSERT INTO tech_keywords_v_techs (tech, tech_keyword) VALUES ($1, $2)`,
          [tech_id, tech_keyword_id]
        );
        console.log('added keywords');
      }
    }

    return next();
  } catch (err) {
    return next({
      log: 'Express error handler caught at techController.makeTech',
      message: { err: 'Unable to make new tech' },
    });
  }
};

techController.searchTech = (req, res, next) => {
  next();
  //res.locals.techList
};

techController.deleteTech = async (req, res, next) => {
  console.log('IN the DELTETECH func')

  try {
    console.log('deleteTech parameters: ', req.params)
    const tech_id = req.params.id
    const response = await db.query(`DELETE FROM posts WHERE tech=${tech_id};
      DELETE FROM techs WHERE tech_id=${tech_id}`)
    console.log('response from delete tech', response);
    res.locals.deleted = response;
    return next();
  } catch (err) {
    return next ({
      log: 'Express error handler caught at techController.deleteTech',
      message: { err: 'Unable to DELETE tech' },
    })
  }
}

module.exports = techController;
