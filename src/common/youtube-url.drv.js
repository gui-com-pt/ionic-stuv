(function(){
	angular
		.module('stuv.common')
		.filter('youtubeEmbedUrl', function ($sce) {
		    return function(videoId) {
		      return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + videoId);
		    };
		 });
})();