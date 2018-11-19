function psqlAdapterCreator(uri) {
  const psqlAdapter = `

const pgPromise = require('pg-promise');

const connStr = '${uri}';

const pgp = pgPromise({}); 
const psql = pgp(connStr);

exports.psql = psql;

`;
  return psqlAdapter;
}

module.exports = psqlAdapterCreator;