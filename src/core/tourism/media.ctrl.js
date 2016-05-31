(function(){
	angular
		.module('stuv.core.tourism')
		.controller('stuv.core.tourism.mediaCtrl', ['stuv.core.tourism.videosSvc',
			function(videosSvc) {

				this.videos = videosSvc.getAll();
			}]);
})();
