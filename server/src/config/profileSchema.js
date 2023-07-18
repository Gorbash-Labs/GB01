// for server.js

const { Pool } = require('pg');

const PG_URI =
 "postgres://lynugokg:2cIYlwNCUZzwffbIOKvrAKMdYjtBTbpO@mahmud.db.elephantsql.com/lynugokg;"
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
