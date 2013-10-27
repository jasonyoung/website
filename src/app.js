var MongoClient = require('mongodb').MongoClient;
var swig = require('swig');
var express = require('express');
var app = express();

var connectToDB = function(callback) {
	MongoClient.connect("mongodb://localhost:27017/babyPoolDB", function(err, db) {
		if (err) {
			callback(err);
		}

		console.log('Successfully connected to DB');

		process.on('SIGTERM', function() {
			db.close();
		});

		process.nextTick(function() {
			callback(null, db)
		});
	});
};

var init = function(err, db) {
	if (err) throw err;

	app.engine('html', swig.renderFile);

	//Tell Express to use the Swig templating engine
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');

	app.set('view cache', false);
	swig.setDefaults({
		cache: false
	});

	//Log request information to the console
	app.use(express.logger('dev'));

	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());

	app.get('/', function(req, res) {
		res.render('home');
	});

	app.get('/newpool', function(req, res) {
		res.render('newPool');
	});

	app.post('/newpool', function(req, res) {
		console.log('Your name:');
		console.log(req.body.userName);

		var pool = {
			parentName: req.body.userName,
			babyName: req.body.babyName,
			emailAddress: req.body.emailAddress,
			dueDate: req.body.dueDate
		};

		db.collection('pools').insert(pool, {
			safe: true
		}, function(err, docs) {
			console.log('Inserted:');
			console.log(docs);
			res.json({
				result: true
			})
		});
	});

	app.get('/joinpool', function(req, res) {
		res.render('joinPool');
	});

	app.listen(3000);
	console.log('Listening on port 3000...');
};

connectToDB(init);