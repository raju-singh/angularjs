/*global angular*/
angular.module('myApp')
    .controller('aboutUs', function($scope){
        $scope.details = [{firstName:'John', lastName:'Singh', age:'25', city:'Chennai', country:'India'},
                            {firstName:'Ronaldo', lastName:'Singhaniya', age:'29', city:'Mumbai', country:'India'},
                            {firstName:'Rooney', lastName:'Sharma', age:'35', city:'Delhi', country:'India'},
                            {firstName:'Jalal', lastName:'joysen', age:'27', city:'Bangalore', country:'India'},
                            {firstName:'Bhalal', lastName:'patel', age:'42', city:'Kolkata', country:'India'},
                            {firstName:'Galal', lastName:'dalal', age:'29', city:'Pune', country:'India'},];
        $scope.predicate = 'firstName';
        $scope.reverse = true;
        $scope.orderName = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };
        $scope.sortOptions = [{value:"firstName", text: "Sort by First Name"},
                                {value:"age", text:"Sort by Age"}];
        $scope.sortOrder = $scope.sortOptions[0].value; 
        
    })
.filter('ageReverse', function(){
    
     return function(age) {
        age = age || '';
        var ageId = "";
        for (var i = 0; i < age.length; i++) {
          ageId = age.charAt(i) + ageId;
        }
        return ageId;
      }
});