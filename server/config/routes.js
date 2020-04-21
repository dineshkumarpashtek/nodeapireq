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

  app.get("/api/createlead/:sId", function (req, res) {
    var sId = req.params.sId;
    const { author, title } = req.body;
    console.log("sId+" + sId);
    console.log("author+" + author + ": title :" + title);
    //WHERE s_id ="+sId+"::int"
    db.query("SELECT * FROM lead where id=" + sId + "", true)
      .then(function (data) {
        console.log("data+" + data);
        var studentDtls = data;

        conn.login(process.env.SF_Username, process.env.SF_PWD, function (
          err,
          userInfo
        ) {
          if (err) {
            return res.redirect("/orders");
          }
          // Now you can get the access token and instance URL information.
          var records = [];
          conn.query(
            "SELECT LastName,Company,Id,Name FROM lead WHERE Id='" +
              sId +
              "' LIMIT 1",
            function (err, result) {
              if (err) {
                return res.status(500).json({ success: false, error: err });
              }
              console.log("total : " + result.totalSize);
              console.log("fetched : ", result.records[0]);
              console.log("done ? : " + result.done);

              records = result.records[0];

              if (result.totalSize != 0) {
                // record updation
                conn.sobject("lead").update(
                  {
                    Id: result.records[0].Id,
                    Name: result.records[0].name,
                    LastName: result.records[0].LastName,
                    Company: result.records[0].Company,
                  },
                  function (err, ret) {
                    if (err || !ret.success) {
                      return console.error(err, ret);
                    }
                    console.log("record Updated successfully : " + ret.id);
                    // ...
                  }
                );
              } else {
                // Single record creation
                conn.sobject("lead").create(
                  {
                    Name: studentDtls[0].name,
                    LastName: studentDtls[0].LastName,
                    Company: studentDtls[0].Company,
                  },
                  function (err, ret) {
                    if (err || !ret.success) {
                      return console.error(err, ret);
                    }
                    console.log("Created record id : " + ret.id);
                    // ...
                  }
                );
              }
            }
          );
        });

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
