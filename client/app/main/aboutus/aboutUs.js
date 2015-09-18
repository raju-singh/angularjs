/*global angular*/
angular.module('myApp')
    .controller('aboutUs', function($scope){
        $scope.details = [{firstName:'John', lastName:'Singh', age:'25', city:'Chennai', country:'India'},
                            {firstName:'Ronaldo', lastName:'Singhaniya', age:'29', city:'Chennai', country:'India'},
                            {firstName:'Rooney', lastName:'Singh', age:'35', city:'Delhi', country:'India'},
                            {firstName:'Jalal', lastName:'Singh', age:'27', city:'Chennai', country:'India'},
                            {firstName:'Bhalal', lastName:'Singh', age:'42', city:'Chennai', country:'India'},
                            {firstName:'Galal', lastName:'Singh', age:'29', city:'Chennai', country:'India'},];
});