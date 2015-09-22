/*global angular*/
angular.module('myApp')
    .controller('productCtrl', function($scope){
      $scope.products = '';
      $scope.addProduct = function(){
        
			          $scope.products.push({productName : $scope.productName,
                                        productId : $scope.productId,
                                        productDesc : $scope.productDesc,
			                                  price : $scope.price,
			                                  image : $scope.image
			                                });
			          var dataObj = {
                      					'productName' : $scope.productName,
                      					'productId' : $scope.productId,
                      					'productDesc' : $scope.productDesc,
                      					'price' : $scope.price,
                      					'image': $scope.image
                      				  };
      }
    $scope.products = [{productName:'Mobile Phone', productId: '1', productDesc: 'Mobile Phone', price:"15", image:'/images/img_chania.jpg'},
                        {productName:'Mobile Phone', productId: '1', productDesc: 'Mobile Phone', price:"15", image:'/images/img_chania.jpg'},
                        {productName:'Mobile Phone', productId: '1', productDesc: 'Mobile Phone', price:"15", image:'/images/img_chania.jpg'},
                        {productName:'Mobile Phone', productId: '1', productDesc: 'Mobile Phone', price:"15", image:'/images/img_chania.jpg'}];
      
});