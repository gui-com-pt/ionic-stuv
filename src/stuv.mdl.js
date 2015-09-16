(function(){
	/*
	 * Templates are cached with gulp-angular-templatecache on templates module
	 * We need to create it
	 */
	angular
		.module('templates', []);

	angular
		.module('stuv', [
			'stuv.core',
			'templates',
			'ionic',
			'ngCordova',
            'leaflet-directive',

            'pi',
            'pi.core',
            'pi.core.app'
			])
		.config(['$stateProvider', function($stateProvider){

			$stateProvider
				.state('home', {
					url: '/',
					controller: 'stuv.core.homeCtrl',
					controllerAs: 'ctrl',
					templateUrl: 'core/home.tpl.html'
				})
				.state('webcam', {
					url: '/webcam',
					controller: 'stuv.core.webcamCtrl',
					controllerAs: 'ctrl',
					templateUrl: 'core/webcam.tpl.html'
				})
				.state('register-stop', {
					url: '/',
					controller: 'stuv.core.registerStopCtrl',
					templateUrl: 'core/register-stop.tpl.html'
				})
				.state('bus-schedules', {
					url: '/bus-schedules/:id',
					controller: 'stuv.core.busSchedulesCtrl',
					templateUrl: 'core/bus-schedules.tpl.html'
				})
                .state('event-list', {
                    url: '/event-list',
                    controller: 'stuv.core.eventListCtrl',
                    controllerAs: 'ctrl',
                    templateUrl: 'core/event-list.tpl.html'
                })
                .state('event-view', {
                    url: '/event-view/:id',
                    controller: 'stuv.core.eventViewCtrl',
                    templateUrl: 'core/event-view.tpl.html'
                })
				.state('support', {
					url: '/support',
					controller: 'stuv.core.supportCtrl',
					templateUrl: 'core/support.tpl.html'
				})
                .state('place-list', {
                    url: '/sitios',
                    controller: 'stuv.core.placesListCtrl',
                    templateUrl: 'core/places-list.tpl.html'
                });
		}])
		.run(['$ionicPlatform', '$cordovaGeolocation', '$state', 'stuv.core.setupSvc', function($ionicPlatform, $cordovaGeolocation, $state, setupSvc){

			$ionicPlatform.ready(function() {
			    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			    // for form inputs)
			    if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			    }
			    if(window.StatusBar) {
			      StatusBar.styleDefault();
			    }

                setupSvc.reset();
                $state.transitionTo('home');
		  	});
		}]);
})();