(function(){
	angular
		.module('stuv')
		.controller('core.companyCreateCtrl', ['$rootScope', 'companySvc', '$stateParams', '$state',
			function($rootScope, companySvc, $stateParams, $state) {

			var vm = this;

	        vm.create = function() {
	            companySvc.create({
	            	displayName: vm.firstName + ' ' + vm.lastName,
	              firstName: vm.firstName,
	              lastName: vm.lastName,
	              fullName: vm.fullName,
	              ecsCode: vm.ecsCode,
	              company: vm.company,
	              email: vm.email,
	              phone: vm.phone,
	              address: vm.address,
	              city: vm.city,
	              postCode: vm.postCode,
	              country: vm.country,
	              birthday: vm.birthday,
	              nif: vm.nif,
	              cc: vm.cc,
	              observation: vm.observation
	            })
	            .then(function(res) {
	              $state.go('company-list');
	            });
	        }

			}]);
})();