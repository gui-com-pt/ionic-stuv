(function(){
	angular
		.module('stuv.core')
		.controller('stuv.core.event.eventUpdateCtrl', ['pi.core.app.eventSvc', '$scope', '$stateParams', function(eventSvc, $scope, $stateParams){
			var self = this,
				id = $stateParams.id;

			eventSvc.get($stateParams.id)
                .then(function(res){
                    $scope.event = res.data.event;
                });


			this.prepareRequest = function(){
				var dto = angular.copy($scope.event);
				dto.city = 'Viseu';
				return dto;
			}

			$scope.submitForm = function(){
				var model = self.prepareRequest();
				
				eventSvc.put(id, model)
					.then(function(res){
						
					}, function(res){

					});
			}
		}]);
})();