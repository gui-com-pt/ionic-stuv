(function(){
	angular
		.module('stuv')
		.controller('core.companyListCtrl', ['$rootScope', 'companySvc',
			function($rootScope, companySvc) {
				var vm = this;

				this.companies = [];
				function loadAll() {

			        companySvc.getAll()
			            .then(function(res) {
			              var arr = [];
			                angular.forEach(res.data, function(val) {
			                	if(val.id !== '_design/ecsCode' && val.id !== '_design/nif' && val.id !== '_design/count')
								companySvc.get(val.id)
								.then(function(res) {
								      vm.companies.push(res.company);
								});
			                });
			            });
				}

				loadAll();
			}]);
})();