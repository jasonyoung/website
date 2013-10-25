var express = require('express');
var app = express();

//Tell Express to use the Jade templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//Log request information to the console
app.use(express.logger('dev'));

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