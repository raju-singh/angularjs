/*global angular*/
//require('textangular/dist/textAngular-sanitize.min');
angular.module('myApp', ['ngCookies', 'angular-loading-bar', 'ngStorage','ngResource', 'ngRoute', 'ngFileUpload', 'ngAnimate', 'ui.bootstrap', 
                    'mgcrea.ngStrap', 'angular-jwt', 'textAngular'])
    .config(function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode({ enabled: true,
                                requireBase: false});
    $routeProvider
        .when('/contact',
            {templateUrl: '/partials/main/contact-us/contact',
                controller: 'contactCtrl',
                /*resolve: { auth: ["$q", "Auth", function($q, Auth, $location) {
                      var userInfo = Auth.currentUserDetails;
                      if (userInfo) {
                        return $q.when(userInfo);
                      } else {
                           //$location.path('/login');
                       return $q.reject({ authenticated: false });
                      }
                    }]
                }*/
            })
        .when('/input',
            {templateUrl: '/partials/main/customInput/custominput',
                controller: 'customInput',
            })
        .when('/filter', {templateUrl: '/partials/main/aboutus/about-us', controller: 'mainCtrl',
                /*resolve: { auth: ["$q", "Auth", function($q, Auth, $location) {
                      var userInfo = Auth.currentUserDetails;
                      if (userInfo) {
                        return $q.when(userInfo);
                      } else {
                           //$location.path('/login');
                       return $q.reject({ authenticated: false });
                      }
                    }]
                }*/})
        .when('/', {templateUrl: '/partials/main/main', controller: 'mainCtrl',
                /*resolve: { auth: ["$q", "Auth", function($q, Auth, $location) {
                      var userInfo = Auth.currentUserDetails;
                      if (userInfo) {
                        return $q.when(userInfo);
                      } else {
                           //$location.path('/login');
                       return $q.reject({ authenticated: false });
                      }
                    }]
                }*/})
        .when('/login', {templateUrl: '/partials/main/user/login', controller: 'loginCtrl'})
        .when('/register', {templateUrl: '/partials/main/user/register', controller: 'signinCtrl'})
        .when('/product', {templateUrl: '/partials/main/product/product', controller:'productCtrl',
                /*resolve: { auth: ["$q", "Auth", function($q, Auth, $location) {
                      var userInfo = Auth.currentUserDetails;
                      if (userInfo) {
                        return $q.when(userInfo);
                      } else {
                           //$location.path('/login');
                       return $q.reject({ authenticated: false });
                      }
                    }]
                }*/})
        .when('/course', {templateUrl: '/partials/main/course/course', controller:'courseCtrl',
                /*resolve: { auth: ["$q", "Auth", function($q, Auth, $location) {
                      var userInfo = Auth.currentUserDetails;
                      if (userInfo) {
                        return $q.when(userInfo);
                      } else {
                           //$location.path('/login');
                       return $q.reject({ authenticated: false });
                      }
                    }]
                }*/})
        //.when('/course/:id', {templateUrl: '/partials/main/course/courseshow', controller:'showCourse'})
        .when('/add/course', {templateUrl: '/partials/main/course/addcourse', controller:'addCourse',
                /*resolve: { auth: ["$q", "Auth", function($q, Auth, $location) {
                      var userInfo = Auth.currentUserDetails;
                      if (userInfo) {
                        return $q.when(userInfo);
                      } else {
                           //$location.path('/login');
                       return $q.reject({ authenticated: false });
                      }
                    }]
                }*/})
        .when('/course/:id/edit', {templateUrl: '/partials/main/course/addcourse', controller:'addCourse',
                /*resolve: { auth: ["$q", "Auth", function($q, Auth, $location) {
                      var userInfo = Auth.currentUserDetails;
                      if (userInfo) {
                        return $q.when(userInfo);
                      } else {
                           //$location.path('/login');
                       return $q.reject({ authenticated: false });
                      }
                    }]
                }*/})
        .when('/custom', {templateUrl: '/partials/main/custom/custom', controller:'customCtrl',
                /*resolve: { auth: ["$q", "Auth", function($q, Auth, $location) {
                      var userInfo = Auth.currentUserDetails;
                      if (userInfo) {
                        return $q.when(userInfo);
                      } else {
                           //$location.path('/login');
                       return $q.reject({ authenticated: false });
                      }
                    }]
                }*/})
        .when('/pagination', {templateUrl: '/partials/main/course/coursepagination', controller:'coursePager',
                /*resolve: { auth: ["$q", "Auth", function($q, Auth, $location) {
                      var userInfo = Auth.currentUserDetails;
                      if (userInfo) {
                        return $q.when(userInfo);
                      } else {
                           //$location.path('/login');
                       return $q.reject({ authenticated: false });
                      }
                    }]
                }*/})
        .when('/profile', {templateUrl: '/partials/main/profile/profile', controller:'profileCtrl',
                /*resolve: { auth: ["$q", "Auth", function($q, Auth, $location) {
                      var userInfo = Auth.currentUserDetails;
                      if (userInfo) {
                        return $q.when(userInfo);
                      } else {
                           //$location.path('/login');
                       return $q.reject({ authenticated: false });
                      }
                    }]
                }*/})
        .when('/search', {templateUrl: '/partials/main/search/search', controller:'searchCtrl',
                /*resolve: { auth: ["$q", "Auth", function($q, Auth, $location) {
                      var userInfo = Auth.currentUserDetails;
                      if (userInfo) {
                        return $q.when(userInfo);
                      } else {
                           //$location.path('/login');
                       return $q.reject({ authenticated: false });
                      }
                    }]
                }*/})
        .when('/jan2016', {templateUrl:'/partials/main/jan2016/jan2016', controller: 'janCtrl'})
        .otherwise({redirectTo: "/" });
        
          $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        //config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);

})
 .controller('mainCtrl', function($scope, $location){
   $scope.myApp = 'Angular World'; 
   $scope.mapPage = $location.path();
  // console.log($scope.mapPage);
})
.controller('scriptCtrl', function($scope, $location){
  $scope.map = $location.path();
  if($scope.map== '/jan2016'){
     // console.log($scope.map);
      $scope.mapPage = true;
  }
});