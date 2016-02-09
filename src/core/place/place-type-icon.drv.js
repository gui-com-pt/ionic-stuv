(function(){
	angular
		.module('stuv.core')
		.factory('googlePlaceTypeEnum', [function(){
			/*
			casino,
					cemetery,
					church,
					city_hall,
					clothing_store,
					convenience_store,
					courthouse,
					dentist,
					department_store,
					doctor,
					electrician,
					electronics_store,
					embassy,
					establishment,
					finance,
					fire_station,
					florist,
					food,
					funeral_home,
					furniture_store,
					gas_station,
					general_contractor,
					grocery_or_supermarket,
					gym,
					hair_care,
					hardware_store,
					health,
					hindu_temple,
					home_goods_store,
					hospital,
					insurance_agency,
					jewelry_store,
					laundry,
					lawyer,
					library,
					liquor_store,
					local_government_office,
					locksmith,
					lodging,
					meal_delivery,
					meal_takeaway,
					mosque,
					movie_rental,
					movie_theater,
					moving_company,
					museum,
					night_club,
					painter,
					park,
					parking,
					pet_store,
					pharmacy,
					physiotherapist,
					place_of_worship,
					plumber,
					police,
					post_office,
					real_estate_agency,
					restaurant,
					roofing_contractor,
					rv_park,
					school,
					shoe_store,
					shopping_mall,
					spa,
					stadium,
					storage,
					store,
					subway_station,
					synagogue,
					taxi_stand,
					train_station,
					travel_agency,
					university,
					veterinary_care,
					zoo]>
			*/
			return {
					accounting: 'Contabilidade',
					airport: 'Aeroporto',
					amusement_park: 'Parque de diversões',
					aquarium: 'Aquário',
					art_gallery: 'Galeria de Arte',
					atm: 'MultiBanco',
					bakery: 'Padaria',
					bank: 'Banco',
					bar: 'Bar',
					beauty_salon: 'Salao de Beleza',
					bicycle_store: 'Loja de Bicicletas',
					book_store: 'Livraria',
					bowling_alley: 'Pista de Bowling',
					bus_station: 'Paragem de Autocarro',
					cafe: 'Cafe',
					campground: 'Area de Camping',
					car_dealer: 'Vendedor de Automoveis',
					car_rental: 'Aluger de Automoveis',
					car_repair: 'Reparaçao de Automoveis',
					car_wash: 'Lavagem de Carro'
					
			}
		}])
		.directive('googlePlaceIcon', [function(){

			return {
				scope: {
					'type': '='
				},
				replace: true,
				template: '<i class="google-place-icon" ng-show="!hide" ng-class="icon {{icon}}"></i>',
				link: function(scope, elem, attrs){
					scope.hide = false;

					switch(scope.type) {
						case 'restaurant':
							scope.icon = 'ion-android-restaurant';
							break;
						case 'bicycle_store':
							scope.icon = 'ion-android-bicycle';
							break;
						case 'cafe':
							scope.icon = 'ion-coffee';
							break;
						case 'hospital':
						case 'pharmacy':
						case 'health':
							scope.icon = 'ion-medkit';
							break;
						case 'point_of_interest':
							scope.icon = 'ion-pin';
							break;
						case 'bar':
							scope.icon = 'ion-beer';
							break;
						case 'bus_station':
							scope.icon = 'ion-android-bus';
							break;
						case 'car_dealer':
						case 'car_rental':
						case 'car_repair':
						case 'car_wash':
							scope.icon = 'ion-model-s';
							break;
						case 'pet_store':
							scope.icon = 'ion-ios-paw';
							break;

						case 'church':
							scope.icon = 'ion-ios-bell-outline';
							break;
						default:
							scope.hide = true;
					}
				}
			}
		}])
		.directive('placeTypeIcon', [function(){

			return {
				scope: {
					'placeType': '='
				},
				replace: true,
				template: '<i ng-class="icon {{icon}}"></i>',
				link: function(scope, elem, attrs){
					switch(scope.placeType) {
						case 22:
							scope.icon = 'ion-medkit';
					}
				}
			}
		}]);
})();