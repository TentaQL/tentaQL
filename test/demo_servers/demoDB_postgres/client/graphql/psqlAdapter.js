

const pgPromise = require('pg-promise');

const connStr = 'postgres://tbpsxkue:TBTE6vwArK31H7dVlizemHoMn9LP_TWC@baasu.db.elephantsql.com:5432/tbpsxkue';

const pgp = pgPromise({}); 
const psql = pgp(connStr);

exports.psql = psql;

