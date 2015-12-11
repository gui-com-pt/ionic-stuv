(function(){
	angular
		.module('stuv.core.bus')
		.controller('stuv.core.bus.busHomeCtrl', ['$scope', 'stuv.core.stuvSvc', 'leafletData', 'stuv.core.setupSvc', function($scope, stuvSvc, leafletData, setupSvc){

            angular.extend($scope, {
                center: {
                    lat: 40.704472,
                    lng: -7.949354,
                    zoom: 8
                },
                markers: {
                    main_marker: {
                        lat: 40.676032,
                        lng: -7.949354,
                        focus: true,
                        //message: "Hey, drag me if you want",
                        title: "Marker",
                        draggable: true,
                        label: {
                            message: "Hey, drag me if you want",
                            options: {
                                noHide: true
                            }
                        }
                    }
                }
            });

            var getFormatedCords = function() {
				var coords = [];

				angular.forEach($scope.stations, function(value, key){
					coords.push(value.location);
				});

				return coords;
			}

			stuvSvc.getNearest()
				.then(function(res){
					$scope.nearest = res;
				});

			$scope.getDistance = function(from) {
				return geolib.getDistance($scope.stations[0].location, from) / 1000;
			};

			$scope.lines = stuvSvc.lines;

			$scope.stations = stuvSvc.stations;
		}]);
})();