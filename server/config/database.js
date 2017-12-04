 
var pgp = require('./pgpromise.js');
// See also: https://github.com/vitaly-t/pg-promise#initialization-options
  
// Database connection details;
var cn = {  
    host: 'ec2-184-73-174-10.compute-1.amazonaws.com', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'd3n0a7c8r6e1k6',
    user: 'btipjmyojqadbo',
    password: 'bedd3910032843af2c1eb0f6864f0655e858a234ccb0abbef509f13ab1d6fa9b'
};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js
var db = pgp(cn); // database instance;
module.exports = db;   
