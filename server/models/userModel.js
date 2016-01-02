var mongoose = require('mongoose');

 var UserSchema =  mongoose.Schema({
                                    email : String,
                                    password : String, 
                                    token : String,
                                    firstName : String,
                                    lastName : String,
                                    phoneNumber : String,
                                    attributes : {birthday : Date , role : String },
                                  });
                                  
module.exports = mongoose.model('User', UserSchema);
