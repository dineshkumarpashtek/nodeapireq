 
var pgp = require('./pgpromise.js');
// See also: https://github.com/vitaly-t/pg-promise#initialization-options
  
// Database connection details;
var cn = {  
    host: 'ec2-54-210-128-153.compute-1.amazonaws.com', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'd19kndcbml5l6l',
    user: 'fmudtchuudsjqi',
    password: 'f62a8692a99f0f2949aec22ad0c9384220b7eab4debd4bc776e83a19d911f06d'
};        
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js
var db = pgp(cn); // database instance;
module.exports = db;   
