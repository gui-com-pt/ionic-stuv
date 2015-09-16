(function(){
    angular
        .module('stuv.core')
        .controller('stuv.core.eventViewCtrl', ['pi.core.app.eventSvc', '$scope', '$stateParams', function(eventSvc, $scope, $stateParams){
           var self = this;
            $scope.id = $stateParams.id;

            eventSvc.get($stateParams.id)
                .then(function(res){
                    $scope.event = res.data.event;
                })

        }])
        .controller('stuv.core.eventListCtrl', ['pi.core.app.eventSvc', '$scope', function(eventSvc, $scope){

            eventSvc.find()
                .then(function(res){
                    $scope.events = res.data.events;
                });
        /*$scope.events = [
        {
        	id: 1,
        	title: 'Palco Banco BIC',
        	excerpt: 'Grande abertura',
        	thumbnailSrc: 'http://www.feirasaomateus.pt/agenda/xs/hgw5xt45jr40c08so0.jpg',
        	doorTime: '18:30',
        	doorDate: '07/08/2015'
        },
        {
        	id: 2,
        	title: 'Palco Banco BIC',
        	excerpt: 'DJ\'S RFM Dance Floor - Kura',
        	thumbnailSrc: 'http://www.feirasaomateus.pt/agenda/xs/8pjkydgxzs84owcw8k.jpg',
        	doorTime: '22:00',
        	doorDate: '08/08/2015'
        },
    	{
        	id: 3,
        	title: 'Palco Banco BIC',
        	excerpt: 'Banda Do Mar',
        	thumbnailSrc: 'http://www.feirasaomateus.pt/agenda/xs/akkjaplcxz4000cww.jpg',
        	doorTime: '22:00',
        	doorDate: '09/08/2015'
        },
    	{
        	id: 4,
        	title: 'Palco Banco BIC',
        	excerpt: 'Ranco Folclórico "As Bacacinhas de Santiago"',
        	thumbnailSrc: 'http://www.feirasaomateus.pt/agenda/xs/6qnutvr18x0k4ww0g8.jpg',
        	doorTime: '21:00',
        	doorDate: '10/08/2015'
        },
    	{
        	id: 5,
        	title: 'Palco Banco BIC',
        	excerpt: 'Grupo de Cantares Flamiam',
        	thumbnailSrc: 'http://www.feirasaomateus.pt/agenda/xs/6qnutvr18x0k4ww0g8.jpg',
        	doorTime: '21:00',
        	doorDate: '10/08/2015'
        },
    	{
        	id: 6,
        	title: 'Palco Banco BIC',
        	excerpt: 'Diogo André',
        	thumbnailSrc: 'http://www.feirasaomateus.pt/agenda/xs/6qnutvr18x0k4ww0g8.jpg',
        	doorTime: '21:00',
        	doorDate: '11/08/2015'
        },
    	{
        	id: 7,
        	title: 'Palco Banco BIC',
        	excerpt: 'Miss Emigrante',
        	thumbnailSrc: 'http://www.feirasaomateus.pt/agenda/xs/xioy0vky0usokgowk8.jpg',
        	doorTime: '22:00',
        	doorDate: '11/08/2015'
        },
    	{
        	id: 8,
        	title: 'Palco Banco BIC',
        	excerpt: 'Agir',
        	thumbnailSrc: 'http://www.feirasaomateus.pt/agenda/xs/104wvmple3i8ww84c8.jpg',
        	doorTime: '22:00',
        	doorDate: '12/08/2015'
        },
    	{
        	id: 9,
        	title: 'Palco Banco BIC',
        	excerpt: 'António Zambujo',
        	thumbnailSrc: 'http://www.feirasaomateus.pt/agenda/xs/1gdfqnyc4y00ggg40w.jpg',
        	doorTime: '22:00',
        	doorDate: '13/08/2015'
        },
    	{
        	id: 10,
        	title: 'Palco Banco BIC',
        	excerpt: 'Pedro Abrunhosa',
        	thumbnailSrc: 'http://www.feirasaomateus.pt/agenda/xs/18yevt58dq2sggoc4k.jpg',
        	doorTime: '22:00',
        	doorDate: '14/08/2015'
        },
    	{
        	id: 11,
        	title: 'Palco Banco BIC',
        	excerpt: 'Tony Carrreira',
        	thumbnailSrc: 'http://www.feirasaomateus.pt/agenda/xs/2wc4878ddo2s0808s.jpg',
        	doorTime: '22:00',
        	doorDate: '15/08/2015'
        },
    	{
        	id: 12,
        	title: 'Palco Banco BIC',
        	excerpt: 'Festival Internacional de Folclore',
        	thumbnailSrc: 'http://www.feirasaomateus.pt/agenda/xs/21140lof0y00gwwgc8.jpg',
        	doorTime: '22:00',
        	doorDate: '16/08/2015'
        },
    	{
        	id: 12,
        	title: 'Palco Banco BIC',
        	excerpt: 'Grupo de Cavaquinhos de Passos de Silgueiros',
        	thumbnailSrc: 'http://www.feirasaomateus.pt/agenda/xs/21140lof0y00gwwgc8.jpg',
        	doorTime: '22:00',
        	doorDate: '17/08/2015'
        },
        {
        	id: 13,
        	title: 'Palco Banco BIC',
        	excerpt: 'The Greyhound James Band',
        	thumbnailSrc: 'http://www.feirasaomateus.pt/agenda/xs/wm825umhteogkosoc0.jpg',
        	doorTime: '22:00',
        	doorDate: '18/08/2015'
        },
        {
        	id: 14,
        	title: 'Palco Banco BIC',
        	excerpt: 'Noite de Fado - Mara Pedro',
        	thumbnailSrc: 'http://www.feirasaomateus.pt/agenda/xs/cx2vcf301dwgooo4w.jpg',
        	doorTime: '22:00',
        	doorDate: '19/08/2015'
        }

        ]*/
        }]);
})();