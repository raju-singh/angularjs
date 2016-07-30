/*global angular*/
angular.module('myApp').controller('productCtrl', function($http, $scope, Upload, $timeout, Product, Auth){
    $scope.products = {};
    $scope.userId = Auth.currentUser._id;
    $scope.incrementUpvotes = function(product) {
        product.likesCount++;
        var productUpdate = {
            productName: product.productName,
            productId: product.productId,
            desc: product.desc,
            price: product.price,
            likesCount : product.likesCount,
            upvotes:{userLike: true, userId : $scope.userId}
        };
        //console.log(product._id);
        $http.post('/api/product/:id/likes/:userId',  productUpdate ).then(function(res){
            console.log(res);
        });
    };
    $scope.getLikesStatus = function(){
      $http.get('/api/product/:id');  
    };
    $scope.uploadFile = function (files) {
        $scope.files = files;
        if (files && files.length) {
            $scope.file = files[0];
        }
        Upload.upload({
                url: '/api/product-image',
                file: $scope.file,
                method: 'POST'
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                });
            }, function (response) {
                console.log(response);
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                $scope.progress = 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
    };
   
    $scope.addproduct = function(){
        var newProduct = {
            productName: $scope.productName,
            productId: $scope.productId,
            desc: $scope.desc,
            price: $scope.price,
            likesCount :'0',
            upvotes: {userLike: '1', user: Auth.currentUser }
        };
        Product.create(newProduct).$promise.then(function(response){
            console.log(response);
            $scope.products.unshift(response);
            $scope.productName = '';
            $scope.productId = '';
            $scope.desc = '';
            $scope.price = '';
            $scope.files = '';
        });
    };
    $scope.deleteProduct = function(productid, index){
        Product.delete({id: productid}).$promise.then(function(response){
            $scope.products.splice(index, 1);
        });
    };
    $scope.getProductList = function(){
        $http.get('/api/product').then(function(response){
            console.log(response);
            $scope.products = response.data;
        });
    };
    $scope.getProductList();
}).service('Product', function($location, $resource){
    return $resource('/api/product/:id/:userId', {id: '@id', userId: '@userId'}, {
      create: {
        method: 'POST',
        isArray: false
      },
      delete: {
        method: 'DELETE',
        urlParams: {id: '@id'}
      },
      update : {
        method: 'PUT',
        urlParams: {id: '@id', userId: '@userId'}
      }
    });
});