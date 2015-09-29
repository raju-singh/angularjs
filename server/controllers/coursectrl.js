var Course = require('mongoose').model('Course');

exports.getCourses = function(req, res){
    Course.find({}).exec(function(err, collection){
        res.send(collection);
    })
};

exports.getCourseId = function(req, res){
    Course.findById({ _id: req.params.id}).exec(function(err, collection){
        res.send(collection);
    })
};