/*global angular*/

angular.module('myApp')
    .controller('contactCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
           $scope.contact_send = function(){
             var contactSend = {
               firstName : $scope.firstName,
               lastName : $scope.lastName,
               organisation : $scope.organisation,
               date : $scope.date,
               address : $scope.address,
               sendCopy : $scope.sendCopy,
             };
             $http.post('/api/contact', contactSend)
                .success(function(response) {
                    console.log("success", response)
                    $location.path('/');
                    alert("Your's details has been sent...Thank You!");
                })
                .error(function(response){
                    console.log("failed", response);
                    alert('Sorry.....');
                });
           }; 
        }])
        .directive('validatemail',[function () {
        	var EMAIL_REGEXP =/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        	return {
        		require: 'ngModel',
        		link: function (scope, elem, attrs, ctrl) {
        			elem.on('keyup',function(){
        				var isMatchRegex = EMAIL_REGEXP.test(elem.val());
        				ctrl.$setValidity('validEmail', isMatchRegex);
        			});
        		}
        	};
}]);
