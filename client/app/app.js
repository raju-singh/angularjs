/*global angular*/
angular.module('myApp', ['ngCookies', 'ngStorage','ngResource', 'ngRoute', 'ngFileUpload', 'ngAnimate', 'ui.bootstrap', 'ng-fusioncharts', 
                    'mgcrea.ngStrap', 'angularUtils.directives.dirPagination', 'angular-jwt'])
    .config(function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode({ enabled: true,
                                requireBase: false});
    $routeProvider
        .when('/contact', {templateUrl: '/partials/main/contact-us/contact', controller: 'contactCtrl'})
        .when('/filter', {templateUrl: '/partials/main/aboutus/about-us', controller: 'mainCtrl'})
        .when('/', {templateUrl: '/partials/main/main', controller: 'mainCtrl'})
        .when('/login', {templateUrl: '/partials/main/user/login', controller: 'loginCtrl'})
        .when('/register', {templateUrl: '/partials/main/user/register', controller: 'signinCtrl'})
        .when('/product', {templateUrl: '/partials/main/product/product', controller:'productCtrl'})
        .when('/course', {templateUrl: '/partials/main/course/course', controller:'courseCtrl'})
        //.when('/course/:id', {templateUrl: '/partials/main/course/courseshow', controller:'showCourse'})
        .when('/add/course', {templateUrl: '/partials/main/course/addcourse', controller:'addCourse'})
        .when('/course/:id/edit', {templateUrl: '/partials/main/course/addcourse', controller:'addCourse'})
        .when('/custom', {templateUrl: '/partials/main/custom/custom', controller:'customCtrl'})
        .when('/pagination', {templateUrl: '/partials/main/course/coursepagination', controller:'coursePager'})
        .when('/profile', {templateUrl: '/partials/main/profile/profile', controller:'profileCtrl'})
        .when('/search', {templateUrl: '/partials/main/search/search', controller:'searchCtrl'});
        
          $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
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
 .controller('mainCtrl', function($scope){
   $scope.myApp = 'Angular World'; 
});