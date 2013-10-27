module.exports = function SiteHandler() {
	this.displayMainPage = function(req, res) {
		res.render('home');
	};
};