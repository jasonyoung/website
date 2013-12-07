module.exports = function(db) {
	var accounts = db.collection("accounts");

	return function(username, password, done) {
		var callback = function(err, user) {
			if (err) return done(err);

			if (!user) {
				return done(null, false, {
					message: "User not found"
				});
			}

			if (user.password != password) {
				return done(null, false, {
					message: "Invalid password"
				});
			}

			done(null, user);
		};

		var query = {
			"username": username
		};

		accounts.findOne(query, callback);
	};
};
