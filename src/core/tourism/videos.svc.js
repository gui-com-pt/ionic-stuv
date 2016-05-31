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