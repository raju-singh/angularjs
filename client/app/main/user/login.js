/*global angular*/

angular.module('myApp')
    .controller('loginCtrl', ['$scope', '$http','$localStorage', 'Auth', 'jwtHelper', '$location', function($scope, $http, $localStorage, Auth, jwtHelper,$location){
       $scope.signIn = function(){
           var logIn = {
               email:$scope.email,
               password :$scope.password
           };
          $http.post('/api/login', logIn)
                    .success(function(response) {
                        if (response.type == false) {
                            console.log(response);
                        } 
                        else {
                            $localStorage.userDetails = response;
                            //localStorage.setItem('userName', re)
                            var user = {};
                            angular.extend(user, jwtHelper.decodeToken(response.token));
                            Auth.currentUser = user;
                            $location.path('/');
                        }
                     })
                     .error(function() {
                         $location.path('/register');
                       alert('You must register first....');  
                     });
       }; 
    }])
    .controller('signinCtrl', ['$scope', 'Auth', 'users', 'jwtHelper', '$localStorage', '$http', '$location', 
                function($scope, Auth, users, jwtHelper, $localStorage, $http, $location){
        $scope.checkUser = function(){
            //console.log($scope.userName);
          var q = $scope.userName;
          if($scope.userName.length>=3){
              console.log('yes');
              users.checkUser({q: $scope.userName}).$promise.then(function (response) {
                    if(response){  
                        console.log(response);
                    }
              });
          }
        };
        
        $scope.signup = function(){
           $scope.newUserData = {
               userName : $scope.userName,
               email :$scope.email,
               password : $scope.password
           };
           $http.post('/api/register', $scope.newUserData)  
                    .success(function(res) {
                    if(res.type==false){
                        console.log(res.data);
                    }
                    else{
                         $localStorage.token = res.data.token;
                         console.log(res.data);
                         console.log($localStorage.token);
                         $http.post('/api/login', $scope.newUserData)
                            .success(function(response) {
                                if (response.type == false) {
                                    console.log(response);
                                } 
                                else {
                                    $localStorage.userDetails = response;
                                    console.log(response);
                                    var user = {};
                                    angular.extend(user, jwtHelper.decodeToken(response.token));
                                    Auth.currentUser = user;
                                    $location.path('/profile');
                                }
                             });
                        }
                      })
                     .error(function() {
                       alert('Try again after some time....') ; 
                     });
        };
        
        $scope.compare = function(password, confirmpassword){
            
        if($scope.password === $scope.confirmpassword){
            $scope.var = "Password matched";
        }
        else{
            $scope.var = "Password mismatched";
        }    
        };
    }])
    .factory('Auth', [ '$localStorage', '$http', '$location', 'jwtHelper', function( $localStorage, $http, $location, jwtHelper) {
        var currentUser = {};
        var currentUserDetails = $localStorage.userDetails;
        if(!!$localStorage.userDetails) {
            angular.extend(currentUser, jwtHelper.decodeToken($localStorage.userDetails.token));
        }
        return {
            currentUser : currentUser,
            currentUserDetails : currentUserDetails,
            isAuthenticated : function() {
                return !!this.currentUser && this.currentUser._id;
            },
            logout : function(user){
                return $http.post('/api/logout', user) 
                         .success(function(data) {
                          alert("YPu are successfully logged out....");
                         })
                         .error(function() {
                           alert('Sorry....') ; 
                         });
                },
            update : function(){
                return $http.put('/api/register/:id',  {id: '@id' });
            
            }
        };
}]);