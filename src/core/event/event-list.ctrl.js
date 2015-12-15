(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.event.eventListCtrl', ['stuv.common.responseUtilsSvc', 'pi.core.app.eventSvc', '$scope', '$ionicModal', '$q', '$rootScope', function(responseUtilsSvc, eventSvc, $scope, $ionicModal, $q, $rootScope){
            var modalDefer,
                openModal = function() {
                    modalDefer = $q.defer();
                    $scope.modalScope.modal.show();
                    return modalDefer.promise;
                },
                closeModal = function(model) {
                    var res = $scope.modalScope.modal.hide();
                    modalDefer.resolve(model);
                },
                self = this,
                queryKeys = ['name', 'categoryId'];

        	$scope.eventsPerDay = [];
            $scope.cachedEvents = [];
            $scope.queryModel = {
                busy: false,
                noResult: false,
                data: []
            };

            $scope.modalScope = $rootScope.$new();

            $ionicModal.fromTemplateUrl('core/event/event-list-filter.tpl.html', {
                scope: $scope.modalScope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalScope.modal = modal;
                $scope.modalScope.closeModal = closeModal;
            });

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
                $scope.cachedEvents = $scope.eventsPerDay;

                $scope.queryModel.busy = true;
              
                    eventSvc.find()
                    .then(function(res){
                        $scope.queryModel.busy = false;

                        if(!_.isArray(res.data.events) || res.data.events === 0) {
                            $scope.queryModel.noResult = true;
                            $scope.queryModel.busy = false;
                            return;
                        }
                        
                        var events = responseUtilsSvc.orderByNewest(res.data.events, 'doorTime');

                        angular.forEach(events, function(dto){
                            $scope.eventsPerDay.push(dto);
                        });
                        $scope.queryModel.noResult = false;
                    }, function(res){
                        $scope.queryModel.busy = false;
                    });    
               
                
            };

            find({});
        }]);
})();