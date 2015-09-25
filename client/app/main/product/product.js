/*global angular*/
angular.module('myApp')
    .controller('productCtrl', function($scope){
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
        product.upvotes --;
      }
      //$scope.name = name;
});
