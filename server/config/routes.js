var jsforce = require('jsforce');

// Salesforce OAuth2 client information
var conn = new jsforce.Connection({
  oauth2 : {
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl : 'https://test.salesforce.com',
    clientId: process.env.Consumer_Key,
    clientSecret:  process.env.Consumer_Secret,
    redirectUri: process.env.Callback_URL,
  }
});
//all the routes for our application
module.exports = function(app, passport,db,pgp) {
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
   
};
