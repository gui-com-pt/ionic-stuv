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
(function(){
	angular
		.module('stuv.common', ['pi']);
})();
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
(function(){
	angular
		.module('stuv.core.event', ['ngCordova', 'stuv.core']);
	angular
		.module('stuv.core.event')
		.config(['$stateProvider', function($stateProvider){

			$stateProvider
				.state('event-create', {
					url: '/criar-evento',
					templateUrl: 'core/event/event-create.tpl.html',
					controller: 'stuv.core.event.eventCreateCtrl'
				})
				.state('event-list', {
                    url: '/event-list',
                    controller: 'stuv.core.event.eventListCtrl',
                    templateUrl: 'core/event/event-list.tpl.html'
                })
                .state('event-view', {
                    url: '/evento/:id',
                    controller: 'stuv.core.event.eventViewCtrl',
                    templateUrl: 'core/event/event-view.tpl.html'
                })
                .state('event-update', {
                    url: '/evento-editar/:id',
                    controller: 'stuv.core.event.eventUpdateCtrl',
                    templateUrl: 'core/event/event-update.tpl.html'
                });
		}]);
})();
(function(){
	angular
		.module('stuv.core.news', ['ngCordova', 'stuv.core']);
	angular
		.module('stuv.core.news')
		.config(['$stateProvider', function($stateProvider){

			$stateProvider
				.state('news-create', {
					url: '/criar-noticia',
					templateUrl: 'core/news/news-create.tpl.html',
					controller: 'stuv.core.news.newsCreateCtrl'
				})
				.state('news-list', {
                    url: '/news-list',
                    controller: 'stuv.core.news.newsListCtrl',
                    templateUrl: 'core/news/news-list.tpl.html'
                })
                .state('news-view', {
                    url: '/newso/:id',
                    controller: 'stuv.core.news.newsViewCtrl',
                    templateUrl: 'core/news/news-view.tpl.html'
                })
                .state('news-update', {
                    url: '/newso-editar/:id',
                    controller: 'stuv.core.news.newsUpdateCtrl',
                    templateUrl: 'core/news/news-update.tpl.html'
                });
		}]);
})();
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
var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('datetimepicker', function($rootScope, $state, $ionicPopup, $cordovaDatePicker, $timeout, $translate) {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			selectedDateTime: '=datetime',
			mode: '='
		},
		link: function(scope) {

			scope.selectDateTime = function() {

				if (!scope.selectedDateTime) {
					scope.selectedDateTime = new Date();
				}

				var options = {
					date: scope.selectedDateTime,
					mode: scope.mode
				};

				/***
				*
				* Make sure that the user's browser/device can use the datepicker functionality
				*
				***/

				if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/gi)) {

					$cordovaDatePicker.show(options).then(function(date) {
						$timeout(function() {
							scope.selectedDateTime = date;
						}, 50);
					}, function(err) {
						alert(err);
					});

				} else if ( ionic.Platform.platform() === 'windowsphone') {


					// $cordova datepicker doesn't support wp8 
					// so we'll use https://github.com/michaelfranz89/cordova-plugin-datepicker for this instead

					// If we are getting date & time, we need to do them separately.
					// First of all, get the date
					if (scope.mode === 'datetime') {
						options.mode = 'date';
					}

					datePicker.show(options, function(date) {

						if (scope.mode === 'datetime') {
							// If we are getting date & time, we now need to get the time and then combine the 2 values together
							datePicker.show({
								mode: 'time',
								date: scope.selectedDateTime
							}, function(time) {
								// Create a new date with year, month and date from the date variable and hours, minutes and seconds from the time variable
								$timeout(function() {
									scope.selectedDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
								}, 50);
							});
						} else {
							// If we're only getting the date OR time, send the value back
							$timeout(function() {
								scope.selectedDateTime = date;
							}, 50);
						}

					});

				} else {

					$translate(['directives.datepicker.DATEPICKER_ERROR_TITLE', 'directives.datepicker.DATEPICKER_ERROR'])
						.then(function(translations) {

							$ionicPopup.alert({
								title: translations['directives.datepicker.DATEPICKER_ERROR_TITLE'],
								template: translations['directives.datepicker.DATEPICKER_ERROR']
							});

						});

				}

			};

		},
		template: '<button type="button" class="button button-icon icon ion-ios-calendar-outline" ng-click="selectDateTime()"></button>'
	}
});


(function(){
	angular
		.module('stuv.common')
		.directive('piFacebookComment', function () {
		    function createHTML(href, numposts, colorscheme) {
		        return '<div class="fb-comments" ' +
		                       'data-href="' + href + '" ' +
		                       'data-numposts="' + numposts + '" ' +
		                       'data-colorsheme="' + colorscheme + '">' +
		               '</div>';
		    }

		    return {
		        restrict: 'A',
		        scope: {},
		        link: function postLink(scope, elem, attrs) {
		            attrs.$observe('pageHref', function (newValue) {
		                var href        = newValue;
		                var numposts    = attrs.numposts    || 5;
		                var colorscheme = attrs.colorscheme || 'light';

		                elem.html(createHTML(href, numposts, colorscheme));
		                FB.XFBML.parse(elem[0]);
		            });
		        }
		    };
		});
})();
(function(){
	angular
		.module('stuv.common')
		.provider('stuv.common.responseUtilsSvc', [function(){

			var getModelFromStateParams = function(names, model){
                angular.forEach(names, function(value){
                    if(!_.isUndefined($stateParams[value])) {
                        model[value] = $stateParams[value];
                    }
                });

                return model;
            };
			return {
				$get: ['$stateParams', function($stateParams){
					return {
						orderByNewest: function(items, keyDate) {
							if(!_.isArray(items) || !_.isString(keyDate)) {
								return null;
							}

							var events = _.groupBy(items, function (event) {
		                      return moment.utc(event[keyDate], 'X').startOf('day').format('DD-MM-YYYY');
		                    });

		                    events = _.map(events, function(group, day){
		                        return {
		                            day: day,
		                            results: group
		                        }
		                    });

							return events;
						},
						getModelFromStateParams: function(names, model){
		                    getModelFromStateParams(names, model);
		                },
		                getQueryModel: function(data, queryKeys, take){
		                	var take = _.isInt(take) ? take : 12,
		                		model = {skip: data.length, take: take};

		                    getModelFromStateParams(queryKeys, model);
		                    return model;
		                },
					}
				}]
			}
		}]);
})();
(function(){
	angular
		.module('stuv.common')
		.filter('youtubeEmbedUrl', function ($sce) {
		    return function(videoId) {
		      return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + videoId);
		    };
		 });
})();
(function(){
	angular
		.module('stuv.core')
		.controller('stuv.core.homeCtrl', ['$scope', 'stuv.core.stuvSvc', 'leafletData', 'stuv.core.setupSvc', 'pi.core.article.articleSvc', 'pi.core.app.eventSvc', function($scope, stuvSvc, leafletData, setupSvc, articleSvc, eventSvc){

            $scope.articles = [];
            $scope.events = [];

            articleSvc.find({})
                .then(function(res){
                    if(!_.isArray(res.data.articles) || res.data.articles.length === 0) {
                        return;
                    }

                    angular.forEach(res.data.articles, function(dto){
                        $scope.articles.push(dto);
                        var a = angular.copy(dto);
                        a.name = '123123';
                        $scope.articles.push(a);
                    });

                });
            eventSvc.find({})
                .then(function(res){
                    if(!_.isArray(res.data.events) || res.data.events.length === 0) {
                        return;
                    }

                    angular.forEach(res.data.events, function(dto){
                        $scope.events.push(dto);
                    });
            });
            angular.extend($scope, {
                center: {
                    lat: 40.704472,
                    lng: -7.949354,
                    zoom: 8
                },
                markers: {
                    main_marker: {
                        lat: 40.676032,
                        lng: -7.949354,
                        focus: true,
                        //message: "Hey, drag me if you want",
                        title: "Marker",
                        draggable: true,
                        label: {
                            message: "Hey, drag me if you want",
                            options: {
                                noHide: true
                            }
                        }
                    }
                }
            });

            var getFormatedCords = function() {
				var coords = [];

				angular.forEach($scope.stations, function(value, key){
					coords.push(value.location);
				});

				return coords;
			}

			stuvSvc.getNearest()
				.then(function(res){
					$scope.nearest = res;
				});

			$scope.getDistance = function(from) {
				return geolib.getDistance($scope.stations[0].location, from) / 1000;
			};

			$scope.lines = stuvSvc.lines;

			$scope.stations = stuvSvc.stations;
		}]);
})();

(function(){
	angular
		.module('stuv.core')
		.directive('viseuItemTemp', ['$rootScope', function($rootScope){


			return {
				template: '<i class="icon {{icon()}}"></i>{{temp()}}',
				scope: {
					'day': '='
				},
				replace: false,
				link: function(scope, elem, attrs) {

					function getIcon(code) {
						switch(code) {
							case "11":
							case "12":
								return 'ion-ios-rainy-outline';
								break;
							case "39":
								return 'ion-ios-thunderstorm-outline';
								break;
							default:
								return 'ion-ios-sunny-outline';
								break;
						}
					}

					if(!_.isString(scope.day)) {
						scope.day = 0;
					}
					scope.icon = function() {
						if(scope.day === 0) {
							if($rootScope.weather.conditionCode == "3200") {
								return getIcon($rootScope.weather.forecast[0].code);
							}
							return getIcon($rootScope.weather.conditionCode);
						}
						
						return getIcon($rootScope.weather.forecast[scope.day].code);
					};

					scope.temp = function() {
						if(scope.day === 0) {
							return $rootScope.weather.temp;
						} else {
							var forecast = $rootScope.weather.forecast[scope.day];
							return forecast.low + '/' + forecast.high;
						}	
					}
					
				}
			}
		}])
		.provider('$piYahooWeather', [function() {
			return {
				$get: ['$http', '$q', '$timeout',
					function($http, $q, $timeout) {

						return {
							forecast: function(stationId) {
								var defer = $q.defer();
								$http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D751115%20AND%20u%3D%22c%22&format=json')
									.then(function(res) {
										defer.resolve({
											temp: res.data.query.results.channel.item.condition.temp,
											conditionCode: res.data.query.results.channel.item.condition.code,
											forecast: res.data.query.results.channel.item.forecast
										});
									}, function(res) {
										defer.reject();
									});
								return defer.promise;
							}
						}
					}]
			}
		}])
		.provider('stuv', [function(){

			var _settingsDict = 'app::settings',
				_settings;

			return {

				$get: ['$cordovaPreferences', '$cordovaNetwork', '$q', '$rootScope', '$piYahooWeather', '$timeout',
					function($cordovaPreferences, $cordovaNetwork, $q, $rootScope, $piYahooWeather, $timeout){
						
						$rootScope.weather = { temp: 0, forecast: []};

						function getSettings(){
							var defer = $q.defer();
							$cordovaPreferences.show(_settingsDict)
								.success(function(res){
									defer.resolve(res);
								})
								.error(function(err){
									defer.reject(err);
								});
							return defer.promise;

						}

						function storeSetting(key, value) {
							var defer = $q.defer();
							$cordovaPreferences.store(key, value, _settingsDict)
								.success(function(res){
									defer.resolve(res);
								})
								.error(function(err){
									defer.reject(err);
								});
							return defer.promise;
						}

						function setDefaults(){
							$cordovaPreferences.store('updated', null, _settingsDict);
							$cordovaPreferences.store('locale', 'pt_PT', _settingsDict);
							$cordovaPreferences.store('theme', 'default', _settingsDict);
							_settings = {
								updated: null,
								locale: 'pt_PT',
								theme: 'default'
							}
						}

						return {
							init: function(){
								$piYahooWeather.forecast()
									.then(function(model) {
										$timeout(function() {
											$rootScope.weather = model;
										});
									});
								if($cordovaNetwork.isOffline()) {
									setDefaults();
									$rootScope.offline = true;
								} else {
									$rootScope.offline = false;
								}

								var defer = $q.defer();
								getSettings()
									.then(function(res){
										_settings = res;
										defer.resolve(res);
									}, function(res){
										setDefaults();
										defer.reject(res);
									});

								return defer.promise;
							},
							settings: function(){
								return _settings;
							}
						}

				}]
			}
		}])
		.controller('stuv.core.loginCtrl', ['$scope', 'stuv.core.stuvSvc', 'leafletData', 'stuv.core.setupSvc', '$timeout', 'stuv', function($scope, stuvSvc, leafletData, setupSvc, $timeout, stuv){
			var self = this;
			

		}]);
})();
(function(){
    angular
        .module('stuv.core')
        .factory('stuv.core.setupSvc', ['$cordovaSQLite', function($cordovaSQLite){

            var reset = function() {
                /*
                 "INSERT INTO route (short_name,number) VALUES ('Rossio - Rio de Loba - Rossio',1), ('AV. 25 DE ABRIL – PARADINHA – AV. 25 DE ABRIL',2), ('ROSSIO – VILA NOVA DO CAMPO – ROSSIO',3), ('AV. A. SAMPAIO – P. MEDRONHOSA – AV. A. SAMPAIO',4), ('ROSSIO – ESC/ TRAVASSÓS CIMA – ROSSIO',5), (6,'ROSSIO – ORGENS / STO.ESTÊVÃO – S.MARTINHO – ROSSIO',6), ('ROSSIO- MOURE MADALENA - ROSSIO',7), ('ROSSIO – MOURE CARVALHAL – ROSSIO',8), (9,'ROSSIO–CASAL PÓVOA–MUNDÃO(ESC)–CAVERNÃES– MUNDÃO(ESC)–CASAL PÓVOA-ROSSIO',9), (10,'ROSSIO – VISO SUL – ROSSIO',10), (11,'ROSSIO – FRAGOSELA – ROSSIO',11), (12,'CENTRAL CAMIONAGEM – TEIVAS - VILA CHÃ SÁ – TEIVAS - CENTRAL CAMIONAGEM',12), (13,'C.CAMIONAGEM – COIMBRÕES – C.CAMIONAGEM',13), (14,'C.CAMIONAGEM-S.J.LOUROSA-OL.BARREIROS-S.J.LOUROSA- C.CAMIONAGEM',14), (15,'C.CAMIONAGEM – VILA CHÃ SÁ – C.CAMIONAGEM',15), (16,'C.CAMIONAGEM – FIGUEIRÓ – C.CAMIONAGEM ( COUTO DE CIMA )',16), (17,'ROSSIO – QUEIRELA - ROSSIO',17), (18,'ROSSIO-PAÇÔ-LUSTOSA-PIAGET-PAÇÔ-ROSSIO',18), (19,'C.CAMIONAGEM-TORREDEITA-REAL FARMINHÃO- TORREDEITA-C.CAMIONAGEM',19), (20,'ROSSIO-B.NORAD-BIGAS-ROSSIO',20), (21,'ROSSIO-OLIVEIRA CIMA-ROSSIO',21), (22,'AGUIEIRA – FAIL – AGUIEIRA (VIA HOSPITAL)',22), (23,'C.CAMIONAGEM-TORREDEITA-BOALDEIA-TORREDEITA- C.CAMIONAGEM',23), (24,'ROSSIO-PEREIRA-SILGUEIROS-GUMIEI-CASAL-RIBAFEITA- CASAL-GUMIEI-SILGUEIROS-PEREIRA-ROSSIO',24);",
                 "INSERT INTO stop_times (trip_id,arrival_time,departure_time,stop_id,stop_sequence) VALUES (1,1,'07:00','07:01',47,NULL), (2,1,'07:10','07:11',1,''), (3,2,'07:25','',47,NULL), (4,3,'07:30','07:31',47,NULL), (5,3,'07:50','07:51',1,''), (6,4,'08:10','',47,NULL), (7,5,'08:15','08:16',47,''), (8,5,'08:35','08:36',1,''), (9,6,'08:55','',47,'');",
                 "INSERT INTO stops (station_name,parent_station,latitude,longitude) VALUES (1,'Rio de Loba',NULL,NULL,NULL), (2,'Av. 25 de Abril',NULL,NULL,NULL), (3,'Paradinha',NULL,NULL,NULL), (4,'Vila Nova Campo',NULL,NULL,NULL), (5,'Av. Alberto Sampaio',NULL,NULL,NULL), (6,'Póvoa Medronhosa',NULL,NULL,NULL), (7,'Sarzedelo',NULL,NULL,NULL), (8,'Esc/Travassós Cima',NULL,NULL,NULL), (9,'Orgens/Sto. Estevão',NULL,NULL,NULL), (10,'Sto. Martinho',NULL,NULL,NULL), (11,'Moure Madalena',NULL,NULL,NULL), (12,'Moure Carvalhal',NULL,NULL,NULL), (13,'Casal Póvoa',NULL,NULL,NULL), (14,'Mundão (Esc)',NULL,NULL,NULL), (15,'Cavernães',NULL,NULL,NULL), (16,'Mundão (Esc)',NULL,NULL,NULL), (17,'Viso Sul',NULL,NULL,NULL), (18,'Fragosela',NULL,NULL,NULL), (19,'Teivas',NULL,NULL,NULL), (20,'Teivas',NULL,NULL,NULL), (21,'Vila Chã Sá',NULL,NULL,NULL), (22,'C. Camionagem',NULL,NULL,NULL), (23,'Qta. Galo',NULL,NULL,NULL), (24,'Coimbrões',NULL,NULL,NULL), (25,'S. J. Lourosa',NULL,NULL,NULL), (26,'Ol. Barreiros',NULL,NULL,NULL), (27,'Figueiró',NULL,NULL,NULL), (28,'Masgalos',NULL,NULL,NULL), (29,'Coutocima',NULL,NULL,NULL), (30,'Queirela',NULL,NULL,NULL), (31,'Paço',NULL,NULL,NULL), (32,'Lustuosa',NULL,NULL,NULL), (33,'Piaget',NULL,NULL,NULL), (34,'Torredeita',NULL,NULL,NULL), (35,'Real Farminhão',NULL,NULL,NULL), (36,'B. Norad',NULL,NULL,NULL), (37,'Bigas',NULL,NULL,NULL), (38,'Oliveira Cima',NULL,NULL,NULL), (39,'Hospital',NULL,NULL,NULL), (40,'Fail',NULL,NULL,NULL), (41,'Boaldeia',NULL,NULL,NULL), (42,'Pereira',NULL,NULL,NULL), (43,'Silgueiros',NULL,NULL,NULL), (44,'Gumiei',NULL,NULL,NULL), (45,'Casal',NULL,NULL,NULL), (46,'Ribafeita',NULL,NULL,NULL), (47,'Rossio',NULL,NULL,NULL);",
                 "INSERT INTO trip (route_id,direction_id) VALUES (1,1,0), (2,1,1), (3,1,0), (4,1,1), (5,1,0), (6,1,1);"


                 "INSERT INTO stop_times (trip_id,arrival_time,departure_time,stop_id,stop_sequence) VALUES (1,1,'07:00','07:01',47,NULL), (2,1,'07:10','07:11',1,''), (3,2,'07:25','',47,NULL), (4,3,'07:30','07:31',47,NULL), (5,3,'07:50','07:51',1,''), (6,4,'08:10','',47,NULL), (7,5,'08:15','08:16',47,''), (8,5,'08:35','08:36',1,''), (9,6,'08:55','',47,'');",
                 "INSERT INTO stops (station_name,parent_station,latitude,longitude) VALUES (1,'Rio de Loba',NULL,NULL,NULL), (2,'Av. 25 de Abril',NULL,NULL,NULL), (3,'Paradinha',NULL,NULL,NULL), (4,'Vila Nova Campo',NULL,NULL,NULL), (5,'Av. Alberto Sampaio',NULL,NULL,NULL), (6,'Póvoa Medronhosa',NULL,NULL,NULL), (7,'Sarzedelo',NULL,NULL,NULL), (8,'Esc/Travassós Cima',NULL,NULL,NULL), (9,'Orgens/Sto. Estevão',NULL,NULL,NULL), (10,'Sto. Martinho',NULL,NULL,NULL), (11,'Moure Madalena',NULL,NULL,NULL), (12,'Moure Carvalhal',NULL,NULL,NULL), (13,'Casal Póvoa',NULL,NULL,NULL), (14,'Mundão (Esc)',NULL,NULL,NULL), (15,'Cavernães',NULL,NULL,NULL), (16,'Mundão (Esc)',NULL,NULL,NULL), (17,'Viso Sul',NULL,NULL,NULL), (18,'Fragosela',NULL,NULL,NULL), (19,'Teivas',NULL,NULL,NULL), (20,'Teivas',NULL,NULL,NULL), (21,'Vila Chã Sá',NULL,NULL,NULL), (22,'C. Camionagem',NULL,NULL,NULL), (23,'Qta. Galo',NULL,NULL,NULL), (24,'Coimbrões',NULL,NULL,NULL), (25,'S. J. Lourosa',NULL,NULL,NULL), (26,'Ol. Barreiros',NULL,NULL,NULL), (27,'Figueiró',NULL,NULL,NULL), (28,'Masgalos',NULL,NULL,NULL), (29,'Coutocima',NULL,NULL,NULL), (30,'Queirela',NULL,NULL,NULL), (31,'Paço',NULL,NULL,NULL), (32,'Lustuosa',NULL,NULL,NULL), (33,'Piaget',NULL,NULL,NULL), (34,'Torredeita',NULL,NULL,NULL), (35,'Real Farminhão',NULL,NULL,NULL), (36,'B. Norad',NULL,NULL,NULL), (37,'Bigas',NULL,NULL,NULL), (38,'Oliveira Cima',NULL,NULL,NULL), (39,'Hospital',NULL,NULL,NULL), (40,'Fail',NULL,NULL,NULL), (41,'Boaldeia',NULL,NULL,NULL), (42,'Pereira',NULL,NULL,NULL), (43,'Silgueiros',NULL,NULL,NULL), (44,'Gumiei',NULL,NULL,NULL), (45,'Casal',NULL,NULL,NULL), (46,'Ribafeita',NULL,NULL,NULL), (47,'Rossio',NULL,NULL,NULL);",
                 "INSERT INTO trip (route_id,direction_id) VALUES (1,1,0), (2,1,1), (3,1,0), (4,1,1), (5,1,0), (6,1,1);"
                 */
                var queries = [
                    "INSERT INTO route (short_name,number) VALUES ('Rossio - Rio de Loba - Rossio',1)"
                ];

                var getDb = function() {
                    if (window.cordova) {
                        return $cordovaSQLite.openDB("my.db"); //device
                    } else {
                        return window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
                    }
                };
                var db = getDb();
                db.transaction(function(tx) {
                    var tables = ['route', 'stop_times', 'stop', 'trip'];

                    angular.forEach(tables, function(value){
                        tx.executeSql('DROP TABLE IF EXISTS ' + value);
                    });

                    var tables = [
                        'CREATE TABLE trip (id INTEGER PRIMARY KEY, route_id INTEGER, direction_id NUMERIC);',
                        'CREATE TABLE stops (id INTEGER PRIMARY KEY, station_name TEXT NOT NULL, parent_station	INTEGER, latitude NUMERIC, longitude NUMERIC);',
                        'CREATE TABLE stop_times (id INTEGER PRIMARY KEY, trip_id INTEGER, arrival_time	TEXT, departure_time TEXT, stop_id INTEGER, stop_sequence TEXT);',
                        'CREATE TABLE route (id INTEGER PRIMARY KEY, short_name	TEXT, number INTEGER);',
                        'CREATE TABLE holiday (id INTEGER PRIMARY KEY, description TEXT, when TEXT);'
                    ];
                    var list = function(object) {
                        for(var key in object) {
                            console.log(key);
                        }
                    }

                    angular.forEach(tables, function(value){
                        tx.executeSql(value, function(tx, res) {

                        }, function(e) {
                            console.log(tables);
                            console.log('TABLE - BEGIN');
                            console.log("ERROR: " + list(e));
                            console.log('TABLE - END');
                        });
                    });

                    angular.forEach(queries, function(value){
                        tx.executeSql(value, function(tx, res) {
                            console.log("insertId: " + res.insertId + " -- probably 1");
                            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

                        }, function(e) {
                            console.log('QUERY - BEGIN');
                            console.log("ERROR: " + list(e));
                            console.log('QUERY - END');
                        });
                    });
                });
            };

            return {
                reset: reset
            }
        }]);
})();
(function(){
	angular
		.module('stuv.core.stationViewCtrl', [function(){

		}]);
})();
(function(){
	angular
		.module('stuv.core')
		.controller('stuv.core.supportCtrl', [function(){

		}]);
})();
(function(){
	angular
		.module('stuv.core')
		.directive('viseuIntro', [function(){

			return {
				templateUrl: 'core/viseu-intro.tpl.html',
				controller: ['$scope', '$timeout', function($scope, $timeout){

					var total = 8;
					$scope.images = [];
					$scope.currentIndex = 0;
 
					for (var i = 0 ; i <= total -1; i++) {
						$scope.images.push('/img/' + i + '.jpg')
					}
					
					var timer,
						sliderFunc = function() {
						  timer = $timeout(function() {
						    $scope.next();
						    timer = $timeout(sliderFunc, 5000);
						  }, 5000);
						};

					$scope.next = function() {
						$scope.currentIndex < $scope.images.length - 1 ? $scope.currentIndex++ : $scope.currentIndex = 0;
						$scope.$apply();
					};

					sliderFunc();

					$scope.$on('$destroy', function() {
					  $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
					});


				}],
				replace: true
			}
		}]);
})();
(function(){
	angular
		.module('stuv.core')
		.controller('stuv.core.webcamCtrl', ['$scope', 'stuv.core.stuvSvc', 'leafletData', 'stuv.core.setupSvc', '$timeout', function($scope, stuvSvc, leafletData, setupSvc, $timeout){
			var self = this;
			this.webcamSrc = 'http://abss.dyndns.info/viseu.jpg' + '?' + new Date().getTime();;
			
			var reloadImg = function(){
				self.webcamSrc = 'http://abss.dyndns.info/viseu.jpg' + '?' + new Date().getTime();;
			}
			reloadImg();

			$timeout(function(){
				reloadImg();
				$scope.$apply();
			}, 3000);

		}]);
})();
(function(){
	angular
		.module('stuv')
		  .directive('piScroller', ['$timeout', function($timeout) {
		      return {
		        restrict: 'E',
		        template: '<div class="pi-scroller" ng-transclude></div>',
		        replace: true,
		        transclude: true,

		        compile: function(element, attr) {
		          return function($scope, $element, $attr) {

		            var el = $element[0];
		            angular.element(el).bind("scroll", function(){
		              var left = $element[0].scrollLeft;
		              // console.log($element.childNodes);
		            });


		          }
		        },
		      }
		    }
		])
		.directive('piCardH', ['$rootScope', function($rootScope) {
		      return {
		        restrict: 'E',
		        template: '<div class="pi-card-h" ng-transclude></div>',
		        replace: true,
		        transclude: true,
		        scope: {
		          desc: '@',
		          image: '@',
		          index: '@'
		        },
		        link: function(scope, element, attrs){
		          var img = angular.element("<img class='pi-scroller-img' src='"+attrs.image+"' />");
		          element.append(img);
		          element.append('<div class="pi-scroller-label">'+attrs.desc+'</div>');
		          var animationClass = 'pi-scroller-card-animated-' + attrs.index.toString();
		          element.addClass(animationClass);

		        },

		      }
		    }
		]);

})();
(function(){
	angular
		.module('stuv.core.bus')
		.controller('stuv.core.bus.busHomeCtrl', ['$scope', 'stuv.core.stuvSvc', 'leafletData', 'stuv.core.setupSvc', function($scope, stuvSvc, leafletData, setupSvc){

            angular.extend($scope, {
                center: {
                    lat: 40.704472,
                    lng: -7.949354,
                    zoom: 8
                },
                markers: {
                    main_marker: {
                        lat: 40.676032,
                        lng: -7.949354,
                        focus: true,
                        //message: "Hey, drag me if you want",
                        title: "Marker",
                        draggable: true,
                        label: {
                            message: "Hey, drag me if you want",
                            options: {
                                noHide: true
                            }
                        }
                    }
                }
            });

            var getFormatedCords = function() {
				var coords = [];

				angular.forEach($scope.stations, function(value, key){
					coords.push(value.location);
				});

				return coords;
			}

			stuvSvc.getNearest()
				.then(function(res){
					$scope.nearest = res;
				});

			$scope.getDistance = function(from) {
				return geolib.getDistance($scope.stations[0].location, from) / 1000;
			};

			$scope.lines = stuvSvc.lines;

			$scope.stations = stuvSvc.stations;
		}]);
})();
(function(){
	angular	
		.module('stuv.core.bus')
		.controller('stuv.core.bus.busSchedulesCtrl', ['stuv.core.stuvSvc', '$scope', '$ionicModal', '$stateParams', function(stuvSvc, $scope, $ionicModal, $stateParams){
			
			$scope.line = $stateParams.id;

			var getFormatedCords = function() {
				var coords = [];

				angular.forEach($scope.stations, function(value, key){
					coords.push(value.location);
				});

				return coords;
			};

            $scope.openModalRoute = function(trip)
            {
                stuvSvc.openModalRoute($scope.line, $scope.viewSchedule, trip);
            }

			$scope.getNearest = function(from){
				var coords = getFormatedCords();
				var n = geolib.findNearest(from, coords, 1);
				$scope.nearest = $scope.stations[parseInt(n.key)];
			}

			$scope.getDistance = function(from) {
				return geolib.getDistance($scope.stations[0].location, from) / 1000;
			};
			
			var holidays = [new Date("01/06/2015"), new Date("01/26/2015")];

			function isWeekday(date) {
				var day = date.getDay();
				return day !=0 && day !=6;
			}

			var currentDate = new Date();
			var now = new moment();

			$scope.isAvailable = function(time) {
				//var date = currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDay() + ;
				var before = new moment(now.format('YYYY-MM-DD') + " " + time, "YYYY-MM-DD HH:mm");
				
				return $scope.viewSchedule === $scope.schedule && now.isBefore(before);
			}

			if(_.contains(holidays, currentDate) || currentDate.getDay() === 0) {
				$scope.schedule = 2;
				$scope.viewSchedule = 2;
			} else if(currentDate.getDay() === 6) {
				$scope.schedule = 1;
				$scope.viewSchedule = 1;
			} else {
				$scope.schedule = 0;
				$scope.viewSchedule = 0;
			}

			$scope.stations = [
				{ name: 'Rossio', location: {latitude: 40.681565, longitude: -7.927381}},
				{ name: 'Abraveses', location: {latitude: 40.696208, longitude: -7.932960}}
			];
			$scope.lines = stuvSvc.lines;
		}])
})();
(function(){
	angular
		.module('stuv.core.bus')
		.controller('stuv.core.bus.registerStopCtrl', ['stuv.core.stuvSvc', '$scope', function(stuvSvc, $scope){
			$scope.stations = stuvSvc.stations;
		}]);
})();
(function(){
    angular
        .module('stuv.core.bus')
        .provider('stuv.core.schedulesSvc', [function(){
            
            return {
                $get: ['$q', '$rootScope', '$ionicModal', '$http', function($q, $rootScope, $ionicModal, $http) {
                     function getNearest(dto) {
                        var defer = $q.defer();
                        $http.get('/routes-nearest')
                            .then(function(res) {
                                defer.resolve(promise.data);
                            }, function(err) {
                                defer.reject(err);
                            });

                        return defer.promise;
                    }

                    function getStations(dto) {
                        var defer = $q.defer();
                        $http.get('/stations')
                            .then(function(res) {
                                defer.resolve(promise.data);
                            }, function(err) {
                                defer.reject(err);
                            });

                        return defer.promise;
                    }
                    return {
                        getStations: function(dto){
                            return getStations(dto);
                        },
                        getNearest: function(dto) {
                            return getNearest(dto);
                        }
                    }
                }]
            }
        }])
        .factory('stuv.core.stuvSvc', ['$cordovaGeolocation', '$q', '$rootScope', '$ionicModal', function($cordovaGeolocation, $q, $rootScope, $ionicModal){

            var getFormatedCords = function() {
                var coords = [];

                angular.forEach(stations, function(value, key){
                    coords.push(value.location);
                });

                return coords;
            }

            var $scope = $rootScope.$new();

            $ionicModal.fromTemplateUrl('core/bus/schedule-modal.tpl.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.closeModal = closeModal;
            });

            var openModal = function(line, schedule, trip) {
                $scope.route = lines[line].schedules[schedule].routes[trip];
                $scope.modal.show();
            };

            var closeModal = function() {
                $scope.modal.hide();
            };

            var nearest = {};

            var getNearest = function(from) {
                var def = $q.defer();

                $cordovaGeolocation
                    .getCurrentPosition()
                    .then(function (position) {
                        var lat  = position.coords.latitude
                        var long = position.coords.longitude
                        var from = {latitude: lat, longitude: long};
                        var coords = getFormatedCords();
                        var n = geolib.findNearest(from, coords, 1);
                        nearest = stations[parseInt(n.key)];
                        def.resolve(nearest);
                    }, function(err) {
                        // error
                    });
                return def.promise;
            };

            var init = function() {
            };

            var stations = [
                { id: 0, name: 'Rio de Loba', location: {latitude: 40.676032, longitude: -7.923519}},
                { id: 1, name: 'Rossio', location: {latitude: 40.681565, longitude: -7.927381}},
                { id: 2, name: 'Av. Alberto Sampaio', location: {latitude: 40.696208, longitude: -7.932960}},
                { id: 3, name: 'Marzovelos', location: {latitude: 40.704472, longitude: -7.949354}},
                { id: 4, name: 'P. Medronhosa', location: {latitude: 40.704472, longitude: -7.949354}},
                { id: 5, name: 'Sarzedelo', location: {latitude: 40.704472, longitude: -7.949354}},
                { id: 6, name: 'Trav. Cima', location: {latitude: 40.704472, longitude: -7.949354}}
            ];

            var lines = [{
                number: 1,
                name: 'Nº 1 ROSSIO-RIO LOBA-ROSSIO',
                schedules: [
                    {
                        name: "Dias Úteis",
                        type: 'businessDay',
                        routes: [
                            {
                                departure: '07:10',
                                departureStation: stations[1],
                                arrive: '07:25',
                                arriveStation: stations[0],
                                routes: [
                                    {
                                        departure: '07:10',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '07:25',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '07:30',
                                departureStation: stations[0],
                                arrive: '07:50',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '07:30',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '07:50',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '08:10',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '08:15',
                                departureStation: stations[0],
                                arrive: '08:35',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '08:15',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '08:35',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '08:55',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '08:55',
                                departureStation: stations[0],
                                arrive: '09:10',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '08:55',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '09:10',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '09:30',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '09:30',
                                departureStation: stations[0],
                                arrive: '09:45',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '09:30',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '09:45',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '10:00',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '10:30',
                                departureStation: stations[0],
                                arrive: '10:40',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '10:30',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '10:40',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '10:55',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '12:00',
                                departureStation: stations[0],
                                arrive: '12:15',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '12:00',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '12:15',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '12:35',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '12:35',
                                departureStation: stations[0],
                                arrive: '12:50',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '12:35',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '12:50',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '13:10',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '13:10',
                                departureStation: stations[0],
                                arrive: '13:25',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '13:10',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '13:25',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '13:45',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '13:45',
                                departureStation: stations[0],
                                arrive: '14:00',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '13:45',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '14:00',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '14:20',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '15:30',
                                departureStation: stations[0],
                                arrive: '15:45',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '15:30',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '15:45',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '16:00',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '16:35',
                                departureStation: stations[0],
                                arrive: '16:50',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '16:35',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '16:50',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '17:10',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '17:15',
                                departureStation: stations[0],
                                arrive: '17:30',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '17:15',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '17:30',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '17:55',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '18:00',
                                departureStation: stations[0],
                                arrive: '18:15',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '18:00',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '18:15',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '18:35',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '18:35',
                                departureStation: stations[0],
                                arrive: '18:50',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '18:35',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '18:50',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '19:10',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '19:15',
                                departureStation: stations[0],
                                arrive: '19:30',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '19:15',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '19:30',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '19:45',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '19:50',
                                departureStation: stations[0],
                                arrive: '20:05',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '19:50',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '20:05',
                                        departureStation: stations[1]
                                    }]
                            }
                        ]
                    },
                    {
                        name: "Sábados",
                        type: 'weekend',
                        routes: [
                            {
                                departure: '07:40',
                                departureStation: stations[0],
                                arrive: '07:55',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '07:40',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '07:55',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '08:15',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '08:15',
                                departureStation: stations[0],
                                arrive: '08:30',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '08:15',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '08:30',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '08:50',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '08:50',
                                departureStation: stations[0],
                                arrive: '09:05',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '08:50',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '09:05',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '09:25',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '10:25',
                                departureStation: stations[0],
                                arrive: '10:40',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '10:25',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '10:40',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '11:00',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '11:35',
                                departureStation: stations[0],
                                arrive: '11:50',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '11:35',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '11:50',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '12:10',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '13:10',
                                departureStation: stations[0],
                                arrive: '13:25',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '13:10',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '13:25',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '13:45',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '14:10',
                                departureStation: stations[0],
                                arrive: '14:25',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '14:10',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '14:25',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '14:40',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '18:25',
                                departureStation: stations[0],
                                arrive: '18:40',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '18:25',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '18:40',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '18:55',
                                        departureStation: stations[0]
                                    }]
                            }
                        ]
                    },
                    {
                        name: "Feriados",
                        type: 'holiday',
                        routes: [
                            {
                                departure: '07:10',
                                departureStation: stations[1],
                                arrive: '07:25',
                                arriveStation: stations[0],
                                routes: [
                                    {
                                        departure: '07:10',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '07:25',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '07:30',
                                departureStation: stations[0],
                                arrive: '07:50',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '07:30',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '07:50',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '08:10',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '08:15',
                                departureStation: stations[0],
                                arrive: '08:35',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '08:15',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '08:35',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '08:55',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '08:55',
                                departureStation: stations[0],
                                arrive: '09:10',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '08:55',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '09:10',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '09:30',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '09:30',
                                departureStation: stations[0],
                                arrive: '09:45',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '09:30',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '09:45',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '10:00',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '10:30',
                                departureStation: stations[0],
                                arrive: '10:40',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '10:30',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '10:40',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '10:55',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '12:00',
                                departureStation: stations[0],
                                arrive: '12:15',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '12:00',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '12:15',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '12:35',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '12:35',
                                departureStation: stations[0],
                                arrive: '12:50',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '12:35',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '12:50',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '13:10',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '13:10',
                                departureStation: stations[0],
                                arrive: '13:25',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '13:10',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '13:25',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '13:45',
                                        departureStation: stations[0]
                                    }]
                            }
                        ]
                    }]
            },
            {
                number: 4,
                name: 'Nº 4 AV.A.SAMPAIO-P.MEDRONHOSA-AV.A.SAMPAIO',
                schedules: [
                    {
                        name: "Dias Úteis",
                        type: 'businessDay',
                        routes: [
                            {
                                departure: '07:40',
                                departureStation: stations[5],
                                arrive: '08:05',
                                arriveStation: stations[2],
                                routes: [
                                    {
                                        departure: '07:40',
                                        departureStation: stations[5]
                                    },
                                    {
                                        departure: '07:45',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '07:55',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '08:05',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '08:10',
                                departureStation: stations[2],
                                arrive: '08:30',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '08:10',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '08:20',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '08:30',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '08:40',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '08:50',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '09:00',
                                departureStation: stations[2],
                                arrive: '09:25',
                                arriveStation: stations[5],
                                routes: [
                                    {
                                        departure: '09:00',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '09:10',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '09:20',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '09:25',
                                        departureStation: stations[5]
                                    },
                                    {
                                        departure: '09:30',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '09:40',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '09:50',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '10:20',
                                departureStation: stations[2],
                                arrive: '10:40',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '10:20',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '10:30',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '10:40',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '10:50',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '11:00',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '12:05',
                                departureStation: stations[2],
                                arrive: '12:20',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '12:05',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '12:10',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '12:20',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '12:30',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '12:40',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '12:40',
                                departureStation: stations[2],
                                arrive: '13.05',
                                arriveStation: stations[5],
                                routes: [
                                    {
                                        departure: '12:40',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '12:50',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '13:00',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '13:05',
                                        departureStation: stations[5]
                                    },
                                    {
                                        departure: '13:10',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '13:20',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '13:30',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '13:40',
                                departureStation: stations[2],
                                arrive: '14:00',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '13:40',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '13:50',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '14:00',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '14:10',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '14:20',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '16:30',
                                departureStation: stations[2],
                                arrive: '16:55',
                                arriveStation: stations[5],
                                routes: [
                                    {
                                        departure: '16:30',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '16:40',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '16:50',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '16:55',
                                        departureStation: stations[5]
                                    },
                                    {
                                        departure: '17:00',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '17:10',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '17:20',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '17:25',
                                departureStation: stations[2],
                                arrive: '07:45',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '17:25',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '17:35',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '17:45',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '17:55',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '18:05',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '18:10',
                                departureStation: stations[2],
                                arrive: '18:35',
                                arriveStation: stations[5],
                                routes: [
                                    {
                                        departure: '18:10',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '18:20',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '18:30',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '18:35',
                                        departureStation: stations[5]
                                    },
                                    {
                                        departure: '18:40',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '18:50',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '19.00',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '19:15',
                                departureStation: stations[2],
                                arrive: '19:35',
                                arriveStation: stations[5],
                                routes: [
                                    {
                                        departure: '19:15',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '19:25',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '19:30',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '19:35',
                                        departureStation: stations[5]
                                    }]
                            }
                        ]
                    },
                    {
                        name: "Sábados",
                        type: 'weekend',
                        routes: [
                            {
                                departure: '07:25',
                                departureStation: stations[2],
                                arrive: '07:40',
                                arriveStation: stations[5],
                                routes: [
                                    {
                                        departure: '07:25',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '07:30',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '07:35',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '07:40',
                                        departureStation: stations[5]
                                    },
                                    {
                                        departure: '07:45',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '07:50',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '08:00',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '08:30',
                                departureStation: stations[2],
                                arrive: '08:40',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '08:30',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '08:35',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '08:40',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '08:45',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '08:55',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '11:05',
                                departureStation: stations[2],
                                arrive: '11:20',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '11:05',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '11:15',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '11:20',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '11:25',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '11:35',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '12:40',
                                departureStation: stations[2],
                                arrive: '12:55',
                                arriveStation: stations[5],
                                routes: [
                                    {
                                        departure: '12:40',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '12:45',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '12:50',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '12:55',
                                        departureStation: stations[5]
                                    },
                                    {
                                        departure: '13:00',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '13:05',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '13:10',
                                        departureStation: stations[4]
                                    }]
                            },
                            {
                                departure: '13:40',
                                departureStation: stations[2],
                                arrive: '13:50',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '13:40',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '13:45',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '13:50',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '13:55',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '14:05',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '16:55',
                                departureStation: stations[2],
                                arrive: '17:10',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '16:55',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '17:00',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '17:10',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '17:15',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '17:25',
                                        departureStation: stations[2]
                                    }]
                            }
                        ]
                    },
                    {
                        name: "Feriados",
                        type: 'holiday',
                        routes: [
                            {
                                departure: '09:00',
                                departureStation: stations[2],
                                arrive: '09:10',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '09:00',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '09:05',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '09:10',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '09:15',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '09:25',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '11:45',
                                departureStation: stations[2],
                                arrive: '11:55',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '11:45',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '11:50',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '11:55',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '12:00',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '12:10',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '13:10',
                                departureStation: stations[2],
                                arrive: '13:20',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '13:10',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '13:15',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '13:20',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '13:25',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '13:35',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '17:00',
                                departureStation: stations[2],
                                arrive: '07:15',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '17:00',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '17:05',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '17:15',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '17:20',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '17:30',
                                        departureStation: stations[2]
                                    }]
                            }
                        ]
                    }]
            }];

            init();
            return {
                start: init,
                stations: stations,
                lines: lines,
                nearest: nearest,
                getNearest: getNearest,
                openModalRoute: function(line, schedule, trip) {
                    return openModal(line, schedule, trip);
                }
            }
        }])
})();
(function(){
	angular
		.module('stuv.core')
		.directive('eventCard', [function(){

			return {
				templateUrl: 'core/event/event-card.tpl.html',
				scope: {
					'event': '='
				},
				controller: ['$scope', function($scope){

				}],
				replace: true
			}
		}]);
})();
(function(){
	angular
		.module('stuv.core')
		.controller('stuv.core.event.eventCreateCtrl', ['pi.core.app.eventSvc', '$scope', '$cordovaImagePicker', function(eventSvc, $scope, $cordovaImagePicker){
			var self = this;
			
			$scope.showFileDialog = function(){
				$cordovaImagePicker.getPictures({})
				    .then(function (results) {
				      for (var i = 0; i < results.length; i++) {
				        console.log('Image URI: ' + results[i]);
				      }
				    }, function(error) {
				      // error getting photos
				    });
			}
			
			$scope.event = {};

			this.prepareRequest = function(){
				var dto = angular.copy($scope.event);
				dto.city = 'Viseu';
				return dto;
			}

			var submitErrorFn = function(response) {

			}

			$scope.submitForm = function(){
				try {
					var model = self.prepareRequest();
					eventSvc.post(model)
						.then(function(res){

						}, submitErrorFn);	
				}
				catch(e){
					submitErrorFn();
				}
				
			}
		}]);
})();
(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.event.eventListCtrl', ['stuv.common.responseUtilsSvc', 'pi.core.app.eventSvc', '$scope', '$ionicModal', '$q', '$rootScope', function(responseUtilsSvc, eventSvc, $scope, $ionicModal, $q, $rootScope){
            var modalDefer,
                openModal = function() {
                    modalDefer = $q.defer();
                    $scope.modalScope.modal.show();
                    return modalDefer.promise;
                },
                closeModal = function(model) {
                    var res = $scope.modalScope.modal.hide();
                    modalDefer.resolve(model);
                },
                self = this,
                queryKeys = ['name', 'categoryId'];

        	$scope.eventsPerDay = [];
            $scope.cachedEvents = [];
            $scope.queryModel = {
                busy: false,
                noResult: false,
                data: []
            };

            $scope.modalScope = $rootScope.$new();

            $ionicModal.fromTemplateUrl('core/event/event-list-filter.tpl.html', {
                scope: $scope.modalScope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalScope.modal = modal;
                $scope.modalScope.closeModal = closeModal;
            });

            $scope.modalScope.queryModel = {};

            $scope.modalScope.filterByCategory = function(id){
                $scope.modalScope.queryModel.text = null;
                $scope.modalScope.queryModel.categoryId = id;
                closeModal($scope.modalScope.queryModel);
            }

            $scope.modalScope.filterByText = function(){
                $scope.queryModel.categoryId = null;
                closeModal($scope.modalScope.queryModel);
            }

            $scope.$on('$destroy', function(){
                $scope.queryModel.data = [];
                $scope.cachedArticles = [];
                resetModel();
            });

            $scope.filter = function(){
                openModal()
                    .then(function(model){
                        reset();
                        find(model);
                    });
            }

            $scope.findMore = function(){
                var model = responseUtils.getQueryModel(queryKeys);
                find(model);
            }

            $scope.reset = function(){
                reset();
                find({});
            }

            var resetModel = function(){
                $scope.queryModel = {
                    text: null,
                    categoryId: null
                };    
            }

            var find = function(model) {
                $scope.cachedEvents = $scope.eventsPerDay;

                $scope.queryModel.busy = true;
              
                    eventSvc.find()
                    .then(function(res){
                        $scope.queryModel.busy = false;

                        if(!_.isArray(res.data.events) || res.data.events === 0) {
                            $scope.queryModel.noResult = true;
                            $scope.queryModel.busy = false;
                            return;
                        }
                        
                        var events = responseUtilsSvc.orderByNewest(res.data.events, 'doorTime');

                        angular.forEach(events, function(dto){
                            $scope.eventsPerDay.push(dto);
                        });
                        $scope.queryModel.noResult = false;
                    }, function(res){
                        $scope.queryModel.busy = false;
                    });    
               
                
            };

            find({});
        }]);
})();
(function(){
	angular
		.module('stuv.core')
		.controller('stuv.core.event.eventUpdateCtrl', ['pi.core.app.eventSvc', '$scope', '$stateParams', function(eventSvc, $scope, $stateParams){
			var self = this,
				id = $stateParams.id;

			eventSvc.get($stateParams.id)
                .then(function(res){
                    $scope.event = res.data.event;
                });


			this.prepareRequest = function(){
				var dto = angular.copy($scope.event);
				dto.city = 'Viseu';
				return dto;
			}

			$scope.submitForm = function(){
				var model = self.prepareRequest();
				
				eventSvc.put(id, model)
					.then(function(res){
						
					}, function(res){

					});
			}
		}]);
})();
(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.event.eventViewCtrl', ['pi.core.app.eventSvc', '$scope', '$stateParams', '$cordovaSocialSharing', function(eventSvc, $scope, $stateParams, $cordovaSocialSharing){
           var self = this;
            $scope.id = $stateParams.id;

            eventSvc.get($stateParams.id)
                .then(function(res){
                    $scope.event = res.data.event;
                });

            $scope.shareEmail = function(){
                $cordovaSocialSharing
                    .shareViaEmail($scope.event.headline, $scope.event.headline, $scope.event.image, $scope.event.url) // Share via native share sheet
                    .then(function(result) {
                      // Success!
                    }, function(err) {
                      // An error occured. Show a message to the user
                    });
            }

            $scope.shareTwitter = function(){
                $cordovaSocialTwitter
                    .shareViaFacebook($scope.event.headline, $scope.event.headline, $scope.event.image, $scope.event.url) // Share via native share sheet
                    .then(function(result) {
                      // Success!
                    }, function(err) {
                      // An error occured. Show a message to the user
                    });
            }

            $scope.shareFacebook = function(){
                $cordovaSocialSharing
                    .shareViaFacebook($scope.event.headline, $scope.event.headline, $scope.event.image, $scope.event.url) // Share via native share sheet
                    .then(function(result) {
                      // Success!
                    }, function(err) {
                      // An error occured. Show a message to the user
                    });
            }
        }]);
})();
(function(){
	angular
		.module('stuv')
		.directive('eventCalendarTrigger', ['stuv.core.event.phoneCalendar', function(phoneCalendar){
			var linkFn = function(scope, elem, attrs, piContentCtrl)
			{
				elem.addClass('event-calendar__trigger');

				elem.bind('click', function(){
					phoneCalendar.register(scope.event);
				});
			}
			return {
			   link: linkFn,
			   restrict: 'A',
			   scope: {
			   	'event': '='
			   }
			}
		}])
		.provider('stuv.core.event.phoneCalendar', [function(){
			return {
				$get: ['$ionicModal', '$rootScope', '$q', '$cordovaCalendar', '$cordovaPreferences', function($ionicModal, $rootScope, $q, $cordovaCalendar, $cordovaPreferences){
					var scope = $rootScope.$new(),
					 	modalDefer,
		                closeModal = function(res) {
		                    var res = scope.modal.hide();
		                    modalDefer.resolve(res);
		                },
		                showModal = function(event){
							scope.event = event;
			                modalDefer = $q.defer();
			                scope.modal.show();
				            return modalDefer.promise;
						},
						disposeModal= function(){
							scope.moda.remove();
						},
						savePreferences = function(save){
							$cordovaPreferences.store('phone-calendar.register-auto', 'true');
						},
						modalRegistersAuto = function(){
							return $cordovaPreferences.fetch('phone-calendar.register-auto') === 'true';
						},
						saveEvent = function(event) {
							$cordovaCalendar.createEvent({
							    title: scope.event.title,
							    location: 'The Moon',
							    notes: scope.event.excerpt,
							    startDate: new Date(scope.event.doorTime),
							    endDate: new Date(scope.event.endDate)
							  }).then(function (result) {
							    closeModal(result);
							  }, function (err) {
							    
							  });
						};

					scope.register = function(event){
						saveEvent(event);
					}

					scope.registerAndSave = function(event){
						register(event);
						savePreferences(true);
					}
					scope.cancel = function(){
						closeModal();
						disposeModal();
					}
					$ionicModal.fromTemplateUrl('core/event/phone-calendar-confirm.tpl.html', {
			                scope: scope,
			                animation: 'slide-in-up'
			            }).then(function(modal) {
			                scope.modal = modal;
			                scope.closeModal = closeModal;
			            });
					return {
						register: function(event) {
							if(modalRegistersAuto()) {
								saveEvent(event);
							} else {
								showModal(event);
							}
						},
						sync: function(){

						}
					}
				}]
			}
		}])
})();
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
(function(){
	angular
		.module('stuv.core')
		.controller('stuv.core.news.newsCreateCtrl', ['pi.core.app.articleSvc', '$scope', '$cordovaFileOpener2', function(newsSvc, $scope, $cordovaFileOpener2){
			var self = this;
			
			$scope.showFileDialog = function(){
				$cordovaFileOpener2.open(
			    '/sdcard/Download/gmail.apk',
			    'application/vnd.android.package-archive'
			  ).then(function() {
			      // Success!
			  }, function(err) {
			      // An error occurred. Show a message to the user
			  });	
			}
			
			$scope.news = {};

			this.prepareRequest = function(){
				var dto = angular.copy($scope.news);
				dto.city = 'Viseu';
				return dto;
			}

			var submitErrorFn = function(response) {

			}

			$scope.submitForm = function(){
				try {
					var model = self.prepareRequest();
					newsSvc.post(model)
						.then(function(res){

						}, submitErrorFn);	
				}
				catch(e){
					submitErrorFn();
				}
				
			}
		}]);
})();
(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.news.newsListFilterCtrl', ['stuv.common.responseUtilsSvc', 'pi.core.article.articleSvc', '$scope', '$stateParams', function(responseUtilsSvc, articleSvc, $scope, $stateParams){
            
            $scope.queryModel = {};

            
        }]);
})();
(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.news.newsListCtrl', ['$ionicModal', 'pi.core.responseUtilsSvc', 'pi.core.article.articleSvc', '$scope', '$stateParams', '$rootScope', '$q', function($ionicModal, responseUtilsSvc, articleSvc, $scope, $stateParams, $rootScope, $q){
            
            $scope.cachedArticles = [];
                        
            $scope.queryModel = {
                busy: false,
                noResult: false,
                hasMoreData: false,
                data: [],
                currentCategory: 'Todas'
            };

            $scope.modalScope = $rootScope.$new();

            $ionicModal.fromTemplateUrl('core/news/news-list-filter.tpl.html', {
                scope: $scope.modalScope,
                animation: 'slide-in-up',
                controller: 'stuv.core.news.newsListFilterCtrl'
            }).then(function(modal) {
                $scope.modalScope.modal = modal;
                $scope.modalScope.closeModal = closeModal;
            });

            var modalDefer,
                openModal = function() {
                    modalDefer = $q.defer();
                    $scope.modalScope.modal.show();
                    return modalDefer.promise;
                },
                closeModal = function(model) {
                    var res = $scope.modalScope.modal.hide();
                    modalDefer.resolve(model);
                };

            $scope.modalScope.queryModel = {};

            $scope.modalScope.filterByCategory = function(id){
                $scope.modalScope.queryModel.text = null;
                $scope.modalScope.queryModel.categoryId = id;
                closeModal($scope.modalScope.queryModel);
            }

            $scope.clearText = function() {
                $scope.modalScope.queryModel.text = null;
                $scope.modalScope.queryModel.categoryId = null;
            }

            $scope.modalScope.filterByText = function(){
                $scope.queryModel.categoryId = null;
                closeModal($scope.modalScope.queryModel);
            }

            var self = this,
                queryKeys = ['name', 'categoryId'];

            $scope.$on('$destroy', function(){
                $scope.queryModel.data = [];
                $scope.cachedArticles = [];
                resetModel();
            });

            $scope.filter = function(){
                openModal()
                    .then(function(model){
                        reset();
                        find(model);
                    });
            }

            $scope.findMore = function(){
                var model = responseUtilsSvc.getQueryModel(queryKeys);
                find(model);
            }

            $scope.doRefresh = function() {
                reset();
                find({});
            }

            $scope.canFind = function() {
                return $scope.queryModel.busy === false;
            }

            $scope.reset = function(){
                reset();
                find({});
            }

            var resetModel = function(){
                $scope.queryModel = {
                    text: null,
                    categoryId: null
                };    
            }

            var find = function(model) {
                    
                    $scope.cachedArticles = $scope.queryModel.data;
                    $scope.queryModel.busy = true;

                    return articleSvc.find(model)
                        .then(function(res){
                            if(!_.isArray(res.data.articles) || res.data.articles.length === 0) {
                                $scope.queryModel.noResult = true;
                                $scope.queryModel.busy = false;
                                $scope.queryModel.hasMoreData = false;
                                return;
                            }

                            var data = responseUtilsSvc.orderByNewest(res.data.articles, 'datePublished');
                            $scope.queryModel.data = $scope.queryModel.data.concat(data);
                            $scope.queryModel.busy = false;
                            $scope.queryModel.noResult = false;
                            $scope.queryModel.hasMoreData = true;
                        },
                        function(){
                            $scope.queryModel.busy = false;
                        });
                },
                reset = function(){
                    $scope.queryModel.data = [];
                };

        }]);
})();
(function(){
	angular
		.module('stuv.core')
		.controller('stuv.core.news.newsUpdateCtrl', ['pi.core.app.eventSvc', '$scope', '$stateParams', function(eventSvc, $scope, $stateParams){
			var self = this,
				id = $stateParams.id;

			eventSvc.get($stateParams.id)
                .then(function(res){
                    $scope.event = res.data.event;
                });


			this.prepareRequest = function(){
				var dto = angular.copy($scope.event);
				dto.city = 'Viseu';
				return dto;
			}

			$scope.submitForm = function(){
				var model = self.prepareRequest();
				
				eventSvc.put(id, model)
					.then(function(res){
						
					}, function(res){

					});
			}
		}]);
})();
(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.news.newsViewCtrl', ['pi.core.article.articleSvc', '$scope', '$stateParams', 
            function(articleSvc, $scope, $stateParams){
                var self = this;
                $scope.id = $stateParams.id;
                $scope.rating = {
                    rate: 4,
                    max: 5
                };
                
                articleSvc.get($stateParams.id)
                    .then(function(res){
                        $scope.article = res.data.article;
                    });

        }]);
})();
(function(){
	angular
		.module('stuv.core')
		.directive('placeCard', [function(){

			return {
				templateUrl: 'core/place/place-card.tpl.html',
				scope: {
					'place': '='
				},
				controller: ['$scope', function($scope){

				}],
				replace: false
			}
		}]);
})();
(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.place.placeListFilterCtrl', ['googlePlaceTypeEnum', 'stuv.common.responseUtilsSvc', 'pi.core.article.articleSvc', '$scope', '$stateParams', 
        	function(googlePlaceTypeEnum, responseUtilsSvc, articleSvc, $scope, $stateParams){
            
            $scope.queryModel = {};
            $scope.types = googlePlaceTypeEnum;
            $scope.model = {};
            
        }]);
})();
(function(){

  angular
    .module('stuv.core')
    .controller('stuv.core.place.placeListMapCtrl', ['$ionicModal', 'stuv.common.responseUtilsSvc', 'pi.core.place.placeSvc', '$scope', '$stateParams', '$rootScope', '$q', function($ionicModal, responseUtilsSvc, placeSvc, $scope, $stateParams, $rootScope, $q){

      var mbAccessToken = 'pk.eyJ1IjoiZ3VpbGhlcm1lZ2VlayIsImEiOiJjaWlndXM1eXAwMDN0dnJrcmIydWpzNHRmIn0.4N9q6HjOGEiksMCvhYR9cQ';
      
      $scope.layers = {
        baselayers: {
          osm: {
            name: 'Mapbox',
            type: 'xyz',
            url: 'https://api.mapbox.com/v4/mapbox.streets/0/0/0.png?access_token=pk.eyJ1IjoiZ3VpbGhlcm1lZ2VlayIsImEiOiJjaWlndXM1eXAwMDN0dnJrcmIydWpzNHRmIn0.4N9q6HjOGEiksMCvhYR9cQ'
          }
        }
      };

      $scope.center = {
        lat: null,
        lng: null,
        zoom: 18
      }

      $scope.defaults = {
        scrollWheelZoom: false,
        // maxZoom: 22
      }

      var getClusterResult = function(nodes) {
        var totalVotes = nodes.length;
        var pollName = '';
        var votesObj = {};

        //computes counts for each vote
        $.each(nodes, function(index) {
          if (!pollName) {
            pollName = this.feature.properties.pollName;
          }
          var voteKey = this.feature.properties.vote;

          if (!(voteKey in votesObj)) {
            votesObj[voteKey] = 1;
          } else {
            votesObj[voteKey] += 1;
          }
        });
        // returns object of all votes
        return {
          pollName: pollName,
          votesObj: votesObj,
          totalVotes: totalVotes
        };
      };

     function addGeoJsonLayerWithClustering(data) {
        var markers = L.markerClusterGroup({
          showCoverageOnHover: false,
          zoomToBoundsOnClick: false
        });
        markers.on('clusterclick', function(a) {
          var children = a.layer.getAllChildMarkers();
          var resultObj = getClusterResult(children);

          popupContent = '<div>' +
            '<p><b>' + resultObj.pollName + '</b></p>' +
            '<p>Votes: ' + resultObj.totalVotes + '</p>' +
            '<p>yes:' + resultObj.votesObj.Yes + '</p>' +
            '<p>no:' + resultObj.votesObj.No + '</p>' +
            '</div>';

          a.layer.bindPopup(popupContent, {
            closeButton: true,
            keepInView: true
          }).openPopup();

        });
        var geoJsonLayer = L.geoJson(data, {
          onEachFeature: function(feature, layer) {
            // layer.bindPopup(feature.properties.vote);
          }
        });
        markers.addLayer(geoJsonLayer);
        leafletData.getMap().then(function(map) {
          map.addLayer(markers);
          map.fitBounds(markers.getBounds());
        });
      }

  }]);

})();
(function(){
    angular
        .module('stuv.core')
        .factory('pi.core.googlePlaceUtils', [function(){

            this.formatDetail = function(place) {
                var obj = {
                    name: place.name,
                    id: place.place_id,
                    types: place.types || [],
                    opening_hours: place.opening_hours,
                    rating: place.rating,
                    ratingTotal: place.user_ratings_total,
                    website: place.website,
                    address: place.formatted_address
                };

                if(!_.isUndefined(place['photos']) && place.photos.length > 0) {
                    obj.image = place.photos[0].getUrl({maxWidth: 640});
                } else {
                    obj.image = '/img/place-default.png';
                }

                if(!_.isUndefined(place['geometry']) && !_.isUndefined(place.geometry['location'])) {
                    obj.postion = {
                        latitude: place.geometry.location.lat,
                        longitude: place.geometry.location.lng
                    }
                }

                return obj;
            };

            return this;
        }])
        .controller('stuv.core.place.placeListCtrl', ['pi.core.googlePlaceUtils', '$ionicModal', 'stuv.common.responseUtilsSvc', 'pi.core.place.placeSvc', '$scope', '$stateParams', '$rootScope', '$q', 'ngGPlacesAPI', 
            function(googlePlaceUtils, $ionicModal, responseUtilsSvc, placeSvc, $scope, $stateParams, $rootScope, $q, ngGPlacesAPI){
            
                var self = this;

                $scope.places = [];

                var find = function(model) {
                        $scope.places = [];
                        model = model || {};
                        model.latitude = $rootScope.position.latitude;
                        model.longitude = $rootScope.position.longitude;

                        ngGPlacesAPI.nearbySearch(model).then(function(data){
                            angular.forEach(data, function(val) {
                                var obj = googlePlaceUtils.formatDetail(val);
                                $scope.places.push(obj);
                            });
                        });      
                    },
                    reset = function() {
                        $scope.places = [];
                    }

                find();
                

                $scope.modalScope = $rootScope.$new();

                $ionicModal.fromTemplateUrl('core/place/place-list-filter.tpl.html', {
                    scope: $scope.modalScope,
                    animation: 'slide-in-up',
                    controller: 'stuv.core.place.placeListFilterCtrl'
                }).then(function(modal) {
                    $scope.modalScope.modal = modal;
                    $scope.modalScope.closeModal = closeModal;
                });

                var modalDefer,
                    openModal = function() {
                        modalDefer = $q.defer();
                        $scope.modalScope.modal.show();
                        return modalDefer.promise;
                    },
                    closeModal = function(model) {
                        var res = $scope.modalScope.modal.hide();
                        var query = {keyword: []};
                        angular.forEach(model.types, function(v, k) {
                            if(v === true) {
                                query.keyword.push(k);
                            }
                        });
                        if(_.isString(model.text)) {
                            query.text = model.text;
                        }
                        modalDefer.resolve(query);
                    };

                $scope.modalScope.queryModel = {};

                $scope.modalScope.filterByCategory = function(id){
                    $scope.modalScope.queryModel.text = null;
                    $scope.modalScope.queryModel.categoryId = id;
                    closeModal($scope.modalScope.queryModel);
                }

                $scope.modalScope.filterByText = function(){
                    closeModal($scope.modalScope.queryModel);
                }

            var self = this,
                queryKeys = ['name', 'types'];

            $scope.$on('$destroy', function(){
                $scope.queryModel.data = [];
                $scope.cachedArticles = [];
                //resetModel();
            });

            $scope.filter = function(){
                openModal()
                    .then(function(model){
                        reset();
                        find(model);
                    });
            }

        }]);
})();
(function(){
	angular
		.module('stuv.core')
		.factory('googlePlaceTypeEnum', [function(){
			/*
			casino,
					cemetery,
					church,
					city_hall,
					clothing_store,
					convenience_store,
					courthouse,
					dentist,
					department_store,
					doctor,
					electrician,
					electronics_store,
					embassy,
					establishment,
					finance,
					fire_station,
					florist,
					food,
					funeral_home,
					furniture_store,
					gas_station,
					general_contractor,
					grocery_or_supermarket,
					gym,
					hair_care,
					hardware_store,
					health,
					hindu_temple,
					home_goods_store,
					hospital,
					insurance_agency,
					jewelry_store,
					laundry,
					lawyer,
					library,
					liquor_store,
					local_government_office,
					locksmith,
					lodging,
					meal_delivery,
					meal_takeaway,
					mosque,
					movie_rental,
					movie_theater,
					moving_company,
					museum,
					night_club,
					painter,
					park,
					parking,
					pet_store,
					pharmacy,
					physiotherapist,
					place_of_worship,
					plumber,
					police,
					post_office,
					real_estate_agency,
					restaurant,
					roofing_contractor,
					rv_park,
					school,
					shoe_store,
					shopping_mall,
					spa,
					stadium,
					storage,
					store,
					subway_station,
					synagogue,
					taxi_stand,
					train_station,
					travel_agency,
					university,
					veterinary_care,
					zoo]>
			*/
			return {
					accounting: 'Contabilidade',
					airport: 'Aeroporto',
					amusement_park: 'Parque de diversões',
					aquarium: 'Aquário',
					art_gallery: 'Galeria de Arte',
					atm: 'MultiBanco',
					bakery: 'Padaria',
					bank: 'Banco',
					bar: 'Bar',
					beauty_salon: 'Salao de Beleza',
					bicycle_store: 'Loja de Bicicletas',
					book_store: 'Livraria',
					bowling_alley: 'Pista de Bowling',
					bus_station: 'Paragem de Autocarro',
					cafe: 'Cafe',
					campground: 'Area de Camping',
					car_dealer: 'Vendedor de Automoveis',
					car_rental: 'Aluger de Automoveis',
					car_repair: 'Reparaçao de Automoveis',
					car_wash: 'Lavagem de Carro'
					
			}
		}])
		.directive('googlePlaceIcon', [function(){

			return {
				scope: {
					'type': '='
				},
				replace: true,
				template: '<i class="google-place-icon" ng-show="!hide" ng-class="icon {{icon}}"></i>',
				link: function(scope, elem, attrs){
					scope.hide = false;

					switch(scope.type) {
						case 'restaurant':
							scope.icon = 'ion-android-restaurant';
							break;
						case 'bicycle_store':
							scope.icon = 'ion-android-bicycle';
							break;
						case 'cafe':
							scope.icon = 'ion-coffee';
							break;
						case 'hospital':
						case 'pharmacy':
						case 'health':
							scope.icon = 'ion-medkit';
							break;
						case 'point_of_interest':
							scope.icon = 'ion-pin';
							break;
						case 'bar':
							scope.icon = 'ion-beer';
							break;
						case 'bus_station':
							scope.icon = 'ion-android-bus';
							break;
						case 'car_dealer':
						case 'car_rental':
						case 'car_repair':
						case 'car_wash':
							scope.icon = 'ion-model-s';
							break;
						case 'pet_store':
							scope.icon = 'ion-ios-paw';
							break;

						case 'church':
							scope.icon = 'ion-ios-bell-outline';
							break;
						default:
							scope.hide = true;
					}
				}
			}
		}])
		.directive('placeTypeIcon', [function(){

			return {
				scope: {
					'placeType': '='
				},
				replace: true,
				template: '<i ng-class="icon {{icon}}"></i>',
				link: function(scope, elem, attrs){
					switch(scope.placeType) {
						case 22:
							scope.icon = 'ion-medkit';
					}
				}
			}
		}]);
})();
(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.place.placeViewCtrl', ['pi.core.googlePlaceUtils', 'pi.core.place.placeSvc', '$scope', '$stateParams', 'ngGPlacesAPI', 
            function(googlePlaceUtils, placeSvc, $scope, $stateParams, ngGPlacesAPI){
            var self = this;

            $scope.id = $stateParams.id;
            $scope.place = {};

            ngGPlacesAPI.placeDetails({placeId: $stateParams.id})
                .then(function(data) {
                    $scope.place = googlePlaceUtils.formatDetail(data);
                });
        }]);
})();
(function(){
	angular
		.module('stuv.core.tourism')
		.controller('stuv.core.tourism.mediaViewCtrl', ['stuv.core.tourism.videosSvc', '$stateParams', '$sce',
			function(videosSvc, $stateParams, $sce) {

				this.video = videosSvc.getById($stateParams.id);
			}]);
})();
(function(){
	angular
		.module('stuv.core.tourism')
		.controller('stuv.core.tourism.mediaCtrl', ['stuv.core.tourism.videosSvc',
			function(videosSvc) {

				this.videos = videosSvc.getAll();
			}]);
})();

(function(){
	
	angular
		.module('stuv.core.tourism')
		.factory('stuv.core.tourism.videosSvc', ['$rootScope',
			function($rootScope) {
				var videos = [
					{id: 'uT_sscHwbgY', name: 'Viseu: spot promocional da melhor cidade para viver!'},
					{id: 'W6_cZwST45M', name: 'Passagem de ano viseu 2016 (video mapping)'},
					{id: 'Pv6HzJCD3b0', name: 'Reportagem Viseu a melhor cidade para se viver em Portugal'},
					{id: 'GS3Cilkh0R0', name: 'Viseu: a primeira rede de ciclovias urbanas nasce em 2018'},
					{id: 'uT_sscHwbgY', name: 'Viseu: spot promocional da melhor cidade para viver!'}
					];
				this.getAll = function() {
					return videos;
				};

				this.getById = function(id) {
					var video;
					
					angular.forEach(videos, function(obj) {
						if(obj.id === id) {
							video = obj;
						}
					});
					return video;

				}
				return this;
			}]);
})();