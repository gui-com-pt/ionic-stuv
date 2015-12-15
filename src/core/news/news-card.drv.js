(function(){
	angular
		.module('stuv.core')
		.directive('newsCard', [function(){

			return {
				templateUrl: 'core/news/news-card.tpl.html',
				scope: {
					'article': '='
				},
				controller: ['$scope', function($scope){

				}],
				replace: false
			}
		}]);
})();