var jsforce = require("jsforce");

// Salesforce OAuth2 client information
var conn = new jsforce.Connection({
  oauth2: {
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: "https://login.salesforce.com",
    clientId: process.env.Consumer_Key,
    clientSecret: process.env.Consumer_Secret,
    redirectUri: process.env.Callback_URL,
  },
});

//all the routes for our application
module.exports = function (app, db, pgp) {
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get("/", function (req, res) {
    res.render("index.ejs"); // load the index.ejs file
  });

  app.post("/api/createlead", function (req, res) {
    const { name, company } = req.body;
    var insertQuery =
      "INSERT INTO lead (name, company) VALUES ('" +
      name +
      "','" +
      company +
      "')";

    db.query(insertQuery, true)
      .then(function (data) {
        return res.json(data);
      })
      .catch(function (err) {
        console.log("ERROR:", err); // print the error;
        return res.status(500).json({ success: false, error: err });
      })
      .finally(function () {
        pgp.end(); // for immediate app exit, closing the connection pool.
      });
  });
};
