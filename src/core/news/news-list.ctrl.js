(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.news.newsListCtrl', ['stuv.common.responseUtilsSvc', 'pi.core.article.articleSvc', '$scope', '$stateParams', function(responseUtilsSvc, articleSvc, $scope, $stateParams){
        	
            $scope.articlesPerDay = [];
            
            $scope.queryName = null;

            $scope.cachedArticles = [];
            
            var self = this,
                queryKeys = ['name', 'categoryId'];
            
            $scope.queryModel = {
                busy: false,
                text: null,
                noResult: false
            };

            $scope.$on('$destroy', function(){
                $scope.articlesPerDay = [];
                $scope.cachedArticles = [];
            });

            $scope.filterByCategory = function(id){
                $scope.queryModel.text = null;
                reset();
                find({categoryId: id});
            }

            $scope.filterByText = function(){
                reset();
                find({
                    name: $scope.queryModel.text
                });
            }

            $scope.clearText = function(){
                $scope.queryModel.text = null;
                reset();
                find({});
            }

            $scope.findMore = function(){
                var model = responseUtils.getQueryModel(queryKeys);
                find(model);
            }

            $scope.noResult = function(){
                return $scope.queryModel.noResult;
            }

            var find = function(model) {
                    $scope.cachedArticles = $scope.articlesPerDay;

                    return articleSvc.find(model)
                        .then(function(res){
                            if(!_.isArray(res.data.articles) || res.data.articles.length === 0) {
                                $scope.queryModel.noResult = true;
                            }

                            $scope.queryModel.noResult = false;
                            var data = responseUtilsSvc.orderByNewest(res.data.articles, 'datePublished');
                            $scope.queryModel.busy = true;

                            angular.forEach(data, function(dto){
                                $scope.articlesPerDay.push(dto);
                                $scope.queryModel.busy = false;
                            }, function(){
                                $scope.queryModel.busy = false;
                            });
                        });
                },
                reset = function(){
                    $scope.articlesPerDay = [];
                };

            find();

        }]);
})();