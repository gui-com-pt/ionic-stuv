(function(){
	angular
		.module('stuv.core.bus', ['ngCordova', 'ngCordova.plugins.geolocation', 'ionic', 'stuv.core']);
	angular
		.module('stuv.core.bus')
		.config(['$stateProvider', function($stateProvider){

			$stateProvider
				.state('bus-home', {
                    url: '/autocarros',
                    controller: 'stuv.core.bus.busHomeCtrl',
                    templateUrl: 'core/bus/bus-home.tpl.html'
                })
                .state('register-stop', {
					url: '/',
					controller: 'stuv.core.bus.registerStopCtrl',
					templateUrl: 'core/bus/register-stop.tpl.html'
				})
				.state('bus-schedules', {
					url: '/bus-schedules/:id',
					controller: 'stuv.core.bus.busSchedulesCtrl',
					templateUrl: 'core/bus/bus-schedules.tpl.html'
				});
		}]);
})();