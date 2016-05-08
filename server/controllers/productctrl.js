var Product = require('mongoose').model('Product');

exports.addProduct= function(req, res){
    console.log(req.body);
    var product = new Product(req.body);
    product.save(function(err, collection){
        if(err)
            console.log('hello');
        else
            res.send(collection);
    });
    
};
exports.getProduct = function(req, res){
    
    Product.find({}).exec(function(err, collection){
           console.log(collection);
            res.send(collection);
    });
};
exports.deleteProduct = function(req, res){
    Product.findByIdAndRemove({ _id: req.params.id }, function(err) {
        res.json(true);
    });
};
exports.updateProduct = function(req, res){
   console.log(req.body);
   Product.findByIdAndUpdate(req.params.id, {
    $set: { likesCount: req.body.likesCount, upvotes:{userLike : req.body.upvotes.userLike, user: req.body.upvotes.userId}}
  }, { upsert: true },
  function(err, obj) {
   // console.log(obj);
    return res.json(true);
  });
};