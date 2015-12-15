(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.news.newsListFilterCtrl', ['stuv.common.responseUtilsSvc', 'pi.core.article.articleSvc', '$scope', '$stateParams', function(responseUtilsSvc, articleSvc, $scope, $stateParams){
            
            $scope.queryModel = {};

            
        }]);
})();