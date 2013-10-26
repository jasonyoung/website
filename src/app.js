var express = require('express');
var swig = require('swig');
var app = express();

app.engine('html', swig.renderFile);

//Tell Express to use the Swig templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.set('view cache', false);
swig.setDefaults({ cache: false });

//Log request information to the console
app.use(express.logger('dev'));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/newpool', function(req, res) {
	res.render('newPool');
});

app.post('/newpool', function(req, res) {
	res.send('Success!!');
});

app.listen(3000);
console.log('Listening on port 3000...');