(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.news.newsListCtrl', ['stuv.common.responseUtilsSvc', 'pi.core.article.articleSvc', '$scope', function(responseUtilsSvc, articleSvc, $scope){
        	$scope.articlesPerDay = [];

            var find = function(model) {
                    return articleSvc.find(model)
                        .then(function(res){
                            
                            var data = responseUtilsSvc.orderByNewest(res.data.articles, 'datePublished');
                            
                            angular.forEach(data, function(dto){
                                $scope.articlesPerDay.push(dto);
                            });
                        });
                },
                reset = function(){
                    $scope.articlesPerDay = [];
                }

            $scope.filterByCategory = function(id){
                reset();
                find({categoryId: id});
            }

            find();
            
        }]);
})();