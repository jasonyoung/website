var mongoose = require("mongoose");
var Pool = mongoose.model("Pool");

module.exports = function PoolHandler(db) {
	var pools = db.collection('pools');

	this.handleNewPool = function(req, res) {
        var pool = new Pool(req.body);

        pool.save(function(err, pool) {
            if (err) {
                throw err;
            }

            console.log('Inserted:');
            console.log(pool);

            res.json({
                result: true
            });
        });
	};

	this.displayNewPoolPage = function(req, res) {

        if (!req.user)
        {
            res.redirect("/signinrequired");
        }

		res.render("newPool");
	};

	this.displayPoolListPage = function(req, res) {
		pools.find().toArray(function(err, results) {
			var createPool = function (data) {
				return {
					id : data._id.toString(),
					babyName : data.babyName
				}
			};

			var existingPools = results.map(createPool);
			res.render('poolList', { "pools" : existingPools });
		});		
	};

    this.displayPoolDetailsPage = function(req, res) {
        var query = {"babyName" : req.params.poolName};

        pools.findOne(query, function(err, pool){
            res.render("poolDetails", pool);
        });
    };
};
