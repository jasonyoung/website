module.exports = function PoolHandler(db) {
	this.handleNewPool = function(req, res) {
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
			});
		});
	};

	this.displayNewPoolPage = function(req, res) {
		res.render('newPool');
	};

	this.displayJoinPoolPage = function(req, res) {
		res.render('joinPool');
	};
};
