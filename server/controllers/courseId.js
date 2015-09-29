var Course = require('mongoose').model('Course');

exports.getCourseId = function(req, res){
    Course.findById({ _id: req.params.id}).exec(function(err, collection){
        res.send(collection);
    })
};