(function(){
	angular
		.module('stuv')
		.directive('eventCalendarTrigger', ['stuv.core.event.phoneCalendar', function(phoneCalendar){
			var linkFn = function(scope, elem, attrs, piContentCtrl)
			{
				elem.addClass('event-calendar__trigger');

				elem.bind('click', function(){
					phoneCalendar.register(scope.event);
				});
			}
			return {
			   link: linkFn,
			   restrict: 'A',
			   scope: {
			   	'event': '='
			   }
			}
		}])
		.provider('stuv.core.event.phoneCalendar', [function(){
			return {
				$get: ['$ionicModal', '$rootScope', '$q', '$cordovaCalendar', '$cordovaPreferences', function($ionicModal, $rootScope, $q, $cordovaCalendar, $cordovaPreferences){
					var scope = $rootScope.$new(),
					 	modalDefer,
		                closeModal = function(res) {
		                    var res = scope.modal.hide();
		                    modalDefer.resolve(res);
		                },
		                showModal = function(event){
							scope.event = event;
			                modalDefer = $q.defer();
			                scope.modal.show();
				            return modalDefer.promise;
						},
						disposeModal= function(){
							scope.moda.remove();
						},
						savePreferences = function(save){
							$cordovaPreferences.store('phone-calendar.register-auto', 'true');
						},
						modalRegistersAuto = function(){
							return $cordovaPreferences.fetch('phone-calendar.register-auto') === 'true';
						},
						saveEvent = function(event) {
							$cordovaCalendar.createEvent({
							    title: scope.event.title,
							    location: 'The Moon',
							    notes: scope.event.excerpt,
							    startDate: new Date(scope.event.doorTime),
							    endDate: new Date(scope.event.endDate)
							  }).then(function (result) {
							    closeModal(result);
							  }, function (err) {
							    
							  });
						};

					scope.register = function(event){
						saveEvent(event);
					}

					scope.registerAndSave = function(event){
						register(event);
						savePreferences(true);
					}
					scope.cancel = function(){
						closeModal();
						disposeModal();
					}
					$ionicModal.fromTemplateUrl('core/event/phone-calendar-confirm.tpl.html', {
			                scope: scope,
			                animation: 'slide-in-up'
			            }).then(function(modal) {
			                scope.modal = modal;
			                scope.closeModal = closeModal;
			            });
					return {
						register: function(event) {
							if(modalRegistersAuto()) {
								saveEvent(event);
							} else {
								showModal(event);
							}
						},
						sync: function(){

						}
					}
				}]
			}
		}])
})();