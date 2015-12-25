(function(){
	angular
		.module('stuv.core')
		.directive('placeTypeIcon', [function(){

			return {
				scope: {
					'placeType': '='
				},
				replace: true,
				template: '<i ng-class="icon {{icon}}"></i>',
				link: function(scope, elem, attrs){
					switch(scope.placeType) {
						case 22:
							scope.icon = 'ion-medkit';
					}
				}
			}
		}]);
})();