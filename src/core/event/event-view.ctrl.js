(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.event.eventViewCtrl', ['pi.core.app.eventSvc', '$scope', '$stateParams', '$cordovaSocialSharing', '$rootScope', function(eventSvc, $scope, $stateParams, $cordovaSocialSharing, $rootScope){
           var self = this;
            $scope.id = $stateParams.id;

/*            eventSvc.get($stateParams.id)
                .then(function(res){
                    $scope.event = res.data.event;
                });*/
                $scope.event = $rootScope.events[$scope.id];

            $scope.shareEmail = function(){
                $cordovaSocialSharing
                    .shareViaEmail($scope.event.headline, $scope.event.headline, $scope.event.image, $scope.event.url) // Share via native share sheet
                    .then(function(result) {
                      // Success!
                    }, function(err) {
                      // An error occured. Show a message to the user
                    });
            }

            $scope.shareTwitter = function(){
                $cordovaSocialTwitter
                    .shareViaFacebook($scope.event.headline, $scope.event.headline, $scope.event.image, $scope.event.url) // Share via native share sheet
                    .then(function(result) {
                      // Success!
                    }, function(err) {
                      // An error occured. Show a message to the user
                    });
            }

            $scope.shareFacebook = function(){
                $cordovaSocialSharing
                    .shareViaFacebook($scope.event.headline, $scope.event.headline, $scope.event.image, $scope.event.url) // Share via native share sheet
                    .then(function(result) {
                      // Success!
                    }, function(err) {
                      // An error occured. Show a message to the user
                    });
            }
        }]);
})();