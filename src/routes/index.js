var SiteHandler = require("./site");
var PoolHandler = require("./pool");
var AccountHandler = require("./account");

module.exports = function(app, db, passport) {
	var siteHandler = new SiteHandler();
	var poolHandler = new PoolHandler(db);
	var accountHandler = new AccountHandler(db);

	app.get("/", siteHandler.displayMainPage);
	app.get("/newpool", poolHandler.displayNewPoolPage);
	app.post("/newpool", poolHandler.handleNewPool);
	app.get("/poollist", poolHandler.displayPoolListPage);
	app.post("/register", accountHandler.handleNewAccount);
	app.get("/unauthorised", function(req, res) {
		res.render("unauthorised");
	});
    app.get("/signinrequired", function(req, res) {
        res.render("signInRequired");
    });


    app.post("/login", passport.authenticate('local', {
		successRedirect: "/",
		failureRedirect: "/unauthorised"
	}));

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    app.get("/pools/:poolName",poolHandler.displayPoolDetailsPage);
};
