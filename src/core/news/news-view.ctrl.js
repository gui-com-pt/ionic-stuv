(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.news.newsViewCtrl', ['pi.core.article.articleSvc', '$scope', '$stateParams', '$rootScope',
            function(articleSvc, $scope, $stateParams, $rootScope){
                var self = this;
                $scope.id = $stateParams.id;
                $scope.rating = {
                    rate: 4,
                    max: 5
                };

                angular.forEach($rootScope.articles, function(obj) {
                    if(obj.id == $scope.id) {
                        $scope.article = obj;
                    }
                })

                
                /*articleSvc.get($stateParams.id)
                    .then(function(res){
                        $scope.article = res.data.article;
                    });*/

        }]);
})();