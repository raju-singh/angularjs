/*global angular*/

angular.module('myApp')
    .controller('menuCtrl', ['$scope', '$location', 'Auth', '$localStorage', function($scope, $location, Auth, $localStorage){
        $scope.menus = [
            {item : 'Home', url : "/"},
            {item : 'Filter', url : "/filter"},
            {item : 'Product', url : "/product"},
            {item : 'Course', url : "/course"},
            {item : 'Contact Us', url : "/contact"}
        ];
        
        $scope.isActive = function(route) {
            return route === $location.path();
        };
        $scope.identity = Auth;
       
        $scope.logout = function(){
            console.log('jade');
            $localStorage.$reset();
            Auth.currentUser = undefined;
            $scope.username = '';
            $scope.password = '';
        };
        
    }]);
