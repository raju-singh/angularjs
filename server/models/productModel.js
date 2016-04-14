var mongoose = require('mongoose');
 var ProductSchema =  mongoose.Schema({
                                        productName: String,
                                        productId: {type: Number, unique: true},
                                        desc:{type: String},
                                        price: String,
                                        likesCount : String,
                                        upvotes: {userLike : Boolean, user: {type: String, unique: true}} 
                                      });
var Product;
Product = mongoose.model('Product', ProductSchema);