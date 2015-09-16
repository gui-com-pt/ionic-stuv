(function(){
	angular
		.module('stuv.core')
		.controller('stuv.core.registerStopCtrl', ['stuv.core.stuvSvc', '$scope', function(stuvSvc, $scope){
			$scope.stations = stuvSvc.stations;
		}]);
})();