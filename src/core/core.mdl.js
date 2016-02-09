(function(){
	var coreDeps = ['ngCordova', 'ngCordova.plugins.preferences', 'ui.router', 'pi', 'ionic', 'ngCordova', 'pascalprecht.translate'];
	angular
		.module('stuv.core', coreDeps);
	angular
		.module('stuv.core.tourism', coreDeps);

	angular
		.module('stuv.core')
		.config(['$translateProvider',
			function($translateProvider) {

				$translateProvider.translations({
					'sidemenu': {
						'home': 'Home',
						'schedules': 'Schedules',
						'settings': 'Settings',
						'news': 'News',
						'events': 'Events',
						'webcam': 'Webcam'
					}
				});
			}
		]);
})();