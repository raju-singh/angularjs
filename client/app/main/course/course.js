/*global angular*/

/*global id*/
angular.module('myApp')
    .controller('courseCtrl', function($scope, mvCourse){
        $scope.courses = mvCourse.index();

        $scope.sortOptions = [{value:'name' , text:'Sort by Course'},
                                {value:'language', text:'Sort By Language'}];
        $scope.sortOrder = $scope.sortOptions[0].value;
        
    })
    .controller('showCourse',  function($scope, $routeParams, mvCourse){
         $scope.course = mvCourse.show({ id: $routeParams.id });
    });