(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.news.newsListCtrl', ['$ionicModal', 'pi.core.responseUtilsSvc', 'pi.core.article.articleSvc', '$scope', '$stateParams', '$rootScope', '$q', function($ionicModal, responseUtilsSvc, articleSvc, $scope, $stateParams, $rootScope, $q){
            
            $scope.cachedArticles = [];
                        
            $scope.queryModel = {
                busy: false,
                noResult: false,
                hasMoreData: false,
                data: [],
                currentCategory: 'Todas'
            };

            $scope.modalScope = $rootScope.$new();

            $ionicModal.fromTemplateUrl('core/news/news-list-filter.tpl.html', {
                scope: $scope.modalScope,
                animation: 'slide-in-up',
                controller: 'stuv.core.news.newsListFilterCtrl'
            }).then(function(modal) {
                $scope.modalScope.modal = modal;
                $scope.modalScope.closeModal = closeModal;
            });

            var modalDefer,
                openModal = function() {
                    modalDefer = $q.defer();
                    $scope.modalScope.modal.show();
                    return modalDefer.promise;
                },
                closeModal = function(model) {
                    var res = $scope.modalScope.modal.hide();
                    modalDefer.resolve(model);
                };

            $scope.modalScope.queryModel = {};

            $scope.modalScope.filterByCategory = function(id){
                $scope.modalScope.queryModel.text = null;
                $scope.modalScope.queryModel.categoryId = id;
                closeModal($scope.modalScope.queryModel);
            }

            $scope.clearText = function() {
                $scope.modalScope.queryModel.text = null;
                $scope.modalScope.queryModel.categoryId = null;
            }

            $scope.modalScope.filterByText = function(){
                $scope.queryModel.categoryId = null;
                closeModal($scope.modalScope.queryModel);
            }

            var self = this,
                queryKeys = ['name', 'categoryId'];

            $scope.$on('$destroy', function(){
                $scope.queryModel.data = [];
                $scope.cachedArticles = [];
                resetModel();
            });

            $scope.filter = function(){
                openModal()
                    .then(function(model){
                        reset();
                        find(model);
                    });
            }

            $scope.findMore = function(){
                var model = responseUtilsSvc.getQueryModel(queryKeys);
                find(model);
            }

            $scope.doRefresh = function() {
                reset();
                find({});
            }

            $scope.canFind = function() {
                return $scope.queryModel.busy === false;
            }

            $scope.reset = function(){
                reset();
                find({});
            }

            var resetModel = function(){
                $scope.queryModel = {
                    text: null,
                    categoryId: null
                };    
            }

            var find = function(model) {
                    
                    $scope.cachedArticles = $scope.queryModel.data;
                    $scope.queryModel.busy = true;

                    return articleSvc.find(model)
                        .then(function(res){
                            if(!_.isArray(res.data.articles) || res.data.articles.length === 0) {
                                $scope.queryModel.noResult = true;
                                $scope.queryModel.busy = false;
                                $scope.queryModel.hasMoreData = false;
                                return;
                            }

                            var data = responseUtilsSvc.orderByNewest(res.data.articles, 'datePublished');
                            $scope.queryModel.data = $scope.queryModel.data.concat(data);
                            $scope.queryModel.busy = false;
                            $scope.queryModel.noResult = false;
                            $scope.queryModel.hasMoreData = true;
                        },
                        function(){
                            $scope.queryModel.busy = false;
                        });
                },
                reset = function(){
                    $scope.queryModel.data = [];
                };

        }]);
})();