/*global angular*/
angular.module('myApp')
    .controller('productCtrl', function($scope, $uibModal){
      $scope.products = [{name: 'Lumia', pid: '1', desc:'New in Market', price: '100', upvotes:'5'}];
      
      $scope.addproduct = function(){
        if($scope.pid != ''){
            $scope.products.push({
                name : $scope.pName, pid: $scope.pid, desc: $scope.pDesc, price : $scope.pPrice, upvotes: 0
              });
            $scope.pName = '';
            $scope.pid = '';
            $scope.pDesc = '';
            $scope.pPrice = '';
        }
      };
      $scope.incrementUpvotes = function(product) {
        product.upvotes ++;
      };
      $scope.decrementUpvotes = function(product){
        if(product.upvotes > 0){
            product.upvotes --;
        }
      }
      //$scope.name = name;
      $scope.animationsEnabled = true;
      $scope.addproduct = function(event){
         var uibModalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: '/partials/main/product/addproduct',
                        controller: 'addProductCtrl',
                        size: 'md',
                    });
                    event.preventDefault();
                    event.stopPropagation();
      };
})
.controller('addProductCtrl', function($http, $scope, $uibModalInstance, Upload, $timeout){
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
    $scope.$watch('files', function() {  
        $scope.uploadFile($scope.files);
    });
    
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
                    //console.log($scope.result);
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                $scope.progress = 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        //console.log($scope.file);
    };
   
    $scope.addproduct = function(){
         var newProduct = {
          productName: $scope.product.name,
          pid: $scope.product.pid,
          details: $scope.product.details,
          price: $scope.product.price,
        }
        console.log(newProduct);
       $http.post('/api/newproduct', newProduct)
                .success(function(response) {
                    console.log("success", response)
                    //$location.path('/');
                    alert("Your's product has been added...Thank You!");
                })
                .error(function(response){
                    console.log("failed", response);
                    alert('Sorry.....');
                    $uibModalInstance.dismiss();
                });
    };
});
