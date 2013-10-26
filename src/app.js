var express = require('express');
var swig = require('swig');
var app = express();
var MongoClient = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/babyPoolDB", function (err, db) {
    if (err) throw err;

    console.log('Connected!!');

    app.engine('html', swig.renderFile);

    //Tell Express to use the Swig templating engine
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');

    app.set('view cache', false);
    swig.setDefaults({ cache: false });

    //Log request information to the console
    app.use(express.logger('dev'));

    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());

    app.get('/', function (req, res) {
        res.render('home');
    });

    app.get('/newpool', function (req, res) {
        res.render('newPool');
    });

    app.post('/newpool', function (req, res) {
        console.log('Your name:');
        console.log(req.body.userName);

        res.send('Success!!');
    });

    app.get('/joinpool', function (req, res) {
        res.render('joinPool');
    });

    app.listen(3000);
    console.log('Listening on port 3000...');
});
