var MongoClient = require('mongodb').MongoClient;
var swig = require('swig');
var express = require('express');
var app = express();
var routes = require('./routes');

// Function to connect to the database.
var connectToDB = function(callback) {
	MongoClient.connect("mongodb://localhost:27017/babyPoolDB", function(err, db) {
		if (err) {
			callback(err);
		}

		console.log('Successfully connected to DB');

		// Close the connection to the DB when the application terminates.
		process.on('SIGTERM', function() {
			db.close();
		});

		// Invoke the callback, passing the connected db instance.
		process.nextTick(function() {
			callback(null, db)
		});
	});
};

// Function to initialise application.
var init = function(err, db) {
	if (err) throw err;

	// Configure templating engine.
	app.engine('html', swig.renderFile);	
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');

	// Disable view cache. Useful when developing.
	app.set('view cache', false);
	swig.setDefaults({
		cache: false
	});

	// Log request information to the console.
	app.use(express.logger('dev'));

	// Set location of static resources.
	app.use(express.static(__dirname + '/public'));

	// Express middleware to populate 'req.body' so we can access POST variables.
	app.use(express.bodyParser());

	// Setup application routes.
	routes(app, db);	

	app.listen(3000);
	console.log('Listening on port 3000...');
};

// Start doing stuff! Pass init function as callback to connectToDB function.
connectToDB(init);