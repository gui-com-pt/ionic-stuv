(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.news.newsViewCtrl', ['pi.core.article.articleSvc', '$scope', '$stateParams', 
            function(articleSvc, $scope, $stateParams){
                var self = this;
                $scope.id = $stateParams.id;
                $scope.rating = {
                    rate: 4,
                    max: 5
                };
                
                articleSvc.get($stateParams.id)
                    .then(function(res){
                        $scope.article = res.data.article;
                    });

        }]);
})();