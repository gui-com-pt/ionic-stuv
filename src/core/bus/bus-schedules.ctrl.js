(function(){
	angular	
		.module('stuv.core.bus')
		.controller('stuv.core.bus.busSchedulesCtrl', ['stuv.core.stuvSvc', '$scope', '$ionicModal', '$stateParams', function(stuvSvc, $scope, $ionicModal, $stateParams){
			
			$scope.line = $stateParams.id;

			var getFormatedCords = function() {
				var coords = [];

				angular.forEach($scope.stations, function(value, key){
					coords.push(value.location);
				});

				return coords;
			};

            $scope.openModalRoute = function(trip)
            {
                stuvSvc.openModalRoute($scope.line, $scope.viewSchedule, trip);
            }

			$scope.getNearest = function(from){
				var coords = getFormatedCords();
				var n = geolib.findNearest(from, coords, 1);
				$scope.nearest = $scope.stations[parseInt(n.key)];
			}

			$scope.getDistance = function(from) {
				return geolib.getDistance($scope.stations[0].location, from) / 1000;
			};
			
			var holidays = [new Date("01/06/2015"), new Date("01/26/2015")];

			function isWeekday(date) {
				var day = date.getDay();
				return day !=0 && day !=6;
			}

			var currentDate = new Date();
			var now = new moment();

			$scope.isAvailable = function(time) {
				//var date = currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDay() + ;
				var before = new moment(now.format('YYYY-MM-DD') + " " + time, "YYYY-MM-DD HH:mm");
				
				return $scope.viewSchedule === $scope.schedule && now.isBefore(before);
			}

			if(_.contains(holidays, currentDate) || currentDate.getDay() === 0) {
				$scope.schedule = 2;
				$scope.viewSchedule = 2;
			} else if(currentDate.getDay() === 6) {
				$scope.schedule = 1;
				$scope.viewSchedule = 1;
			} else {
				$scope.schedule = 0;
				$scope.viewSchedule = 0;
			}

			$scope.stations = [
				{ name: 'Rossio', location: {latitude: 40.681565, longitude: -7.927381}},
				{ name: 'Abraveses', location: {latitude: 40.696208, longitude: -7.932960}}
			];
			$scope.lines = stuvSvc.lines;
		}])
})();