
var jwt = require('jsonwebtoken');
var User = require('mongoose').model('User');
var secret = require('../config/mongoose');

exports.createUser= function(req, res){
    User.findOne({email : req.body.email, password: req.body.password}, function(err, users){
        if(err){
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        }
        else {
            if (users) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            }
            else{
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.save(function(err, users) {
                    users.token = jwt.sign(users, secret.secret, { expiresInMinutes: 120});
                    users.save(function(err, user1) {
                        if(err){
                            res.json({
                                type: false,
                                data: "Please try after sometime."
                            });
                        }
                        res.json({
                            type: true,
                            data: user1,
                            token: user1.token
                        });
                    //console.log(user1);    
                    });
                })
                //res.send(res);
            }
        }
        //console.log(users);
    });
};

exports.signinUser = function(req, res){
    User.findOne({email : req.body.email, password: req.body.password}, function(err, user){
          if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
               res.json({
                    type: true,
                    data: user,
                    token: user.token
                }); 
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });    
            }
        }
    });
};
exports.userAuth = function(req, res){
    User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
};
exports.updateUser = function(req, res){
    //var userData = req.body;
    User.findByIdAndUpdate(req.body._id, {
    $set: { email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, phoneNumber: req.body.phoneNumber, attributes: {birthday : req.body.attributes.birthday}, password : req.body.password }
  }, { upsert: true },
  function(err, obj) {
      //console.log(obj);
    return res.json(true);
  });
};

exports.getUser = function(req, res){
    //console.log(req.params.id);
  User.findOne({ _id: req.params.id}).exec(function(err, user){
        res.send(user);
    })  
};

exports.searchUser = function(req, res){
    //console.log(req.params.q);
    var email = req.params.q;
    User.find({email : new RegExp(email, 'i') }).exec(function(err, results){
        if(err){
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        }
        else{
            if(results){
                res.status(200).send(results);
            }else{
                res.json({
                    type: false,
                    data : 'Please try again...'
                });
            }
        }
    });
};
exports.userList = function(req, res){
    User.find({}).exec(function(err, users){
        res.send(users);
    });
};