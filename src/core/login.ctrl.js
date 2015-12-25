
(function(){
	angular
		.module('stuv.core')
		.provider('stuv', [function(){

			var _settingsDict = 'app::settings',
				_settings;

			return {

				$get: ['$cordovaPreferences', '$cordovaNetwork', '$q', '$rootScope',
					function($cordovaPreferences, $cordovaNetwork, $q, $rootScope){
					
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