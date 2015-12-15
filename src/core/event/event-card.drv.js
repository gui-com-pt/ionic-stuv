(function(){
	angular
		.module('stuv.core')
		.directive('eventCard', [function(){

			return {
				templateUrl: 'core/event/event-card.tpl.html',
				scope: {
					'event': '='
				},
				controller: ['$scope', function($scope){

				}],
				replace: false
			}
		}]);
})();