/*global angular*/
angular.module('myApp', ['ngResource', 'ngRoute'])
    .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true,
                                requireBase: false});
    $routeProvider
        .when('/contact', {templateUrl: '/partials/main/contact-us/contact', controller: 'mainCtrl'})
        .when('/filter', {templateUrl: '/partials/main/aboutus/about-us', controller: 'mainCtrl'})
        .when('/', {templateUrl: '/partials/main/main', controller: 'mainCtrl'})
        .when('/product', {templateUrl: '/partials/main/product/product', controller:'productCtrl'})
        .when('/course', {templateUrl: '/partials/main/course/course', controller:'courseCtrl'});
})
 .controller('mainCtrl', function($scope){
   $scope.myApp = 'Angular World'; 
});