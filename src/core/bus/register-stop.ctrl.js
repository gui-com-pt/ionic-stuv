(function(){
	angular
		.module('stuv.core.bus')
		.controller('stuv.core.bus.registerStopCtrl', ['stuv.core.stuvSvc', '$scope', function(stuvSvc, $scope){
			$scope.stations = stuvSvc.stations;
		}]);
})();