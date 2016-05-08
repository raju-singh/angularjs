var Course = require('mongoose').model('Course');
var Contact = require('mongoose').model('Contact');

exports.getCourses = function(req, res){
    Course.find({}).exec(function(err, collection){
        res.send(collection);
    });
};

exports.getCourseId = function(req, res){
    Course.findById({ _id: req.params.id}).exec(function(err, collection){
        res.send(collection);
    });
};

exports.createCourse = function(req, res){
    var course = new Course(req.body);
    course.save();
    res.send(req.body);
};
exports.updateCourse = function(req, res){
 Course.findByIdAndUpdate(req.params.id, {
    $set: { name: req.body.name, language: req.body.language, created: req.body.created, completed : req.body.completed }
  }, { upsert: true },
  function(err, obj) {
    return res.json(true);
  });
};
exports.deleteCourse = function(req, res){
    Course.findByIdAndRemove({ _id: req.params.id }, function(err) {
        res.json(true);
    });
};
exports.getPagination = function(req, res, next){
    if(!req.params.page){
        var page = 1;
    }else{
        var page = req.params.page;
    }
    var per_page =10;
    Course.find({}).skip((page-1)*per_page).limit(per_page).exec(function(err, collection){
        res.send(collection);
    });
};
exports.postContact = function(req, res){
 var contact = new Contact(req.body);
 //console.log(contact);
    contact.save();
    res.send(req.body);
};
exports.postFile = function(req, res){
    var file = req.body.file;
   // console.log(req);
   res.send('Sorry! Your image cannot be upload now....');
};