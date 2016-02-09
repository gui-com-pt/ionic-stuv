(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.place.placeViewCtrl', ['pi.core.googlePlaceUtils', 'pi.core.place.placeSvc', '$scope', '$stateParams', 'ngGPlacesAPI', 
            function(googlePlaceUtils, placeSvc, $scope, $stateParams, ngGPlacesAPI){
            var self = this;

            $scope.id = $stateParams.id;
            $scope.place = {};

            ngGPlacesAPI.placeDetails({placeId: $stateParams.id})
                .then(function(data) {
                    $scope.place = googlePlaceUtils.formatDetail(data);
                });
        }]);
})();