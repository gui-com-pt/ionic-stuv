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
			'stuv.core.place',
			'angularMoment',
			'stuv.common',
			'templates',
			'ionic',
			'ngCordova',
            'leaflet-directive',
            'ngFileUpload',
            'pi',
            'pi.core',
            'pi.core.app',
            'pi.core.place',
            'pi.ionic'
			])
		.config(['piProvider', 'piHttpProvider', 'facebookMetaServiceProvider', '$stateProvider', '$cordovaFacebookProvider', function(piProvider, piHttpProvider, facebookMetaServiceProvider, $stateProvider, $cordovaFacebookProvider){

			piHttpProvider.setBaseUrl('https://viseu.ovh/api');
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
					templateUrl: 'core/home.tpl.html'
				})
				.state('webcam', {
					url: '/webcam',
					controller: 'stuv.core.webcamCtrl',
					controllerAs: 'ctrl',
					templateUrl: 'core/webcam.tpl.html'
				})
				.state('login', {
					url: '/login',
					controller: 'stuv.core.loginCtrl',
					controllerAs: 'ctrl',
					templateUrl: 'core/login.tpl.html'
				})
				.state('support', {
					url: '/support',
					controller: 'stuv.core.supportCtrl',
					templateUrl: 'core/support.tpl.html'
				});
		}])
		.run(['$ionicPlatform', '$ionicLoading', '$cordovaGeolocation', '$state', 'stuv.core.setupSvc', 'pi.core.app.eventCategorySvc', 'pi.core.article.articleCategorySvc', '$rootScope', 'stuv', function($ionicPlatform, $ionicLoading, $cordovaGeolocation, $state, setupSvc, eventCategorySvc, articleCategorySvc, $rootScope, stuv){

			function boot(){	
    			$rootScope.booted = true;
                $state.go("home")
			}

			$rootScope.booted = false;

			$rootScope.$on('http:start', function(){
					$ionicLoading.show({
					template: 'show'
				});
			});

			$rootScope.$on('http:end', function(){
				$ionicLoading.hide();
			});

			

			articleCategorySvc.find({take: 100})
		        .then(function(res){
		          $rootScope.articleCategories = res.data.categories;
		        });
		        
		    eventCategorySvc.find({take: 100})
		        .then(function(res){
		          $rootScope.eventCategories = res.data.events;
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

                stuv.init()
            	.then(function(){
            		boot();		
            	}, function(){
            		boot();
            	});
		  	});

		  	$rootScope.$on('$stateChangeStart',
			    function(event, toState, toParams, fromState, fromParams){
			    	if(!$rootScope.booted) {
			    		event.preventDefault();
			    		return;
			    	}
			    	return;
			        // check if user is set
//			        if(!$rootScope.userId && toState.name !== 'login'){  
			            event.preventDefault();

			            stuv.init()
			            	.then(function(){
			            		event.currentScope.$apply(function() {
				                    $state.go("home")
				                });	
			            	})
			    }
			);

		}]);
})();