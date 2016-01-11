/*global angular*/

angular.module('myApp')
    .controller('loginCtrl', ['$scope', '$http','$localStorage', 'Auth', 'jwtHelper', '$location', function($scope, $http, $localStorage, Auth, jwtHelper,$location){
       $scope.signIn = function(){
           var logIn = {
               email:$scope.email,
               password :$scope.password
           };
            /* Auth.logIn(logIn).then(function(response){
                    $location.path('/profile');
                    console.log(response);
                },function(error){
                    console.log(error);
                });*/
          $http.post('/api/login', logIn)
                    .success(function(response) {
                        if (response.type == false) {
                            console.log(response);
                        } 
                        else {
                            $localStorage.userDetails = response;
                          //  console.log(response);
                           // console.log(response.access_token);
                            var user = {};
                            angular.extend(user, jwtHelper.decodeToken(response.token));
                            Auth.currentUser = user;
                            //session.setUser(user);
                            //session.setAccessToken(user.accessToken);
                            $location.path('/');
                        }
                     })
                     .error(function() {
                         $location.path('/register');
                       alert('You must register first....');  
                     });
       }; 
    }])
    .controller('signinCtrl', ['$scope', 'Auth', 'jwtHelper', '$localStorage', '$http', '$location', function($scope, Auth, jwtHelper, $localStorage, $http, $location){
        
        $scope.signup = function(){
           $scope.newUserData = {
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
        if(!!$localStorage.userDetails) {
            angular.extend(currentUser, jwtHelper.decodeToken($localStorage.userDetails.token));
        }
       /* var authentication = {
            isAuth: false,
            userName : ""
        };*/
        return {
            currentUser : currentUser,
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
            
            },
           /* register : function(formData){
                return $http.post('/api/register', formData).then(function(response){
                    return response;
                });
            },
            logIn : function(formData){
                return $http.post('/api/login', formData).then(function(response){
                    $localStorage.userDetails = response.data;
                   // var user = {};
                    $localStorage.token = response.token;
                    //angular.extend(user, jwtHelper.decodeToken(response.token));
                    //currentUser = user;
                    authentication.isAuth = true;
                    authentication.userName = formData.email;
                    
                    return response;
                });
            }*/
        };
}]);