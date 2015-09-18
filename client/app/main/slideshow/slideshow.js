/*global angular*/
//angular.module('myApp', ['ui.bootstrap']);
angular.module('myApp')
    .controller('slideShow', function($scope){
        $scope.myInterval = 5000;
        $scope.noWrapSlides = true;
        /*$scope.slides = [{image: 'images/img_chania.jpg', description: 'Image 00', height: '275', width: '400'},
                        {image: 'images/img_flower.jpg', description: 'Image 01' , height: '275', width: '400'},
                       {image: 'images/img_flower.jpg', description: 'Image 01' , height: '275', width: '400'},
                    ];
        */
        $scope.slides = [];
        $scope.slides.push({image: 'images/img_chania.jpg', title: 'image_00', height: '275', width: '400'});
        $scope.slides.push({image: 'images/img_flower2.jpg', title: 'image_01' , height: '275', width: '400'});
        $scope.slides.push({image: 'images/img_flower.jpg', title: 'image_02' , height: '275', width: '400'});
        
        $scope.items = [{no:'item 1'},{no:'item 2'}, {no:'item 3'}, {no:'item 4'}]
    })
    .controller('itemCtrl', function($scope){
        $scope.items = ['Item 1','Item 2','Item 3','Item 4'];
        var dismiss = $scope.data-dismiss;
        dismiss  ="modal";
        
        $scope.selected = {
            item: $scope.items[0]
        };

         $scope.ok = function () {
           $scope.selected.items;
            };
    })
    .directive('slide', function(){
        return {
           templateUrl: '/partials/main/slideshow/slider'
  };
    });