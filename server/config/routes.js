var jsforce = require('jsforce');

// Salesforce OAuth2 client information
var conn = new jsforce.Connection({
  oauth2 : {
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl : 'https://login.salesforce.com',
    clientId: process.env.Consumer_Key,
    clientSecret:  process.env.Consumer_Secret,
    redirectUri: process.env.Callback_URL,
  }
});
//all the routes for our application
module.exports = function(app,db,pgp) {
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
  
   
	app.get('/api/studentid/:sId', function(req, res) {
		console.log('req+'+req);
		console.log('res+'+res);
        var sId = req.params.sId;
        if(req.hasOwnProperty('user')){
        
            var loginUser = req.user;
            var results = [];
            console.log(loginUser);
			db.query("SELECT * FROM salesforce.student WHERE id ='"+sId+"'", true)
		    .then(function (data) {
				
				var order = data;
				//order.AccountId = loginUser.accountid;
				
				conn.login(process.env.SF_Username, process.env.SF_PWD, function(err, userInfo) {
				  if (err) { return res.status(500).json({ success: false,err:err}); }
				  // Now you can get the access token and instance URL information.
				  // Save them to establish connection next time.
				  console.log(conn.accessToken);
				  console.log(conn.instanceUrl);
				  // logged in user property
				  console.log("User ID: " + userInfo.id);
				  console.log("Org ID: " + userInfo.organizationId);
				  // Single record creation
				  console.log("Order Id",order);
				  
					conn.sobject("Student__c").create(order, function(err, ret) {
					if (err || !ret.success) { return res.status(500).json({ success: false,err:err,ret:ret}); }
						console.log("Created record id : " + ret.id);
					});
				});
				
				
				
		        return res.json(data);
		    })
		    .catch(function (err) {
		        console.log("ERROR:", err); // print the error;
		        return res.status(500).json({ success: false,error : err});
		    })
		    .finally(function () {
		        // If we do not close the connection pool when exiting the application,
		        // it may take 30 seconds (poolIdleTimeout) before the process terminates,
		        // waiting for the connection to expire in the pool.
		
		        // But if you normally just kill the process, then it doesn't matter.
		        pgp.end(); // for immediate app exit, closing the connection pool.
		        // See also:
		        // https://github.com/vitaly-t/pg-promise#library-de-initialization
		    });

        }else{
            return res.status(500).json({ success: false});
        }
  	});
    
	app.post('/api/studentpost', function(req, res) {
    	if(req.hasOwnProperty('user')){
            var loginUser = req.user;
            var results = [];
            var data =req.body;
			var order = data.order;
			order.AccountId = loginUser.accountid;
			
			conn.login(process.env.SF_Username, process.env.SF_PWD, function(err, userInfo) {
			  if (err) { return res.status(500).json({ success: false,err:err}); }
			  // Now you can get the access token and instance URL information.
			  // Save them to establish connection next time.
			  console.log(conn.accessToken);
			  console.log(conn.instanceUrl);
			  // logged in user property
			  console.log("User ID: " + userInfo.id);
			  console.log("Org ID: " + userInfo.organizationId);
			  // Single record creation
			  console.log("Order Id",order);
			  
				conn.sobject("Student__c").create(order, function(err, ret) {
				if (err || !ret.success) { return res.status(500).json({ success: false,err:err,ret:ret}); }
					console.log("Created record id : " + ret.id);
				});
			});
        }else{
            return res.status(500).json({ success: false});
        }
   	});
   
};
