/*global angular*/

  angular.module('myApp')
      .controller('slider', ['$scope', '$uibModal', '$log', function($scope, $uibModal, $modal, $log){
        $scope.images = [{src: 'images/img_chania.jpg', title: 'image_00'},
                            {src: 'images/img_flower2.jpg', title: 'image_01'},
                            {src: 'images/img_flower.jpg', title: 'image_02'}];
       // console.log($uibModal);
        $scope.animationsEnabled = true;
        $scope.myInterval = 2000;
        $scope.noWrapSlides = false;
                            
        $scope.initCarousalPopup = function(image, event){

                    var uibModalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: '/partials/main/slider/modal',
                        controller: 'ModalInstanceCtrl',
                        size: 'md',
                        resolve: {
                            slideShow: function () {
                                return $scope.images;
                            }
                        }
                    });
                    event.preventDefault();
                    event.stopPropagation();
                };
      }])
      .controller('ModalInstanceCtrl', function($scope, $timeout, $uibModalInstance, slideShow){
          
          $scope.slides = slideShow;
            $scope.slides[0].active= true;
            $scope.myInterval = 2000;
            $scope.noWrapSlides = false;
            
            $scope.ok = function () {
                $uibModalInstance.close();
            };
      
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            
      });