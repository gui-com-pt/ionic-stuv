(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.place.placeViewCtrl', ['pi.core.place.placeSvc', '$scope', '$stateParams', function(placeSvc, $scope, $stateParams){
           var self = this;

            $scope.id = $stateParams.id;

            placeSvc.get($stateParams.id)
                .then(function(res){
                    $scope.place = res.data.place;
              
                });
        }]);
})();