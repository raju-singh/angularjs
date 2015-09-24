var routes = require('routes');
var express = require('express');
var mongoose = require('mongoose');
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

mongoose.connect('mongodb://localhost/nodejs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('node js db opened');
});
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.find({"message":"Lhellona"}).exec(function(error, messageDoc) {
  mongoMessage = messageDoc.message;
});


app.get('/partials/*', function(req, res) {
    res.render('../../client/app/' + req.params[0]);
  });
app.get('*', function(req, res) {
  res.render('index',{
    mongoMessage : mongoMessage
  });
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