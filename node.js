//var routes = require('routes');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require("cookie-parser");
//var morgan = require("morgan");
var session = require("express-session");
var multer = require("multer");
//var fs = require('fs');
var jwt = require('jsonwebtoken');
//var express_jwt = require('express-jwt');
var mail = require("nodemailer");

var stylus = require('stylus');
//var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));
//app.use(passport.initialize());
//app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(express.static(__dirname + '/client'));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

function compile(str, path) {
  return stylus(str).set('filename', path);
}

mongoose.connect('mongodb://0.0.0.0/nodejs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('Mongodb opened');
});

var upload = multer({ dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename+Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
    }
});

// User registration and authentication 
var usermodel = require('./server/models/userModel');
var user = require('./server/controllers/userctrl');
var courseModel = require('./server/models/courseModel');
var courses = require('./server/controllers/coursectrl');

app.get('/partials/*', function(req, res) {
    res.render('../../client/app/' + req.params[0]);
  });

app.post('/api/avatar/upload/:id', multer({ dest: './uploads/avatar/'}).single('file'), function(req ,res){
       // console.log( req.params.id);
       // console.log(req.body); //form fields
	     // console.log(req.file);
	      res.status(204).end();
	      
	      return res;
 });
app.get('/api/user/search/:q', user.searchUser); 
app.post('/api/register', user.createUser);
app.get('/api/user', user.userList);
app.post('/api/login', user.signinUser);
app.get('/api/authenticateme', ensureAuthorized, user.userAuth);
app.put('/api/register/:id', user.updateUser);
app.get('/api/register/:id', user.getUser);
app.get('/api/courses', courses.getCourses);
app.get('/api/courses/:id', courses.getCourseId);
app.post('/api/courses', courses.createCourse);
app.put('/api/courses/:id', courses.updateCourse);
app.delete('/api/courses/:id', courses.deleteCourse);
app.get('/api/pagination/:page', courses.getPagination);
app.post('/api/contact', courses.postContact);
app.post('/api/product-image', courses.postFile);

var User = require('mongoose').model('User');

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

app.all('/api/*', function(req,res){
   res.send(404);
});
app.get('*', function(req, res) {
  res.render('index');
});

app.use(stylus.middleware(
    {
      src: __dirname + '/client',
      compile: compile
    }
  ));
app.use(function(req, res, next) {
  if (req.user) {
    res.cookie('user', JSON.stringify(req.user));
  }
  next();
});


var port = process.env.PORT;
var ip = process.env.IP;
app.listen(process.env.PORT, process.env.IP);

console.log('Listening on port ' + port + 'and on ip'+ ip + '....');