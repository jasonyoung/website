module.exports = function AccountHander(db) {
	"use strict";
	var accounts = db.collection("accounts");

	this.handleNewAccount = function(req, res) {
		var password = req.body.password;
		var confirmPassword = req.body.confirmPassword;

		if (password != confirmPassword) {
			res.send("Invalid Password - Fool")
			return;
		};

		var account = {
			username: req.body.username,
			password: password
		};

		accounts.insert(account, function(err, doc) {
			res.send("Account created");
		});
	};
};