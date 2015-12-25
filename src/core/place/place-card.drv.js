(function(){
	angular
		.module('stuv.core')
		.directive('placeCard', [function(){

			return {
				templateUrl: 'core/place/place-card.tpl.html',
				scope: {
					'place': '='
				},
				controller: ['$scope', function($scope){

				}],
				replace: false
			}
		}]);
})();