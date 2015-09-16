(function(){
	angular
		.module('stuv.core')
		.controller('stuv.core.webcamCtrl', ['$scope', 'stuv.core.stuvSvc', 'leafletData', 'stuv.core.setupSvc', '$timeout', function($scope, stuvSvc, leafletData, setupSvc, $timeout){
			var self = this;
			this.webcamSrc = 'http://abss.dyndns.info/viseu.jpg' + '?' + new Date().getTime();;
			
			var reloadImg = function(){
				self.webcamSrc = 'http://abss.dyndns.info/viseu.jpg' + '?' + new Date().getTime();;
			}
			reloadImg();

			$timeout(function(){
				reloadImg();
				$scope.$apply();
			}, 3000);

		}]);
})();