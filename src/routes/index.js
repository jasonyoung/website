var SiteHandler = require('./site');
var PoolHandler = require('./pool');

module.exports = function(app, db) {
	var siteHandler = new SiteHandler();
	var poolHandler = new PoolHandler(db);

	app.get('/', siteHandler.displayMainPage);
	app.get('/newpool', poolHandler.displayNewPoolPage);
	app.post('/newpool', poolHandler.handleNewPool);
	app.get('/joinpool', poolHandler.displayJoinPoolPage);
};