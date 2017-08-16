var cities = [
              
              {
                  city : 'ALMADEN',
                  desc : 'The Research Center<br> 650 HARRY ROAD<br>SAN JOSE<br>CA',
                  lat : 37.211082,
                  long : -121.805586
              },
              {
                  city : 'AUSTIN',
                  desc : 'HC8<br>823 CONGRESS BUILDING<br>SUITE P-11<br>AUSTIN<br>TX',
                  lat : 30.270613,
                  long : -97.741732
              },
              {
                  city : 'BOULDER',
                  desc : '893<br>6300 DIAGONAL HWY<br>BOULDER<br>CO',
                  lat : 40.0870354591242,
                  long : -105.19299745559692
              },
              {
                  city : 'CENTRAL',
                  desc : 'SCD2<br>4600 LAKEHURST COURT<br>DUBLIN<br>OH',
                  lat : 40.07698,
                  long : -83.137697
              },
              {
                  city : 'BURLINGTON',
                  desc : 'FUEL OIL UNLOAD PUMP BLDG<br> 1000 RIVER ST<br>ESSEX JUNCTION<br>VT',
                  lat : 44.47918,
                  long :  -73.09882
              }




          ];

          //Angular App Module and Controller
          var sampleApp = angular.module('mapsApp', []);
          sampleApp.controller('MapCtrl', function ($scope) {

              var mapOptions = {
                  zoom: 4,
                  center: new google.maps.LatLng(37,-95),
                  mapTypeId: google.maps.MapTypeId.TERRAIN
              }

              $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

              $scope.markers = [];
              
              var infoWindow = new google.maps.InfoWindow();
              
              var createMarker = function (info){
                  
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(info.lat, info.long),
                      title: info.city
                  });
                  marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
                  
                  google.maps.event.addListener(marker, 'click', function(){
                      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                      infoWindow.open($scope.map, marker);
                  });
                  
                  $scope.markers.push(marker);
                  
              }  
              
              for (i = 0; i < cities.length; i++){
                  createMarker(cities[i]);
              }

              $scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
              }

          });