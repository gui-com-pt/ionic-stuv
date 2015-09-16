(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.placesListCtrl', ['pi.core.placeSvc', '$scope', function(placesSvc, $scope){

            placesSvc.find()
                .then(function(res){
                    $scope.places = res.data.places;
                })
        }])
})();