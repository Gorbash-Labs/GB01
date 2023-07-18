// for server.js

const { Pool } = require('pg');

const PG_URI =
  // 'postgres://mqyenfhu:Q-XccTOehb_iYM3Qq4Xh3vXhYNPRF2Mm@mahmud.db.elephantsql.com/mqyenfhu';
  // ^old one

  'postgres://tgntnsvz:dkdyKSW2sKqN9v6uEW0F5Qd4LCy0HRwd@mahmud.db.elephantsql.com/tgntnsvz';
// ^ new one
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
