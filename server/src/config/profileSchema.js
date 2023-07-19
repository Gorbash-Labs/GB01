// for server.js


const { Pool } = require('pg');

const PG_URI =
  'postgres://dzucpkwy:36LMTNw1fPuVgBOFEnL3ruA0WhNBDMo1@stampy.db.elephantsql.com/dzucpkwy';
const pool = new Pool({
  connectionString: PG_URI,
});



module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    console.log('query params', params);
    return pool.query(text, params, callback);
  },
};

