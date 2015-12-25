(function(){
	angular
		.module('stuv.core.place', ['ngCordova', 'stuv.core']);
	angular
		.module('stuv.core.place')
		.config(['$stateProvider', function($stateProvider){

			$stateProvider
				.state('place-list', {
                    url: '/place-list',
                    controller: 'stuv.core.place.placeListCtrl',
                    templateUrl: 'core/place/place-list.tpl.html'
                })
                .state('place-list-map', {
                    url: '/place-list-map',
                    controller: 'stuv.core.place.placeListMapCtrl',
                    templateUrl: 'core/place/place-list-map.tpl.html'
                })
                .state('place-view', {
                    url: '/placeo/:id',
                    controller: 'stuv.core.place.placeViewCtrl',
                    templateUrl: 'core/place/place-view.tpl.html'
                });
		}]);
})();