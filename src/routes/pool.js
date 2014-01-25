module.exports = function PoolHandler(db) {
	var pools = db.collection('pools');

	this.handleNewPool = function(req, res) {		
		var newPool = {
			parentName: req.body.userName,
			babyName: req.body.babyName,
			emailAddress: req.body.emailAddress,
			dueDate: req.body.dueDate
		};

		var options = {
			safe: true
		};

		var poolCreatedHandler = function(err, docs) {
			console.log('Inserted:');
			console.log(docs);

			res.json({
				result: true
			});
		};

		pools.insert(newPool, options, poolCreatedHandler);
	};

	this.displayNewPoolPage = function(req, res) {

        if (!req.user)
        {
            res.redirect("/signinrequired");
        }

		res.render("newPool");
	};

	this.displayJoinPoolPage = function(req, res) {
		pools.find().toArray(function(error, results) {
			var createPool = function (data) {
				return {
					id : data._id.toString(),
					babyName : data.babyName
				}
			};

			var existingPools = results.map(createPool);
			res.render('joinPool', { "pools" : existingPools });
		});		
	};
};
