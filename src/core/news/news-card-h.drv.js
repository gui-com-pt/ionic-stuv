(function(){
	angular
		.module('stuv.core')
		.directive('newsCardH', [function(){

			return {
				templateUrl: 'core/news/news-card-h.tpl.html',
				scope: {
					'article': '='
				},
				controller: ['$scope', function($scope){

				}],
				replace: false
			}
		}]);
})();