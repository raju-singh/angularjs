/*global angular*/
(function() {
    'use strict';
    
    angular.module('myApp')
        .controller('profileCtrl', ['Auth', '$scope', '$location', '$http', 'Upload', '$timeout', 'userService', function(Auth, $scope, $location, $http, Upload,$timeout, userService){
            $scope.title = 'Profile Page';
            var currentId = Auth.currentUser._id;
            $scope.currentUser = currentId;
            $scope.profileData = {};
            $scope.cancel = function(){
              $scope.profileData = {};  
            };
            
            function readUser(){
               userService.getUser({id:currentId}).$promise.then(function(result){
                  if(result){
                      console.log(result);
                      $scope.profileData = result;
                      var year = $scope.profileData.attributes.birthday;
                     
                       $scope.birthDate = new Date(year);
                        var month =$scope.months[$scope.birthDate.getMonth()];
                        $scope.SelectedYear = $scope.birthDate.getFullYear();
                        $scope.SelectedMonth =month.id;
                        $scope.SelectedDay = $scope.birthDate.getDate(); 
                  } 
               });
            }
           
          
            readUser();
            $scope.updateUser = function(){
                var user = {
                        _id: currentId,
        				firstName: $scope.profileData.firstName,
        				lastName: $scope.profileData.lastName,
        				email: $scope.profileData.email,
        				phoneNumber: $scope.profileData.phoneNumber,
        				attributes :{
        				    birthday: $scope.SelectedDay+'/'+$scope.SelectedMonth+'/'+$scope.SelectedYear
        				},
        				password:$scope.profileData.password,
                    };
                $http.put('/api/register/:id', user).$promise.then(function(response){
                        if(response){
                            $location.path('/');
                        }
                });
            };
            $scope.uploadFile = function (files) {
                console.log(currentId);
                $scope.files = files;
                if (files && files.length) {
                    $scope.file = files[0];
                }
                Upload.upload({
                        url: '/api/avatar/upload/'+$scope.currentUser,
                        //urlParams : ['currentId'],
                        file: $scope.file,
                        data: { 'Content-Type': 'multipart/form-data' },
                        method: 'POST'
                    }).then(function (response) {
                        $timeout(function () {
                            $scope.result = response.data;
                            console.log(response);
                        });
                    }, function (response) {
                        if (response.status > 0) {
                            $scope.errorMsg = response.status + ': ' + response.data;
                            console.log($scope.errorMsg);
                        }
                    }, function (evt) {
                        $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
               
            };
            $scope.months = [
                            {'id': 0, name : "January"},
                            {'id': 1, name : "February"},
                            {'id': 2, name : "March"},
                            {'id': 3, name : "April"},
                            {'id': 4, name : "May"},
                            {'id': 5, name : "June"},
                            {'id': 6, name : "July"},
                            {'id': 7, name : "August"},
                            {'id': 8, name : "September"},
                            {'id': 9, name : "October"},
                            {'id': 10, name : "November"},
                            {'id': 11, name : "December"},
            ];
            
            var days = $.map($(Array(31)), function (val, i) {
				return i + 1;
			});
			
			function isLeapYear(){
			    var year = $scope.SelectedYear || 0;
			    if((year % 400 === 0 || year/100 != 0) && year%4===0){
			        return 1;
			    }else {
			        return 0;
			    }
			}
			
			function getNoDays(){
			    var month = $scope.SelectedMonth || 0;
			    if(month===2){
			        return 31-(3-isLeapYear());
			    }else{
			        return 31-((month-1)%7%2);
			    }
			}
			
			$scope.noOfDaysInMonth = function(){
			    $scope.noDays = getNoDays();
			};
			
            var years = [];
            for (var i = 1970; i <= new Date().getFullYear(); i++) {
				years.push(i);
			}
			
			$scope.noDays = 31;
			$scope.days = days;
            $scope.years = years;
            
        }])
        .factory('userService', ['$http', '$resource', function($http, $resource){
            return $resource('/api/register/:id',{ id: "@id" }, {
                'getUser': {method:'GET', isArray: false},
                'updateUser' :{method : 'PUT'}
             });
        }])
        .directive('phoneNumber', function($filter, $browser){
            //var regexp =  /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;
            return {
                restrict : 'A',
                require : 'ngModel',
                link: function (scope, $element, attrs, ngModelCtrl) {
                	var listener = function() {
                        var value = $element.val().replace(/[^0-9]/g, '');
                        $element.val($filter('phone')(value, false));
                    };
                    ngModelCtrl.$parsers.push(function(viewValue) {
                        return viewValue.replace(/[^0-9]/g, '').slice(0,10);
                    });
                    ngModelCtrl.$render = function() {
                        $element.val($filter('phone')(ngModelCtrl.$viewValue, false));
                    };
                    $element.bind('keydown', listener);
                    $element.bind('paste cut', function() {
                        $browser.defer(listener);
                    });
        		}
            };
        })
        .filter('phone', function(){
            return function (phone) {
                //console.log(phone);
                if (!phone) { return ''; }
        
                var value = phone.toString().trim().replace(/^\+/, '');
        
                if (value.match(/[^0-9]/)) {
                    return phone;
                }
                var country, city, number;

                switch (value.length) {
                    case 1:
                    case 2:
                    case 3:
                        city = value;
                        break;
        
                    default:
                        city = value.slice(0, 3);
                        number = value.slice(3);
                }
                
                 if(number){
                    if(number.length>3){
                        number = number.slice(0, 3) + '-' + number.slice(3,7);
                    }
                    else{
                        number = number;
                    }
        
                    return ("(" + city + ") " + number).trim();
                }
                else{
                    return "(" + city;
                }
            };
        });
}());