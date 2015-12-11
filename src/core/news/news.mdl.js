(function(){
	angular
		.module('stuv.core.news', ['ngCordova', 'stuv.core']);
	angular
		.module('stuv.core.news')
		.config(['$stateProvider', function($stateProvider){

			$stateProvider
				.state('news-create', {
					url: '/criar-noticia',
					templateUrl: 'core/news/news-create.tpl.html',
					controller: 'stuv.core.news.newsCreateCtrl'
				})
				.state('news-list', {
                    url: '/news-list',
                    controller: 'stuv.core.news.newsListCtrl',
                    templateUrl: 'core/news/news-list.tpl.html'
                })
                .state('news-view', {
                    url: '/newso/:id',
                    controller: 'stuv.core.news.newsViewCtrl',
                    templateUrl: 'core/news/news-view.tpl.html'
                })
                .state('news-update', {
                    url: '/newso-editar/:id',
                    controller: 'stuv.core.news.newsUpdateCtrl',
                    templateUrl: 'core/news/news-update.tpl.html'
                });
		}]);
})();