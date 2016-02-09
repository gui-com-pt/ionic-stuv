
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