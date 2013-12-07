var SiteHandler = require('./site');
var PoolHandler = require('./pool');

module.exports = function(app, db, passport) {
	var siteHandler = new SiteHandler();
	var poolHandler = new PoolHandler(db);

	app.get("/", siteHandler.displayMainPage);
	app.get("/newpool", poolHandler.displayNewPoolPage);
	app.post("/newpool", poolHandler.handleNewPool);
	app.get("/joinpool", poolHandler.displayJoinPoolPage);
	app.get("/unauthorised", function(req, res) {
		res.render("unauthorised");
	});

	app.post("/login", passport.authenticate('local', {
		successRedirect: "/joinpool",
		failureRedirect: "/unauthorised"
	}));
};