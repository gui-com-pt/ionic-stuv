(function(){
	angular
		.module('stuv.core')
		.controller('stuv.core.event.eventCreateCtrl', ['pi.core.app.eventSvc', '$scope', '$cordovaImagePicker', function(eventSvc, $scope, $cordovaImagePicker){
			var self = this;
			
			$scope.showFileDialog = function(){
				$cordovaImagePicker.getPictures({})
				    .then(function (results) {
				      for (var i = 0; i < results.length; i++) {
				        console.log('Image URI: ' + results[i]);
				      }
				    }, function(error) {
				      // error getting photos
				    });
			}
			
			$scope.event = {};

			this.prepareRequest = function(){
				var dto = angular.copy($scope.event);
				dto.city = 'Viseu';
				return dto;
			}

			var submitErrorFn = function(response) {

			}

			$scope.submitForm = function(){
				try {
					var model = self.prepareRequest();
					eventSvc.post(model)
						.then(function(res){

						}, submitErrorFn);	
				}
				catch(e){
					submitErrorFn();
				}
				
			}
		}]);
})();