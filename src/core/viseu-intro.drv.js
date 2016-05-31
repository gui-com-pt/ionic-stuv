(function(){
	angular
		.module('stuv.core')
		.directive('viseuIntro', [function(){

			return {
				templateUrl: 'core/viseu-intro.tpl.html',
				controller: ['$scope', '$timeout', function($scope, $timeout){

					var total = 8;
					$scope.images = [];
					$scope.currentIndex = 0;
 
					for (var i = 0 ; i <= total -1; i++) {
						$scope.images.push('/img/' + i + '.jpg')
					}
					
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