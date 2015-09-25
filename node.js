var routes = require('routes');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var stylus = require('stylus');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(express.static(__dirname + '/client'));
function compile(str, path) {
  return stylus(str).set('filename', path);
}

mongoose.connect('mongodb://0.0.0.0/nodejs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('node js db opened');
});
var courseModel = require('./server/models/courseModel');
var courses = require('./server/controllers/coursectrl');


courseModel.createDefaultCourses();
/* var TodoSchema = new mongoose.Schema({
                                        name: String,
                                        completed: Boolean,
                                        note: String,
                                        updated_at: { type: Date, default: Date.now },
                                        author: String
                                      });
  var Todo = mongoose.model('Todo', TodoSchema);
  var todo = new Todo({name: 'Master AngulaJs', completed: true, note: 'Getting here...', author:'Raju Singh'});

 todo.save(function(err){
    if(err)
        console.log(err);
    else
        console.log(todo);
});
var mongoTodo;
Todo.findOne().exec(function(err, messageDoc) {
   mongoTodo = messageDoc.name;
});
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);
*/

app.get('/partials/*', function(req, res) {
    res.render('../../client/app/' + req.params[0]);
  });
app.get('/partials/main/product/product', function(req, res) {
    res.render('../../client/app/product/product' + req.params[0]);
  });
app.get('/api/courses', courses.getCourses);
app.all('/api/*', function(req,res){
   res.send(404);
});
app.get('*', function(req, res) {
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
var ip = process.env.IP;
app.listen(process.env.PORT, process.env.IP);

console.log('Listening on port ' + port + 'and on ip'+ ip + '....');