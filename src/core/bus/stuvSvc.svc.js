(function(){
    angular
        .module('stuv.core.bus')
        .factory('stuv.core.stuvSvc', ['$cordovaGeolocation', '$q', '$rootScope', '$ionicModal', function($cordovaGeolocation, $q, $rootScope, $ionicModal){

            var getFormatedCords = function() {
                var coords = [];

                angular.forEach(stations, function(value, key){
                    coords.push(value.location);
                });

                return coords;
            }

            var $scope = $rootScope.$new();

            $ionicModal.fromTemplateUrl('core/bus/schedule-modal.tpl.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.closeModal = closeModal;
            });

            var openModal = function(line, schedule, trip) {
                $scope.route = lines[line].schedules[schedule].routes[trip];
                $scope.modal.show();
            };

            var closeModal = function() {
                $scope.modal.hide();
            };

            var nearest = {};

            var getNearest = function(from) {
                var def = $q.defer();

                $cordovaGeolocation
                    .getCurrentPosition()
                    .then(function (position) {
                        var lat  = position.coords.latitude
                        var long = position.coords.longitude
                        var from = {latitude: lat, longitude: long};
                        var coords = getFormatedCords();
                        var n = geolib.findNearest(from, coords, 1);
                        nearest = stations[parseInt(n.key)];
                        def.resolve(nearest);
                    }, function(err) {
                        // error
                    });
                return def.promise;
            };

            var init = function() {
            };

            var stations = [
                { id: 0, name: 'Rio de Loba', location: {latitude: 40.676032, longitude: -7.923519}},
                { id: 1, name: 'Rossio', location: {latitude: 40.681565, longitude: -7.927381}},
                { id: 2, name: 'Av. Alberto Sampaio', location: {latitude: 40.696208, longitude: -7.932960}},
                { id: 3, name: 'Marzovelos', location: {latitude: 40.704472, longitude: -7.949354}},
                { id: 4, name: 'P. Medronhosa', location: {latitude: 40.704472, longitude: -7.949354}},
                { id: 5, name: 'Sarzedelo', location: {latitude: 40.704472, longitude: -7.949354}},
                { id: 6, name: 'Trav. Cima', location: {latitude: 40.704472, longitude: -7.949354}}
            ];

            var lines = [{
                number: 1,
                name: 'Nº 1 ROSSIO-RIO LOBA-ROSSIO',
                schedules: [
                    {
                        name: "Dias Úteis",
                        type: 'businessDay',
                        routes: [
                            {
                                departure: '07:10',
                                departureStation: stations[1],
                                arrive: '07:25',
                                arriveStation: stations[0],
                                routes: [
                                    {
                                        departure: '07:10',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '07:25',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '07:30',
                                departureStation: stations[0],
                                arrive: '07:50',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '07:30',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '07:50',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '08:10',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '08:15',
                                departureStation: stations[0],
                                arrive: '08:35',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '08:15',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '08:35',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '08:55',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '08:55',
                                departureStation: stations[0],
                                arrive: '09:10',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '08:55',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '09:10',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '09:30',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '09:30',
                                departureStation: stations[0],
                                arrive: '09:45',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '09:30',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '09:45',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '10:00',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '10:30',
                                departureStation: stations[0],
                                arrive: '10:40',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '10:30',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '10:40',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '10:55',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '12:00',
                                departureStation: stations[0],
                                arrive: '12:15',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '12:00',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '12:15',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '12:35',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '12:35',
                                departureStation: stations[0],
                                arrive: '12:50',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '12:35',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '12:50',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '13:10',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '13:10',
                                departureStation: stations[0],
                                arrive: '13:25',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '13:10',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '13:25',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '13:45',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '13:45',
                                departureStation: stations[0],
                                arrive: '14:00',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '13:45',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '14:00',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '14:20',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '15:30',
                                departureStation: stations[0],
                                arrive: '15:45',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '15:30',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '15:45',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '16:00',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '16:35',
                                departureStation: stations[0],
                                arrive: '16:50',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '16:35',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '16:50',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '17:10',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '17:15',
                                departureStation: stations[0],
                                arrive: '17:30',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '17:15',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '17:30',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '17:55',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '18:00',
                                departureStation: stations[0],
                                arrive: '18:15',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '18:00',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '18:15',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '18:35',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '18:35',
                                departureStation: stations[0],
                                arrive: '18:50',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '18:35',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '18:50',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '19:10',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '19:15',
                                departureStation: stations[0],
                                arrive: '19:30',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '19:15',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '19:30',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '19:45',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '19:50',
                                departureStation: stations[0],
                                arrive: '20:05',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '19:50',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '20:05',
                                        departureStation: stations[1]
                                    }]
                            }
                        ]
                    },
                    {
                        name: "Sábados",
                        type: 'weekend',
                        routes: [
                            {
                                departure: '07:40',
                                departureStation: stations[0],
                                arrive: '07:55',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '07:40',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '07:55',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '08:15',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '08:15',
                                departureStation: stations[0],
                                arrive: '08:30',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '08:15',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '08:30',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '08:50',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '08:50',
                                departureStation: stations[0],
                                arrive: '09:05',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '08:50',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '09:05',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '09:25',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '10:25',
                                departureStation: stations[0],
                                arrive: '10:40',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '10:25',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '10:40',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '11:00',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '11:35',
                                departureStation: stations[0],
                                arrive: '11:50',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '11:35',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '11:50',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '12:10',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '13:10',
                                departureStation: stations[0],
                                arrive: '13:25',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '13:10',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '13:25',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '13:45',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '14:10',
                                departureStation: stations[0],
                                arrive: '14:25',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '14:10',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '14:25',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '14:40',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '18:25',
                                departureStation: stations[0],
                                arrive: '18:40',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '18:25',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '18:40',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '18:55',
                                        departureStation: stations[0]
                                    }]
                            }
                        ]
                    },
                    {
                        name: "Feriados",
                        type: 'holiday',
                        routes: [
                            {
                                departure: '07:10',
                                departureStation: stations[1],
                                arrive: '07:25',
                                arriveStation: stations[0],
                                routes: [
                                    {
                                        departure: '07:10',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '07:25',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '07:30',
                                departureStation: stations[0],
                                arrive: '07:50',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '07:30',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '07:50',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '08:10',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '08:15',
                                departureStation: stations[0],
                                arrive: '08:35',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '08:15',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '08:35',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '08:55',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '08:55',
                                departureStation: stations[0],
                                arrive: '09:10',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '08:55',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '09:10',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '09:30',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '09:30',
                                departureStation: stations[0],
                                arrive: '09:45',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '09:30',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '09:45',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '10:00',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '10:30',
                                departureStation: stations[0],
                                arrive: '10:40',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '10:30',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '10:40',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '10:55',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '12:00',
                                departureStation: stations[0],
                                arrive: '12:15',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '12:00',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '12:15',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '12:35',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '12:35',
                                departureStation: stations[0],
                                arrive: '12:50',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '12:35',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '12:50',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '13:10',
                                        departureStation: stations[0]
                                    }]
                            },
                            {
                                departure: '13:10',
                                departureStation: stations[0],
                                arrive: '13:25',
                                arriveStation: stations[1],
                                routes: [
                                    {
                                        departure: '13:10',
                                        departureStation: stations[0]
                                    },
                                    {
                                        departure: '13:25',
                                        departureStation: stations[1]
                                    },
                                    {
                                        departure: '13:45',
                                        departureStation: stations[0]
                                    }]
                            }
                        ]
                    }]
            },
            {
                number: 4,
                name: 'Nº 4 AV.A.SAMPAIO-P.MEDRONHOSA-AV.A.SAMPAIO',
                schedules: [
                    {
                        name: "Dias Úteis",
                        type: 'businessDay',
                        routes: [
                            {
                                departure: '07:40',
                                departureStation: stations[5],
                                arrive: '08:05',
                                arriveStation: stations[2],
                                routes: [
                                    {
                                        departure: '07:40',
                                        departureStation: stations[5]
                                    },
                                    {
                                        departure: '07:45',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '07:55',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '08:05',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '08:10',
                                departureStation: stations[2],
                                arrive: '08:30',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '08:10',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '08:20',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '08:30',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '08:40',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '08:50',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '09:00',
                                departureStation: stations[2],
                                arrive: '09:25',
                                arriveStation: stations[5],
                                routes: [
                                    {
                                        departure: '09:00',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '09:10',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '09:20',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '09:25',
                                        departureStation: stations[5]
                                    },
                                    {
                                        departure: '09:30',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '09:40',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '09:50',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '10:20',
                                departureStation: stations[2],
                                arrive: '10:40',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '10:20',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '10:30',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '10:40',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '10:50',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '11:00',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '12:05',
                                departureStation: stations[2],
                                arrive: '12:20',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '12:05',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '12:10',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '12:20',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '12:30',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '12:40',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '12:40',
                                departureStation: stations[2],
                                arrive: '13.05',
                                arriveStation: stations[5],
                                routes: [
                                    {
                                        departure: '12:40',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '12:50',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '13:00',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '13:05',
                                        departureStation: stations[5]
                                    },
                                    {
                                        departure: '13:10',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '13:20',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '13:30',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '13:40',
                                departureStation: stations[2],
                                arrive: '14:00',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '13:40',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '13:50',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '14:00',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '14:10',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '14:20',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '16:30',
                                departureStation: stations[2],
                                arrive: '16:55',
                                arriveStation: stations[5],
                                routes: [
                                    {
                                        departure: '16:30',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '16:40',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '16:50',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '16:55',
                                        departureStation: stations[5]
                                    },
                                    {
                                        departure: '17:00',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '17:10',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '17:20',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '17:25',
                                departureStation: stations[2],
                                arrive: '07:45',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '17:25',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '17:35',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '17:45',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '17:55',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '18:05',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '18:10',
                                departureStation: stations[2],
                                arrive: '18:35',
                                arriveStation: stations[5],
                                routes: [
                                    {
                                        departure: '18:10',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '18:20',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '18:30',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '18:35',
                                        departureStation: stations[5]
                                    },
                                    {
                                        departure: '18:40',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '18:50',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '19.00',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '19:15',
                                departureStation: stations[2],
                                arrive: '19:35',
                                arriveStation: stations[5],
                                routes: [
                                    {
                                        departure: '19:15',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '19:25',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '19:30',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '19:35',
                                        departureStation: stations[5]
                                    }]
                            }
                        ]
                    },
                    {
                        name: "Sábados",
                        type: 'weekend',
                        routes: [
                            {
                                departure: '07:25',
                                departureStation: stations[2],
                                arrive: '07:40',
                                arriveStation: stations[5],
                                routes: [
                                    {
                                        departure: '07:25',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '07:30',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '07:35',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '07:40',
                                        departureStation: stations[5]
                                    },
                                    {
                                        departure: '07:45',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '07:50',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '08:00',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '08:30',
                                departureStation: stations[2],
                                arrive: '08:40',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '08:30',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '08:35',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '08:40',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '08:45',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '08:55',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '11:05',
                                departureStation: stations[2],
                                arrive: '11:20',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '11:05',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '11:15',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '11:20',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '11:25',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '11:35',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '12:40',
                                departureStation: stations[2],
                                arrive: '12:55',
                                arriveStation: stations[5],
                                routes: [
                                    {
                                        departure: '12:40',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '12:45',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '12:50',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '12:55',
                                        departureStation: stations[5]
                                    },
                                    {
                                        departure: '13:00',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '13:05',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '13:10',
                                        departureStation: stations[4]
                                    }]
                            },
                            {
                                departure: '13:40',
                                departureStation: stations[2],
                                arrive: '13:50',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '13:40',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '13:45',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '13:50',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '13:55',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '14:05',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '16:55',
                                departureStation: stations[2],
                                arrive: '17:10',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '16:55',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '17:00',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '17:10',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '17:15',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '17:25',
                                        departureStation: stations[2]
                                    }]
                            }
                        ]
                    },
                    {
                        name: "Feriados",
                        type: 'holiday',
                        routes: [
                            {
                                departure: '09:00',
                                departureStation: stations[2],
                                arrive: '09:10',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '09:00',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '09:05',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '09:10',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '09:15',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '09:25',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '11:45',
                                departureStation: stations[2],
                                arrive: '11:55',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '11:45',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '11:50',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '11:55',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '12:00',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '12:10',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '13:10',
                                departureStation: stations[2],
                                arrive: '13:20',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '13:10',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '13:15',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '13:20',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '13:25',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '13:35',
                                        departureStation: stations[2]
                                    }]
                            },
                            {
                                departure: '17:00',
                                departureStation: stations[2],
                                arrive: '07:15',
                                arriveStation: stations[4],
                                routes: [
                                    {
                                        departure: '17:00',
                                        departureStation: stations[2]
                                    },
                                    {
                                        departure: '17:05',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '17:15',
                                        departureStation: stations[4]
                                    },
                                    {
                                        departure: '17:20',
                                        departureStation: stations[3]
                                    },
                                    {
                                        departure: '17:30',
                                        departureStation: stations[2]
                                    }]
                            }
                        ]
                    }]
            }];

            init();
            return {
                start: init,
                stations: stations,
                lines: lines,
                nearest: nearest,
                getNearest: getNearest,
                openModalRoute: function(line, schedule, trip) {
                    return openModal(line, schedule, trip);
                }
            }
        }])
})();