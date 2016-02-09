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