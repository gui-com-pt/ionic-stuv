(function(){
    angular
        .module('stuv.core')
        .factory('pi.core.googlePlaceUtils', [function(){

            this.formatDetail = function(place) {
                var obj = {
                    name: place.name,
                    id: place.place_id,
                    types: place.types || [],
                    opening_hours: place.opening_hours,
                    rating: place.rating,
                    ratingTotal: place.user_ratings_total,
                    website: place.website,
                    address: place.formatted_address
                };

                if(!_.isUndefined(place['photos']) && place.photos.length > 0) {
                    obj.image = place.photos[0].getUrl({maxWidth: 640});
                } else {
                    obj.image = '/img/place-default.png';
                }

                if(!_.isUndefined(place['geometry']) && !_.isUndefined(place.geometry['location'])) {
                    obj.postion = {
                        latitude: place.geometry.location.lat,
                        longitude: place.geometry.location.lng
                    }
                }

                return obj;
            };

            return this;
        }])
        .controller('stuv.core.place.placeListCtrl', ['pi.core.googlePlaceUtils', '$ionicModal', 'stuv.common.responseUtilsSvc', 'pi.core.place.placeSvc', '$scope', '$stateParams', '$rootScope', '$q', 'ngGPlacesAPI', 
            function(googlePlaceUtils, $ionicModal, responseUtilsSvc, placeSvc, $scope, $stateParams, $rootScope, $q, ngGPlacesAPI){
            
                var self = this;

                $scope.places = [];

                var find = function(model) {
                        $scope.places = [];
                        model = model || {};
                        model.latitude = $rootScope.position.latitude;
                        model.longitude = $rootScope.position.longitude;

                        ngGPlacesAPI.nearbySearch(model).then(function(data){
                            angular.forEach(data, function(val) {
                                var obj = googlePlaceUtils.formatDetail(val);
                                $scope.places.push(obj);
                            });
                        });      
                    },
                    reset = function() {
                        $scope.places = [];
                    }

                find();
                

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
                        var query = {keyword: []};
                        angular.forEach(model.types, function(v, k) {
                            if(v === true) {
                                query.keyword.push(k);
                            }
                        });
                        if(_.isString(model.text)) {
                            query.text = model.text;
                        }
                        modalDefer.resolve(query);
                    };

                $scope.modalScope.queryModel = {};

                $scope.modalScope.filterByCategory = function(id){
                    $scope.modalScope.queryModel.text = null;
                    $scope.modalScope.queryModel.categoryId = id;
                    closeModal($scope.modalScope.queryModel);
                }

                $scope.modalScope.filterByText = function(){
                    closeModal($scope.modalScope.queryModel);
                }

            var self = this,
                queryKeys = ['name', 'types'];

            $scope.$on('$destroy', function(){
                $scope.queryModel.data = [];
                $scope.cachedArticles = [];
                //resetModel();
            });

            $scope.filter = function(){
                openModal()
                    .then(function(model){
                        reset();
                        find(model);
                    });
            }

        }]);
})();