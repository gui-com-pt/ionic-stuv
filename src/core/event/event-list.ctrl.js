(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.event.eventListCtrl', ['stuv.common.responseUtilsSvc', 'pi.core.app.eventSvc', '$scope', function(responseUtilsSvc, eventSvc, $scope){
        	$scope.eventsPerDay = [];

            eventSvc.find()
                .then(function(res){
                	
                    var events = responseUtilsSvc.orderByNewest(res.data.events, 'doorTime');

                	angular.forEach(events, function(dto){
                		$scope.eventsPerDay.push(dto);
                	});
                });
        }]);
})();