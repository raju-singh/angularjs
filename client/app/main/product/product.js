/*global angular*/
angular.module('myApp')
    .controller('productCtrl', function($scope){
        $scope.slides = [];
        $scope.slides.push({image: 'images/img_chania.jpg', title: 'image_00', height: '275', width: '400'});
        $scope.slides.push({image: 'images/img_flower2.jpg', title: 'image_01' , height: '275', width: '400'});
        $scope.slides.push({image: 'images/img_flower.jpg', title: 'image_02' , height: '275', width: '400'});
        
    });