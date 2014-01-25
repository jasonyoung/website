var mongoose = require('mongoose');
var swig = require('swig');
var express = require('express');
var app = express();
var routes = require('./routes');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var authentication = require('./authentication');

// Function to connect to the database.
var connectToDB = function(callback) {
    mongoose.connect("mongodb://localhost:27017/babyPoolDB");

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function () {
        console.log('Successfully connected to DB');

        // Close the connection to the DB when the application terminates.
        process.on('SIGTERM', function() {
            db.close();
        });

        // Invoke the callback, passing the connected db instance.
        process.nextTick(function() {
            callback(null, db)
        });
    });
};

var Schema = mongoose.Schema;

var poolSchema = new Schema({
    name:  String,
    babyName: String,
    parent:   String,
    dueDate: { type: Date, default: Date.now }
});

// Function to initialise application.
var init = function(err, db) {
    if (err) throw err;

    // Configure templating engine.
    app.engine('html', swig.renderFile);
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'html');

    // Disable view cache. Useful when developing.
    app.set('view cache', false);
    swig.setDefaults({
        cache: false
    });

    // Configure middleware.
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'needabettersecretthanthis'}));
    app.use(passport.initialize());
    app.use(passport.session());

    // Custom middleware to make authenticated user available to all views.
    app.use(function(req, res, next) {
        res.locals({
            get user() {
                return req.user;
            },
            isAuthenticated: function() {
                return req.user != null;
            }
        });

        next();
    });

    app.use(app.router);
    app.use(express.static(__dirname + '/../public'));

    // Setup authentication.
    authentication(db, passport);

    // Setup application routes.
    routes(app, db, passport);

    app.listen(3000);
    console.log('Listening on port 3000...');
};

// Start doing stuff! Pass init function as callback to connectToDB function.
connectToDB(init);
