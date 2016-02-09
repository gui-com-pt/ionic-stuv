(function(){
	angular
		.module('stuv.core')
		.controller('stuv.core.homeCtrl', ['$scope', 'stuv.core.stuvSvc', 'leafletData', 'stuv.core.setupSvc', 'pi.core.article.articleSvc', 'pi.core.app.eventSvc', function($scope, stuvSvc, leafletData, setupSvc, articleSvc, eventSvc){

            $scope.articles = [];
            $scope.events = [];

            articleSvc.find({})
                .then(function(res){
                    if(!_.isArray(res.data.articles) || res.data.articles.length === 0) {
                        return;
                    }

                    angular.forEach(res.data.articles, function(dto){
                        $scope.articles.push(dto);
                        var a = angular.copy(dto);
                        a.name = '123123';
                        $scope.articles.push(a);
                    });

                });
            eventSvc.find({})
                .then(function(res){
                    if(!_.isArray(res.data.events) || res.data.events.length === 0) {
                        return;
                    }

                    angular.forEach(res.data.events, function(dto){
                        $scope.events.push(dto);
                    });
            });
            angular.extend($scope, {
                center: {
                    lat: 40.704472,
                    lng: -7.949354,
                    zoom: 8
                },
                markers: {
                    main_marker: {
                        lat: 40.676032,
                        lng: -7.949354,
                        focus: true,
                        //message: "Hey, drag me if you want",
                        title: "Marker",
                        draggable: true,
                        label: {
                            message: "Hey, drag me if you want",
                            options: {
                                noHide: true
                            }
                        }
                    }
                }
            });

            var getFormatedCords = function() {
				var coords = [];

				angular.forEach($scope.stations, function(value, key){
					coords.push(value.location);
				});

				return coords;
			}

			stuvSvc.getNearest()
				.then(function(res){
					$scope.nearest = res;
				});

			$scope.getDistance = function(from) {
				return geolib.getDistance($scope.stations[0].location, from) / 1000;
			};

			$scope.lines = stuvSvc.lines;

			$scope.stations = stuvSvc.stations;
		}]);
})();