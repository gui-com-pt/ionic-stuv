(function(){
	angular
		.module('stuv.core')
		.directive('viseuIntro', [function(){

			return {
				templateUrl: 'core/viseu-intro.tpl.html',
				controller: ['$scope', '$timeout', function($scope, $timeout){

					$scope.images = ['http://3.bp.blogspot.com/-sxFZ_kOXshM/Vhq4mYYwmFI/AAAAAAAAICE/XIfjUEHhXbo/s1600/Viseu.jpg', 'http://img14.deviantart.net/eeff/i/2008/338/0/9/se_viseu_by_miguelhp.jpg'];
					$scope.currentIndex = 0;

					var timer,
						sliderFunc = function() {
						  timer = $timeout(function() {
						    $scope.next();
						    timer = $timeout(sliderFunc, 5000);
						  }, 5000);
						};

					$scope.next = function() {
						$scope.currentIndex < $scope.images.length - 1 ? $scope.currentIndex++ : $scope.currentIndex = 0;
						$scope.$apply();
					};

					sliderFunc();

					$scope.$on('$destroy', function() {
					  $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
					});


				}],
				replace: true
			}
		}]);
})();