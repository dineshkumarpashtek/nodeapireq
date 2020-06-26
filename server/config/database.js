var pgp = require("./pgpromise.js");
// See also: https://github.com/vitaly-t/pg-promise#initialization-options

// Database connection details;
var cn = {
  host: "ec2-52-44-166-58.compute-1.amazonaws.com", // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: "d2sfu0rasq4o8c",
  user: "ffmkxqyvrdntad",
  password: "6bdeab52885ec6bc8a911c11ae42436a919d1e7c0e1b7d91ec383b9860e7770e",
};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js
var db = pgp(cn); // database instance;
module.exports = db;
