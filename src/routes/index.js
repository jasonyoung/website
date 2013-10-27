module.exports = function(app, db) {
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
};