/*global angular*/

/*global id*/
angular.module('myApp')
    .controller('courseCtrl', function($scope, mvCourse, $location, $alert, $routeParams, $uibModal){
        $scope.courses = mvCourse.index();
        
        console.log($scope.courses.tag);
        
        $scope.coursePagination = function(){
            
        };

        $scope.sortOptions = [{value:'name' , text:'Sort by Course'},
                                {value:'language', text:'Sort By Language'},
                                {value:'created', text:'Sort By Date'}];
        $scope.sortOrder = $scope.sortOptions[0].value;
        $scope.animationsEnabled = true;
        $scope.delete = function(course, index){
             var crss = {course, index};
             var uibModalInstance = $uibModal.open({
                        animation: 'am-fade-and-scale',
                        templateUrl: '/partials/main/course/coursedelete',
                        controller: 'deleteCourse',
                        size: 'lg',
                        resolve: {
                            deleteCourse: function () {
                                return crss;
                            }
                        }
                    });
                    event.preventDefault();
                    event.stopPropagation();
            
            
        };
        $scope.showCourse = function(course, index){
           
            var uibModalInstance = $uibModal.open({
                        animation: 'am-fade-and-scale',
                        templateUrl: '/partials/main/course/courseshow',
                        controller: 'showCourse',
                        size: 'lg',
                        resolve: {
                            showCourse: function () {
                                return course;
                            }
                        }
                    });
                    event.preventDefault();
                    event.stopPropagation();
        };
    })
    .controller('showCourse',  function($scope, $routeParams,$uibModalInstance, showCourse){
         //$scope.course = mvCourse.show({ id: $routeParams.id });
        $scope.course = showCourse;
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('addCourse', function($scope, mvCourse ,$routeParams, $location, $alert){
        if($routeParams.id){
           $scope.course = mvCourse.show({ id: $routeParams.id });
        }else{
            $scope.course = new mvCourse();
        }
       $scope.addCourse = function(created){
         console.log("submit");

            function success(response) {
                console.log("success", response)
               // console.log(response.id);
                $location.path("/course");
                $alert({
                            title: 'Congratulations!',
                            content: 'Your course "' +$scope.course.name + '" has been added.',
                            placement: 'top-right',
                            type: 'success',
                            duration: 3
                          });
            }
            function failure(response){
                console.log("failed", response);
                $location.path('/course');
                alert('Sorry.....');
                
            }
            if ($routeParams.id) {
                mvCourse.update($scope.course, success, failure,{ id: $routeParams.id });
            } else {
                mvCourse.create($scope.course, success, failure);
            }
        };
       
       $scope.cancel = function(){
           $location.path('/course/');
       }
       $scope.reset = function(){
           $scope.course = [];
       };
       $scope.delete = function(){
           $location.path('/course');
       }
    })
    .controller('deleteCourse', function($scope, $routeParams, $route, mvCourse, $alert, $location,$uibModalInstance, deleteCourse){
        $scope.courses = deleteCourse.course;
        $scope.index = deleteCourse.index;
       console.log($scope.index)
        $scope.delete = function  (index) {
            mvCourse.delete({ id: $scope.courses._id }).$promise.then(
                function (response) {
                  if(response) {
                      console.log(index);
                    $scope.course.splice(index, 1);
                    $alert({
                            content: 'You have deleted 1 course.',
                            placement: 'top-right',
                            type: 'success',
                            duration: 3
                          });
                  }
                });
                $uibModalInstance.close();
            };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });