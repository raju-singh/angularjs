(function(){
    'use strict';
    /*global google*/
    /*global angular*/
angular.module('myApp')
    .controller('janCtrl', ['$scope', function($scope, $q){
        $scope.place = {
            name: '',
            lat: '',
            lng: ''
        };
        function initMap() {
            var latLong = {lat:12.9592 , lng:77.6974 };
            var mapOptions = {
                    center: new google.maps.LatLng(12.9592, 77.6974),
                    zoom: 12,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: true
            };
            var map;
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            var marker = new google.maps.Marker({
                position: latLong,
                map: map,
                title: 'Current Location'
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