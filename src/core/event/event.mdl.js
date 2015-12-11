(function(){
	angular
		.module('stuv.core.event', ['ngCordova', 'stuv.core']);
	angular
		.module('stuv.core.event')
		.config(['$stateProvider', function($stateProvider){

			$stateProvider
				.state('event-create', {
					url: '/criar-evento',
					templateUrl: 'core/event/event-create.tpl.html',
					controller: 'stuv.core.event.eventCreateCtrl'
				})
				.state('event-list', {
                    url: '/event-list',
                    controller: 'stuv.core.event.eventListCtrl',
                    templateUrl: 'core/event/event-list.tpl.html'
                })
                .state('event-view', {
                    url: '/evento/:id',
                    controller: 'stuv.core.event.eventViewCtrl',
                    templateUrl: 'core/event/event-view.tpl.html'
                })
                .state('event-update', {
                    url: '/evento-editar/:id',
                    controller: 'stuv.core.event.eventUpdateCtrl',
                    templateUrl: 'core/event/event-update.tpl.html'
                });
		}]);
})();