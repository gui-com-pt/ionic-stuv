(function(){
	angular
		.module('stuv.core.tourism')
		.config(['$stateProvider',
			function($stateProvider) {

				$stateProvider
					.state('tourism', {
						url: '/turismo',
						templateUrl: 'core/tourism/tourism.tpl.html'
					})
					.state('city-contact', {
						url: '/contactos-camara-municipal',
						templateUrl: 'core/tourism/city-council-contact.tpl.html'
					})
					.state('gastronomy', {
						url: '/gastronomia',
						templateUrl: 'core/tourism/gastronomy.tpl.html'
					})
					.state('city-history', {
						url: '/historia',
						templateUrl: 'core/tourism/history.tpl.html'
					})
					.state('natural-course', {
						url: '/percursos-naturais',
						templateUrl: 'core/tourism/natural-course.tpl.html'
					})
					.state('media', {
						url: '/media',
						templateUrl: 'core/tourism/media.tpl.html',
						controller: 'stuv.core.tourism.mediaCtrl',
						controllerAs: 'ctrl'
					})
					.state('media-view', {
						url: '/media/:id',
						templateUrl: 'core/tourism/media-view.tpl.html',
						controller: 'stuv.core.tourism.mediaViewCtrl',
						controllerAs: 'ctrl'
					});
			}]);
})();