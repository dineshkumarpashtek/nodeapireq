var pgp = require("./pgpromise.js");
// See also: https://github.com/vitaly-t/pg-promise#initialization-options

// Database connection details;
var cn = {
  host: "ec2-52-71-85-210.compute-1.amazonaws.com", // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: "de69rdrn5us4re",
  user: "fwgfuwzxriesph",
  password: "8ef513949750927071e5fc26b91accafd51bfe6e45f293109c2988850f6b7bab",
};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js
var db = pgp(cn); // database instance;
module.exports = db;
