/* global angular*/

angular.module('myApp')
    .controller('customCtrl', function($scope, $resource, demoValue, demoConstant, $http){
       $scope.customer = {name: 'Raju', address : 'Chernnai'};
      $scope.twitterResult = [];
      $scope.demo = demoValue.second;
      $scope.demoConstant = demoConstant.one;
      var counter = 0;
      $scope.num = 0;
      
      $scope.submitNumber = function(number){
          $scope.num = number;
         if($scope.twitterResult.length<=0){
          for(var i = 1; i <= $scope.num; i++ ){
              $scope.twitterResult.push(i);
          }}
      };
      $scope.ratings = {name: 'David', street: '1234 Anywhere St.'};
                       
      $scope.reset = function(){
          $scope.num = 0;
          $scope.twitterResult = [];
      };
     
      $scope.clickData = function(){
          counter++;
          $scope.ratings = { name: 'Rokosieno', street: counter + ' Cedar City Point St.'};
      };
      $scope.images = [{src: "https://www.gravatar.com/avatar/ef36a722788f5d852e2635113b2b6b84?s=128&d=identicon&r=PG"},
                        {src: "https://www.gravatar.com/avatar/ef36a722788f5d852e2635113b2b6b84?s=128&d=identicon&r=PG"}
        ];
      $scope.searchYoutube = function(){
            $http.get('https://twitter.com/search?q='+$scope.youtubeText+'&src=tyah').$promise.then(function(result){
            console.log(result);
          });
      };
   })
.directive('myCustomElement', function myCustomElement() {
       return {
          restrict: 'EA',
          replace: true,
          scope: {
              name: '@',
              street : '=',
              click: '&'
          },
          template: [
             "<div class='well'>",
             "	<h3>My Custom Element's Heading</h3>",
             "	<p>Some content here!</p>",
             "	<p>Name : {{name}}, Address : {{street}}</p>",
             '  <button class="btn btn-primary" ng-click="click()">Change Data</button>',
             "</div>"
          ].join(""),
         //controller: 'myCustomCtrl',
          link: { 
              post :function (scope, elem, attrs) {
                        var items = angular.copy(scope.action);
                        elem.bind('mouseenter', function () {
                            elem.css('background-color', '#ccc');
                        });
                        elem.bind('mouseleave', function () {
                            elem.css('background-color', '#fff');
                        });
                }
            },
       };
})
.directive("user", function() {
    return {
        restrict: 'E',
        replace: true,
        scope : {},
        link: function(scope, element, attrs) {
            scope.username = attrs.username;
            scope.avatar = attrs.avatar;
            scope.reputation = attrs.reputation;
        },
        template: '<div>Username: {{username}}, Avatar: {{avatar}}, Reputation: {{reputation}}</div>'
    };
})
.directive('linkDirective', function(){
    return {
        restrict: 'A',
        // require : 'ngModel',
        replace: true,
        link: function(scope, element, attrs){
            scope.title = attrs.text;
            element.bind('mouseenter', function(){
                element.css('color', 'green');
                element.addClass('active');
                element.attr('data-toggle', 'popover');
                element.attr('title', attrs.text);
            });
            element.bind('mouseleave', function(){
                element.css('color', 'black');
                element.removeClass('active');
                element.removeAttr('title');
            });
        }
    };
})
.value('demoValue', {first:'0123456789', second:'895625823'})
.constant('demoConstant', {all: 'Greasy Giant', one:'Greasy'});