var routes = require('routes');
var express = require('express');
//var bodyParser = require('body-parser');

var stylus = require('stylus');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
//app.use(bodyParser());
app.use(express.static(__dirname + '/client'));
function compile(str, path) {
  return stylus(str).set('filename', path);
}

app.get('/partials/*', function(req, res) {
    res.render('../../client/app/' + req.params[0]);
  });
app.get('/', function(req, res) {
  res.render('index');
});/*
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/login', routes.account);
*/
app.use(stylus.middleware(
    {
      src: __dirname + '/client',
      compile: compile
    }
  ));

var port = process.env.PORT;
app.listen(process.env.PORT, process.env.IP);

console.log('Listening on port ' + port + '...');