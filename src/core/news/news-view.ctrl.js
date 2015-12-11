(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.news.newsViewCtrl', ['pi.core.article.articleSvc', '$scope', '$stateParams', function(articleSvc, $scope, $stateParams){
           var self = this;
            $scope.id = $stateParams.id;

            articleSvc.get($stateParams.id)
                .then(function(res){
                    $scope.article = res.data.article;
                });

        }]);
})();