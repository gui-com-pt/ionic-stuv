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
			'stuv.core.event',
			'stuv.core.news',
			'stuv.core.bus',
			'angularMoment',
			'stuv.common',
			'templates',
			'ionic',
			'ngCordova',
            'leaflet-directive',
            'ngFileUpload',
            'pi',
            'pi.core',
            'pi.core.app'
			])
		.config(['piProvider', 'piHttpProvider', 'facebookMetaServiceProvider', '$stateProvider', '$cordovaFacebookProvider', function(piProvider, piHttpProvider, facebookMetaServiceProvider, $stateProvider, $cordovaFacebookProvider){

			piHttpProvider.setBaseUrl('https://codigo.ovh/api');
	        facebookMetaServiceProvider.setAuthor('https://www.facebook.com/living.with.jesus');
	        facebookMetaServiceProvider.setPublisher('https://www.facebook.com/viseu.ovh');
	        facebookMetaServiceProvider.setSiteName('Viseu');
	        facebookMetaServiceProvider.setType('article');
	        facebookMetaServiceProvider.setLocale('pt_PT');
	        facebookMetaServiceProvider.setImage('https://image.freepik.com/free-vector/web-programmer_23-2147502079.jpg');

	        var appID = 123456789;
	        var version = "v2.0"; // or leave blank and default is v2.0
	        //$cordovaFacebookProvider.browserInit(appID, version);
	        piProvider.setAppId('viseu');

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
		.run(['$ionicPlatform', '$cordovaGeolocation', '$state', 'stuv.core.setupSvc', 'pi.core.app.eventSvc', 'pi.core.article.articleCategorySvc', '$rootScope', function($ionicPlatform, $cordovaGeolocation, $state, setupSvc, eventCategorySvc, articleCategorySvc, $rootScope){

			articleCategorySvc.find({take: 100})
		        .then(function(res){
		          $rootScope.articleCategories = res.data.categories;
		        });
		        
		    eventCategorySvc.find({take: 100})
		        .then(function(res){
		          $rootScope.eventCategories = res.data.categories;
		        });

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