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
            'ngGPlaces',
            'pouchdb'
			])
		.factory('companySvc', ['DbHelper', '$q', '$log', '$rootScope',
			function(DbHelper, $q, $log, $rootScope) {
				var vm = this;

				function getDb() {
					return DbHelper.get();
				}

				function doInstall() {
					var db = getDb();

					return db.put({
						_id: '_design/count',
						views: {
						   'count': {
						  	  map: function(doc) {
						    	emit(doc.userId, 1);
						      	}.toString(),
						      	reduce: '_count'
						    }
						 }
					})
					.then(function(){
						return db.put({
					  		_id: '_design/nif',
					  		views: {
					    		'nif': {
					      			map: function(doc) {
					        		emit(doc.nif);
					      			}.toString()
					    		}
					  		}
						});
					});
                }

                this.getAll = function() {
                    var db = getDb();
                    var def = $q.defer();
                    db.allDocs()
                      .then(function(res) {
                        def.resolve({
                          data: res.rows
                        });
                      });
                    return def.promise;
                }


                this.get = function(id) {
                    var db = getDb();
                    var def = $q.defer();
                    db.get(id)
                      .then(function(res) {
                        res.id = res['_id'];
                        if(res['_attachments'] && res._attachments['avatar']) {
                          db.getAttachment(id, 'avatar')
                            .then(function(attachRes) {
                              res.id = id;
                              res._id = id;
                              var url = URL.createObjectURL(attachRes);
                              res.avatarHref = url;
                              def.resolve({
                                company: res
                              });
                            })
                            .catch(function(err) {
                                $log.error(err);
                                def.reject(err);
                            })
                        } else {
                            def.resolve({
                              associate: res
                            });
                        }
                        
                      });
                    
                    return def.promise;
                }

                vm.create = function(dto) {
                    var db = getDb();
                    var def = $q.defer();
                    //dto.createdBy = $rootScope.user.name;
                    dto.createdAt = Date.now();
                    def.resolve(db.post(dto));
                    return def.promise;
                }


                return this;
			}])
		.factory('DbHelper', ['pouchDB', '$log',
			function(pouchDB, $log) {
				var db = false;
				this.get = function() {
					if(!db) {
						db = pouchDB('company');
					}
					return db;
				}

				return this;
			}])
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


		        var appID = 123456789;
		        var version = "v2.0"; // or leave blank and default is v2.0
		        //$cordovaFacebookProvider.browserInit(appID, version);
		        piProvider.setAppId('viseu');

				$stateProvider
					.state('home', {
						url: '/home',
						controller: 'stuv.core.homeCtrl',
						templateUrl: 'core/home.tpl.html'
					})
					.state('company-create', {
						url: '/company-register',
						controller: 'core.companyCreateCtrl',
						controllerAs: 'vm',
						templateUrl: 'core/company/company-create.tpl.html'
					})
					.state('company-list', {
						url: '/companies',
						controller: 'core.companyListCtrl',
						controllerAs: 'vm',
						templateUrl: 'core/company/company-list.tpl.html'
					});
		}])
		.run(['$cordovaGoogleAnalytics', 'googlePlaceTypeEnum', '$ionicPlatform', '$ionicLoading', '$cordovaGeolocation', '$state', 'stuv.core.setupSvc', 'pi.core.app.eventCategorySvc', 'pi.core.article.articleCategorySvc', '$rootScope', 'stuv', '$log', 
			function($cordovaGoogleAnalytics, googlePlaceTypeEnum, $ionicPlatform, $ionicLoading, $cordovaGeolocation, $state, setupSvc, eventCategorySvc, articleCategorySvc, $rootScope, stuv, $log){

				function boot(){	
	    			$rootScope.booted = true;
	                $state.go("home");
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