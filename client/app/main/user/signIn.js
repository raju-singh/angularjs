/*global angular*/
angular.module('myApp')
    .controller('signIn', function($scope){
        
        $scope.signIn = function(username, password){
            
            if( $scope.username!=null){
            console.log('Welcome to angular Js ');}
        };
        
    });