(function(){
    'use strict';
    /*global google*/
    /*global angular*/
angular.module('myApp')
    .controller('janCtrl', ['$scope', function($scope, $q){
        $scope.place = {};
        function initMap() {
            var latLong = {lat:13.067439 , lng:80.237617 };
            var mapOptions = {
                    center: new google.maps.LatLng(13.067439, 80.237617),
                    zoom: 12,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: true
            };
            var map;
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            var marker = new google.maps.Marker({
                position: latLong,
                map: map,
                title: 'Hello Chennai!'
            });
            var geocoder = new google.maps.Geocoder();
        
            $scope.taketoLoaction = function(){
                geocodeAddress(geocoder, map);
            };
        }
        function geocodeAddress(geocoder, resultsMap){
            var input = $scope.googleMap;
            geocoder.geocode({'address': input}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    resultsMap.setCenter(results[0].geometry.location);
                    //console.log(results);
                    var marker = new google.maps.Marker({
                        map: resultsMap,
                        zoom: 16,
                        position: results[0].geometry.location
                    });
                    $scope.place.name = results[0].formatted_address;
                    $scope.place.lat = "Latitude :  "+results[0].geometry.location.lat();
                    $scope.place.lng = "Longitude :  "+results[0].geometry.location.lng();
                } else {
                  alert('Geocode was not successful for the following reason: ' + status);
                }
              });
        }
        initMap();
    }]);
}());