/*global angular*/
angular.module('myApp')
    .controller('signIn', function($scope){
        
        $scope.signIn = function(username, password){
            alert('Welcome to angular Js ')
        };
        
    });