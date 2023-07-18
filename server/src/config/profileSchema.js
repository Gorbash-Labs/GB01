

const { Pool } = require('pg');
//  'postgres://mqyenfhu:Q-XccTOehb_iYM3Qq4Xh3vXhYNPRF2Mm@mahmud.db.elephantsql.com/mqyenfhu'  // tonys

// 'postgres://xawxqres:uzaHNe86NQawj7bbw0qFPlyjmiLGvt_c@stampy.db.elephantsql.com/xawxqres' // kevins

const PG_URI = 'postgres://xawxqres:uzaHNe86NQawj7bbw0qFPlyjmiLGvt_c@stampy.db.elephantsql.com/xawxqres';
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

