var appVersion = "0.0.0";
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
			'stuv.core.tourism',
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
            'pi.ionic',
            'pascalprecht.translate',
            'ionic.rating',
            'ngGPlaces'
			])
		.config(['ngGPlacesAPIProvider', '$cordovaAppRateProvider', '$ionicConfigProvider', 'piProvider', 'piHttpProvider', 'facebookMetaServiceProvider', '$stateProvider', '$cordovaFacebookProvider', 
			function(ngGPlacesAPIProvider, $cordovaAppRateProvider, $ionicConfigProvider, piProvider, piHttpProvider, facebookMetaServiceProvider, $stateProvider, $cordovaFacebookProvider){

				$ionicConfigProvider.tabs.position('bottom');

				var prefs = {
					language: 'pt',
					appName: 'Viseu',
					androidURL: 'market://details?id=com.guilhermecardoso.viseu'
				};
				try {
					$cordovaAppRateProvider.setPreferences(prefs);	
				}
				catch(err) {

				}
				

				ngGPlacesAPIProvider.setDefaults({
					radius: 500,
					nearbySearchKeys: ['name', 'reference', 'vicinity', 'id', 'place_id', 'icon', 'reference', 'photos', 'types'],
					 placeDetailsKeys: ['formatted_address', 'formatted_phone_number',
				        'reference', 'website', 'place_id', 'geometry', 'name', 'photos', 'formatted_phone_number',
				        'international_phone_number', 'rating', 'reviews', 'types'
				    ],
				});

				piHttpProvider.setBaseUrl('http://localhost/api');
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
					})
					.state('roadmap', {
						url: '/roadmap',
						templateUrl: 'core/roadmap.tpl.html'
					})
					.state('weather', {
						url: '/weather',
						templateUrl: 'core/weather.tpl.html',
					});
		}])
		.run(['$cordovaGoogleAnalytics', 'googlePlaceTypeEnum', '$ionicPlatform', '$ionicLoading', '$cordovaGeolocation', '$state', 'stuv.core.setupSvc', 'pi.core.app.eventCategorySvc', 'pi.core.article.articleCategorySvc', '$rootScope', 'stuv', '$log', 
			function($cordovaGoogleAnalytics, googlePlaceTypeEnum, $ionicPlatform, $ionicLoading, $cordovaGeolocation, $state, setupSvc, eventCategorySvc, articleCategorySvc, $rootScope, stuv, $log){

				function boot(){	
	    			$rootScope.booted = true;
	                $state.go("home")
				}

				$rootScope.googlePlaceTypes = googlePlaceTypeEnum;
				$rootScope.booted = false;

				$rootScope.position = {latitude:40.657155, longitude:-7.913674};
				$rootScope.currentLocation = function() {
					$cordovaGeolocation.getCurrentPosition()
						.then(function(pos) {
							return {
								latitude: position.coords.latitude,
								longitude: position.coords.longitude
							}
						})
				}

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


			    function loadDatabase() {
			    	try {
			    		window.plugins.sqlDB.copy("viseuapp.db", function() {
			            	db = $cordovaSQLite.openDB("viseuapp.db");
				        }, function(error) {
				            console.error("There was an error copying the database: " + error);
				            db = $cordovaSQLite.openDB("viseuapp.db");
				            $log.info('default sqlite database loaded.');
				        });
				    } catch(err) {
				    	$log.error(err);
				    }
				    finally {

				    }
			    }

				$ionicPlatform.ready(function() {
				    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				    // for form inputs)
				    if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				    }

				    try {
						$cordovaGoogleAnalytics.startTrackerWithId('UA-73381368-1');	
						$log.debug('Google Analytics configured')
					}
					catch(err) {
						$log.error('Error seting Google Analytics tracker id: ' + err);
					}

				    if(window.StatusBar) {
				      StatusBar.styleDefault();
				    }
				    loadDatabase();
	                setupSvc.reset();

	                stuv.init()
	            	.then(function(){
	            		boot();		
	            	}, function(){
	            		boot();
	            	});

	            	// Assign the app version
	            	try {
	            		cordova.getAppVersion(function(version) {
			                appVersion = version;
			            });	
	            	}
	            	catch(err) {
	            		$log.error('Error getting Application version: ' + err);
	            		appVersion = '0.0.1';
	            	}
	            	
	            	
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