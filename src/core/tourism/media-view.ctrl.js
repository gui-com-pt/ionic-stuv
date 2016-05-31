(function(){
	angular
		.module('stuv.core.tourism')
		.controller('stuv.core.tourism.mediaViewCtrl', ['stuv.core.tourism.videosSvc', '$stateParams', '$sce',
			function(videosSvc, $stateParams, $sce) {

				this.video = videosSvc.getById($stateParams.id);
			}]);
})();