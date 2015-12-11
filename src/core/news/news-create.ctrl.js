(function(){
	angular
		.module('stuv.core')
		.controller('stuv.core.news.newsCreateCtrl', ['pi.core.app.articleSvc', '$scope', '$cordovaFileOpener2', function(newsSvc, $scope, $cordovaFileOpener2){
			var self = this;
			
			$scope.showFileDialog = function(){
				$cordovaFileOpener2.open(
			    '/sdcard/Download/gmail.apk',
			    'application/vnd.android.package-archive'
			  ).then(function() {
			      // Success!
			  }, function(err) {
			      // An error occurred. Show a message to the user
			  });	
			}
			
			$scope.news = {};

			this.prepareRequest = function(){
				var dto = angular.copy($scope.news);
				dto.city = 'Viseu';
				return dto;
			}

			var submitErrorFn = function(response) {

			}

			$scope.submitForm = function(){
				try {
					var model = self.prepareRequest();
					newsSvc.post(model)
						.then(function(res){

						}, submitErrorFn);	
				}
				catch(e){
					submitErrorFn();
				}
				
			}
		}]);
})();