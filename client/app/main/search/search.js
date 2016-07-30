/* global angular*/

angular.module('myApp')
    .controller('searchCtrl', function($scope, $http, users, $resource, $location){
        $scope.hello = "Hello World!!!!!!";
        $scope.items = {};
        $scope.name = "";
        $scope.repos = [];
        function listUser(){
            $http.get('https://api.github.com/users').success(function(data){
               //console.log(data);
                $scope.items = data;
               $scope.name = data.login;
               
            });
        }
        function getRepo (){
            $http.get('https://api.github.com/users/angular/repos').success(function(data){
               // console.log(data);
                $scope.repos = data;
            });   
        }
        getRepo();
      $scope.searchTwitter = function() {
          $http.get('https://twitter.com/search?q=angular%20js').success(function(data){
              console.log(data);
          }).error(function(response){
             // console.log(response);
          });
      };
        $scope.items.login="";
        $scope.onItemSelected = function(){
            console.log('selected='+$scope.items.login);
        };
        $scope.reDirect = function(){
            $location.path('/custom');
        };
        $scope.gotoUserpage= function(id){
            $location.path('/'+$scope.id);
        };
        listUser();
})

.directive('autoFocuss', function($timeout){
  return {
        restrict : 'AEC',
        replace: false,
        scope :{
            items : '=',
            prompt : '@',
            title : '@',
            model : '=',
            select: '&',
            mydirect : '&',
            userpage : '&'
        },
        template : '<div class="col-lg-6"><input type="text" class="form-control search-input" ng-model="model" placeholder="{{prompt}}" ng-keydown="selected=false"/>'
                    +'</div><div class="col-lg-3"><button class="btn btn-primary", ng-click="userpage()"> Search </button>'
                    +'</div><div class="itemszz col-lg-6" ng-hide="!model.length || selected">'
                    +'<div class="itemlist" ng-repeat="item in items | filter:model track by $index" ng-click="handleSelection(item.login)" style="cursor:pointer" ng-class="{active:isCurrent($index)}" ng-mouseenter="setCurrent($index)">'
                    +'<p ng-click="mydirect()" class="itemlistText">{{item.login}}</a>'
                    +'</div></div>',
        link: function(scope, elem, attr){
           // console.log('lnk functon');
           scope.redirect=function(){
               alert('Hello');
           };
            scope.handleSelection=function(selectedItem){
        		 scope.model=selectedItem;
        		 scope.current=0;
        		 scope.selected=true;        
        		 $timeout(function(){
        			 scope.select();
        		  },200);
    	    };
    	    scope.current=0;
            scope.selected=true;
            scope.isCurrent=function(index){
                return scope.current==index;
        	};
        	scope.setCurrent=function(index){
        	     scope.current=index;
        	};
        //	console.log(scope);
        },
    };
})
.directive('autoComplete', function($http, users){
    return {
        restrict : 'A',
        require : 'ngModel',
        link : function(scope, elem, attrs){
            elem.bind('keyup', function(){
               if(elem.val().length >=3){
                  users.searchUser({q: elem.val()}).$promise.then(function (response) {
                    if(response.length > 0){  
                        elem.css('color', '#330000');
                        elem.css( 'background-color', '#47d147');
                        if(response.length>0){
                           scope.emails = response; 
                        }
                    }
                    else{
                        elem.css('color', '#330000');
                        elem.css( 'background-color', '#e63900');
                        elem.append('<button>Clear</button>');
                     }  
                   });
               }else{
                   elem.css('color', 'black');
                }
            });
        },
    };
})
.service('users', function($http, $resource){
  return $resource('/api/user/:id', {id: '@id'}, {
    searchUser: {
				url: '/api/user/search/:q',
				method: 'GET',
				isArray : true,
				urlParams: {q: '@q'}
			},
	userList: {
	        url :'/api/user',
	        method: 'GET'
	    },
	checkUser: {
				url: '/api/user/checkUser/:q',
				method: 'GET',
			    //isArray : true,
				urlParams: {q: '@q'}
			},
    });
});