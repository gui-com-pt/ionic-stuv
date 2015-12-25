(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.place.placeListCtrl', ['$ionicModal', 'stuv.common.responseUtilsSvc', 'pi.core.place.placeSvc', '$scope', '$stateParams', '$rootScope', '$q', function($ionicModal, responseUtilsSvc, placeSvc, $scope, $stateParams, $rootScope, $q){
            
            $scope.cachedArticles = [];
                        
            $scope.queryModel = {
                busy: false,
                noResult: false,
                data: [],
                currentCategory: 'Todas'
            };

            $scope.modalScope = $rootScope.$new();

            $ionicModal.fromTemplateUrl('core/place/place-list-filter.tpl.html', {
                scope: $scope.modalScope,
                animation: 'slide-in-up',
                controller: 'stuv.core.place.placeListFilterCtrl'
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
                var model = responseUtils.getQueryModel(queryKeys);
                find(model);
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

                    return placeSvc.find(model)
                        .then(function(res){
                            if(!_.isArray(res.data.places) || res.data.places.length === 0) {
                                $scope.queryModel.noResult = true;
                                $scope.queryModel.busy = false;
                                return;
                            }

                            var data = responseUtilsSvc.orderByNewest(res.data.places, 'datePublished');
                            angular.forEach(data, function(dto){
                                $scope.queryModel.data.push(dto);
                            });
                            
                            $scope.queryModel.busy = false;
                            $scope.queryModel.noResult = false;
                        },
                        function(){
                            $scope.queryModel.busy = false;
                        });
                },
                reset = function(){
                    $scope.queryModel.data = [];
                };

            find();

        }]);
})();