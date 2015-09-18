/*global angular*/angular.module('myApp', ['ngResource', 'ngRoute'])
    .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true,
                                requireBase: false});
    $routeProvider
        .when('/contact', {templateUrl: '/partials/main/contact', controller: 'mainCtrl'})
        .when('/about-us', {templateUrl: '/partials/main/aboutus/about-us', controller: 'mainCtrl'})
        .when('/', {templateUrl: '/partials/main/main', controller: 'mainCtrl'})
        .when('/product', {templateUrl: '/partials/main/product/product', controller:'productCtrl'});
})
 .controller('mainCtrl', function($scope){
   $scope.myApp = 'Angular World'; 
});