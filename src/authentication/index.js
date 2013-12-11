module.exports = function(db, passport) {
	var LocalStrategy = require('passport-local').Strategy;
	var accounts = db.collection("accounts");

	var basicAuthentication = function(username, password, done) {
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

	var serializeUser = function(user, done) {
		done(null, user.username);
	};

	var deserializeUser = function(id, done) {
		accounts.findOne({username: id}, function(err, user) {
			done(err, user);
		});
	};

	passport.use(new LocalStrategy(basicAuthentication));
	passport.serializeUser(serializeUser);
	passport.deserializeUser(deserializeUser);
};
