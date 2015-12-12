angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("core/event-list.tpl.html","");
$templateCache.put("core/faq.tpl.html","<ion-content>\n	<h2>Porque é paga?</h2>\n	<p>Além de ser um serviço único, a compra desta aplicação inclui as futuras actualizações. Ao longo do tempo a aplicação vai ser mantida consoante o feedback dos utilizadores.</p>\n	<h2>A Minha Localização</h2>\n	<p>Para te indicar a paragem de autocarros mais próxima, a aplicação necessita de aceder à tua localização actual.</p>\n	<h2>Problemas e Erros</h2>\n	<p>Foram realizados testes em vários dispositivos Android, IOS e Windows Phone.</p>\n	<p>Caso tenhas recebas erro, preenche o <a ui-sref=\"support\">formulário de suporte</a></p>\n</ion-content>");
$templateCache.put("core/home.tpl.html","<ion-view view-title=\"STUV\">\n    <ion-nav-buttons side=\"secondary\">\n        \n    </ion-nav-buttons>\n    <ion-content>\n        \n        \n    </ion-content>\n</ion-view>");
$templateCache.put("core/news-list.tpl.html","<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\">\n    <title></title>\n</head>\n<body>\n\n</body>\n</html>");
$templateCache.put("core/place-list.tpl.html","<ion-view view-title=\"Viseu\">\n    <ion-content>\n        <div class=\"list\">\n        <div ng-repeat-start=\"place in places\">\n        	<a class=\"item item-positive\">\n        	08 Agosto - Sábado\n        	</a>\n            <a class=\"item item-thumbnail-left\" href=\"\" ui-sref=\"event-view({id: place.id})\" >\n                <img ng-src=\"{{event.place}}\" />\n                <h2>{{event.doorTime}} | {{event.title}}</h2>\n                <div ng-bind-html=\"event.description\"></div>\n            </a>\n            </div>\n            <div ng-repeat-end=\"\"></div>\n        </div>\n    </ion-content>\n</ion-view>");
$templateCache.put("core/places-list.tpl.html","<ion-view view-title=\"Viseu\">\n    <ion-content class=\"padding\">\n        <form>\n            <div class=\"list\">\n                <div class=\"item\">\n                    <select>\n                        <option value=\"1\">Restaurantes</option>\n                        <option value=\"1\">Restaurantes</option>\n                        <option value=\"1\">Restaurantes</option>\n                        <option value=\"1\">Restaurantes</option>\n                        <option value=\"1\">Restaurantes</option>\n                        <option value=\"1\">Restaurantes</option>\n                    </select>\n                </div>\n            </div>\n        </form>\n<div ng-repeat=\"place in places\">\n    {{place | json}}\n</div>\n        </ion-content>\n    </ion-view>");
$templateCache.put("core/support.tpl.html","<ion-view view-title=\"Ajuda e Suporte\">\n	<ion-content>\n		<div class=\"padding\">\n			<p>Para qualquer esclarecimento sobre o projecto <b>viseu.ovh</b> nao exite em contactar.<br>\n		E um projecto recente que necessita de apoio da comunidade, ajuda reportando erros e sugestoes.</p>\n			<p>No prazo de 48 horas sera respondido o seu contacto.</p>\n			 <div class=\"row\">\n            <div class=\"col\"><i class=\"ion ion-ios-telephone\"></i> +351 960 032 154</div>\n            <div class=\"col\"><i class=\"ion ion-android-calendar\"></i> suporte@viseu.ovh</div>\n        </div>\n		</div>\n		<div class=\"list\">\n          <label class=\"item item-input item-select\">\n            <div class=\"input-label\">\n              Categoria do Ticket\n            </div>\n            <select ng-model=\"ticket.type\">\n              <option>Esclarecimento</option>\n              <option selected>Geral</option>\n              <option>Reportar Erro</option>\n              <option>Sugestao</option>\n              <option>Reclamaçao</option>\n            </select>\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Hora do acontecimento</span>\n            <input ng-model=\"ticket.when\" type=\"date\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Escreve o teu ticket</span>\n            <textarea ng-model=\"ticket.body\"></textarea>\n          </label>\n          <label class=\"item item-input\">\n          <button ng-click=\"submitForm()\" class=\"button button-stable\">Enviar Ticket</button>\n          </label>\n        </div>\n	</ion-content>\n</ion-view>");
$templateCache.put("core/webcam.tpl.html","<ion-view view-title=\"Sé de Viseu\">\n<ion-content>\n<img name=\"webcam_r3_c4\" src=\"http://abss.dyndns.info/viseu.jpg\">\n</ion-content>\n</ion-view>");
$templateCache.put("core/bus/bus-home.tpl.html","<ion-view view-title=\"STUV\">\n    <ion-nav-buttons side=\"secondary\">\n        <button class=\"button button-clear\" ui-sref=\"register-stop\">Registar Paragem</button>\n    </ion-nav-buttons>\n    <ion-content>\n        <!--<leaflet defaults=\"defaults\" center=\"center\" height=\"200\" width=\"640px\"></leaflet>-->\n        <div class=\"list\">\n            <a ui-sref=\"bus-schedules({id: nearest.id})\" class=\"item item-positive\">\n                Estação + Próxima <p ng-bind=\"nearest.name\"></p>\n            </a>\n            <a ui-sref=\"bus-schedules({id: $index})\" ng-repeat=\"station in lines\" class=\"item item-stable\">\n                <span ng-bind=\"station.name\"></span>\n                <span class=\"badge badge-dark\" ng-bind=\"station.departure\"></span>\n            </a>\n        </div>\n    </ion-content>\n</ion-view>");
$templateCache.put("core/bus/bus-schedules.tpl.html","<ion-view view-title=\"{{lines[0].name}}\">\n    <ion-content class=\"padding\">\n        <div class=\"list\">\n            <div ng-repeat-start=\"route in lines[line].schedules[viewSchedule].routes\">\n                <a class=\"item item-icon-right item-positive\" href=\"#\" ng-click=\"openModalRoute($index)\">\n                    <span class=\"item__time\">{{route.departure}} - {{route.arrive}}</span>\n                    <i ng-class=\"isAvailable(route.departure) ? \'ion-android-checkmark-circle\' : \'ion-android-more-vertical\'\" class=\"icon\"></i>\n                </a>\n            </div>\n            <div ng-repeat-end></div>\n        </div>\n    </ion-content>\n</ion-view>\n<div class=\"tabs\">\n  <a class=\"tab-item\" ng-click=\"viewSchedule = 0\">\n    Dias Úteis\n  </a>\n  <a class=\"tab-item\" ng-click=\"viewSchedule = 1\">\n    Sábado\n  </a>\n  <a class=\"tab-item\" ng-click=\"viewSchedule = 2\">\n    Domingo e Feriados\n  </a>\n</div>");
$templateCache.put("core/bus/register-stop.tpl.html","<ion-view view-title=\"Registar Percurso\">\n    <ion-content class=\"padding\">\n      <p>Ajuda-me a acrescentar todas as viagens de autocarro da nossa cidade!</p>\n      <!--<p>Sempre que fizeres uma viagem regista-a. Os registos são usados mensalmente para actualizar a app com horários mais completos.</p>-->\n      <div class=\"list register-stop__form\">\n        <label class=\"item item-input item-select item-positive\">\n          <i class=\"icon ion-android-bus placeholder-icon\"></i>\n          <span class=\"input-label\">Que linha apanhas-te?</span>\n          <select>\n          <option>1</option>\n          <option>2</option>\n          <option>3</option>\n          </select>\n        </label>\n        <label class=\"item item-input item-stacked-label item-positive\">\n        <i class=\"icon ion-calendar placeholder-icon\"></i>\n          <span class=\"input-label\">Quando foi a viagem?</span>\n          <input type=\"date\" placeholder=\"A que horas apanhas-te o autocarro?\">\n        </label>\n        <label class=\"item item-input item-stacked-label item-stable\">\n          <i class=\"icon ion-clock placeholder-icon\"></i>\n          <span class=\"input-label\">A que horas partiste?</span>\n          <input type=\"date\" placeholder=\"A que horas apanhas-te o autocarro?\">\n        </label>\n        <label class=\"item item-input item-select item-stable\">\n          <i class=\"icon ion-ios-location placeholder-icon\"></i>\n          <span class=\"input-label\">A Estação</span>\n          <select>\n          <option ng-repeat=\"station in stations\" ng-bind=\"station.name\"></option>\n          </select>\n        </label>\n        <label class=\"item item-input item-stacked-label item-positive\">\n          <i class=\"icon ion-clock placeholder-icon\"></i>\n          <span class=\"input-label\">A que horas chegas-te?</span>\n          <input type=\"date\" placeholder=\"A que horas apanhas-te o autocarro?\">\n        </label>\n        <label class=\"item item-input item-select item-positive\">\n          <i class=\"icon ion-ios-location placeholder-icon\"></i>\n          <div class=\"input-label\">A Estação?</div>\n          <select>\n          <option ng-repeat=\"station in stations\" ng-bind=\"station.name\"></option>\n          </select>\n        </label>\n          <button class=\"button button-positive button-full\">Registar</button></div>\n    </ion-content>\n</ion-view>");
$templateCache.put("core/bus/schedule-modal.tpl.html","<ion-modal-view>\n    <ion-header-bar>\n      <h1 class=\"title\">Rossi - Abraveses</h1>\n    </ion-header-bar>\n    <ion-content>\n      <div class=\"list\">\n        <div ng-repeat=\"route in route.routes\" class=\"item item-stable\" >\n          <span ng-bind=\"route.departure\"></span> <span ng-bind=\"route.departureStation.name\"></span>\n          <span class=\"badge badge-assertive\"><span ng-bind=\"getDistance(route.departureStation.location)\"></span> km</span>\n        </div>\n        <button class=\"button button-full button-energized\" ng-click=\"closeModal()\">Fechar</button>\n      </div>\n    </ion-content>\n  </ion-modal-view>");
$templateCache.put("core/bus/station-view.tpl.html","<ion-view>\nver estação com linhas q passam\n</ion-view>");
$templateCache.put("core/event/event-create.tpl.html","<ion-view>\n    <ion-nav-title>\n        Criar Evento\n    </ion-nav-title>\n    <ion-content>\n        <div class=\"list\">\n          <label class=\"item\">\n           <button ng-click=\"showFileDialog()\">Procurar Imagem</button>\n            \n\n          </label>\n          <label class=\"item item-input item-select\">\n            <div class=\"input-label\">\n              Tipo de Evento\n            </div>\n            <select ng-model=\"event.tags\">\n              <option>Concerto</option>\n              <option selected>Fittness</option>\n            </select>\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Hora de Entrada</span>\n            <input ng-model=\"event.doorTime\" type=\"date\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Hora de Fim</span>\n            <input ng-model=\"event.endDate\" type=\"date\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Duraçao do Evento</span>\n            <input ng-model=\"event.duration\" type=\"text\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Nome do Evento</span>\n            <input ng-model=\"event.title\" type=\"text\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Descricao curta</span>\n            <input ng-model=\"event.excerpt\" type=\"text\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">O conteudo da noticia</span>\n            <textarea ng-model=\"event.content\"></textarea>\n          </label>\n          <label class=\"item item-input\">\n          <button ng-click=\"submitForm()\" class=\"button button-stable\">Criar Evento</button>\n          </label>\n        </div>\n    </ion-content>\n</ion-view>");
$templateCache.put("core/event/event-list.tpl.html","<ion-view view-title=\"Eventos\">\n    <ion-nav-buttons side=\"secondary\">\n        <a ui-sref=\"event-create\"><i class=\"ion-ios-search-strong\"></i></a>\n    </ion-nav-buttons>\n    <ion-content>\n        <div class=\"list\">\n        <div ng-repeat=\"current in eventsPerDay\">\n        	<a class=\"item item-positive\">\n        	{{current.day}}\n        	</a>\n            <a ng-repeat=\"event in current.results\" class=\"item item-thumbnail-left\" href=\"\" ui-sref=\"event-view({id: event.id})\" >\n                <img ng-src=\"{{event.thumbnailSrc}}\" />\n                <h2><span am-time-ago=\"event.doorTime | amFromUnix\"></span> | {{event.title}}</h2>\n                <div ng-bind-html=\"event.excerpt\"></div>\n            </a>\n            </div>\n            <div ng-repeat-end=\"\"></div>\n        </div>\n    </ion-content>\n</ion-view>");
$templateCache.put("core/event/event-update.tpl.html","<ion-view>\n    <ion-nav-title>\n        Criar Evento\n    </ion-nav-title>\n    <ion-content>\n        <div class=\"list\">\n          <label class=\"item item-input item-select\">\n            <div class=\"input-label\">\n              Tipo de Evento\n            </div>\n            <select ng-model=\"event.tags\">\n              <option>Concerto</option>\n              <option selected>Fittness</option>\n            </select>\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Hora de Entrada</span>\n            <input ng-model=\"event.doorTime\" type=\"date\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Hora de Fim</span>\n            <input ng-model=\"event.endDate\" type=\"date\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Duraçao do Evento</span>\n            <input ng-model=\"event.duration\" type=\"text\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Nome do Evento</span>\n            <input ng-model=\"event.title\" type=\"text\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Descricao curta</span>\n            <input ng-model=\"event.excerpt\" type=\"text\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">O conteudo da noticia</span>\n            <textarea ng-model=\"event.content\"></textarea>\n          </label>\n          <label class=\"item item-input\">\n          <button ng-click=\"submitForm()\" class=\"button button-stable\">Criar Evento</button>\n          </label>\n        </div>\n    </ion-content>\n</ion-view>");
$templateCache.put("core/event/event-view.tpl.html","<ion-view>\n    <ion-nav-title>\n        Evento\n    </ion-nav-title>\n    <ion-nav-buttons side=\"secondary\">\n        <button class=\"button button-clear\" ui-sref=\"event-update({id: event.id})\">Editar</button>\n    </ion-nav-buttons>\n    <ion-content>\n        <div style=\"background-image:url(https://codigo.ovh/cdn/main_22srTAcHetCNrqadskVB.png)\" class=\"cover__wrapper\">\n            <h3 class=\"item__name\" ng-bind=\"article.name\"></h3>\n        </div>\n        <div class=\"row\">\n            <div class=\"col\"><i class=\"icon ion-android-calendar\"></i> <span ng-bind=\"event.doorTime\"></span></div>\n            <div class=\"col\"><i class=\"icon ion-android-calendar\"></i> <span ng-bind=\"event.endDate\"></span></div>\n            <a ng-click=\"shareFacebook()\" class=\"col\"><i class=\"icon ion-social-facebook\"></i></a>\n            <a ng-click=\"shareTwitter()\" class=\"col\"><i class=\"icon ion-social-twitter\"></i></a>\n            <a ng-click=\"shareEmail()\" class=\"col\"><i class=\"icon ion-social-email\"></i></a>\n        </div>\n        <div ng-bind-html=\"event.content\"></div>\n        <div pi-facebook-comment page-href=\"{{event.url}}\" numposts=\"5\" colorscheme=\"light\"></div>\n    </ion-content>\n</ion-view>");
$templateCache.put("core/news/news-create.tpl.html","<ion-view>\n    <ion-nav-title>\n        Criar Evento\n    </ion-nav-title>\n    <ion-content>\n        <div class=\"list\">\n          <label class=\"item\">\n           <button ng-click=\"showFileDialog()\">Procurar Imagem</button>\n            \n\n          </label>\n          <label class=\"item item-input item-select\">\n            <div class=\"input-label\">\n              Tipo de Evento\n            </div>\n            <select ng-model=\"event.tags\">\n              <option>Concerto</option>\n              <option selected>Fittness</option>\n            </select>\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Hora de Entrada</span>\n            <input ng-model=\"event.doorTime\" type=\"date\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Hora de Fim</span>\n            <input ng-model=\"event.endDate\" type=\"date\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Duraçao do Evento</span>\n            <input ng-model=\"event.duration\" type=\"text\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Nome do Evento</span>\n            <input ng-model=\"event.title\" type=\"text\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Descricao curta</span>\n            <input ng-model=\"event.excerpt\" type=\"text\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">O conteudo da noticia</span>\n            <textarea ng-model=\"event.content\"></textarea>\n          </label>\n          <label class=\"item item-input\">\n          <button ng-click=\"submitForm()\" class=\"button button-stable\">Criar Evento</button>\n          </label>\n        </div>\n    </ion-content>\n</ion-view>");
$templateCache.put("core/news/news-list.tpl.html","<ion-view view-title=\"Noticias\">\n    <ion-content>\n        <div class=\"list\">\n            <div class=\"item-blocks\">\n                <div ng-repeat=\"category in $root.articleCategories\" class=\"list-query__item\">\n                    <button class=\"list-query__btn\" ng-bind=\"category.displayName\" ng-click=\"filterByCategory(category.id)\"></button>\n                </div>\n            </div>\n            <div class=\"item item-input-inset\">\n                <label class=\"item-input-wrapper\">\n                  <input type=\"text\" placeholder=\"Pesquisar\" ng-model=\"queryModel.text\">\n                </label>\n                <button class=\"button button-small button-clear\" ng-click=\"filterByText()\">\n                  <i class=\"icon ion-ios-search\"></i>\n                </button>\n                <button class=\"button button-small button-clear\" ng-click=\"clearText()\" ng-show=\"queryModel.text != \'\' && queryModel.text != null\">\n                  <i class=\"icon ion-close-round\"></i>\n                </button>\n              </div>\n            <div ng-repeat-start=\"current in articlesPerDay\">\n            	<a class=\"item item-positive\">\n            	<span am-time-ago=\"current.day\"></span> <small class=\"pull-right\">{{current.day}}</small>\n            	</a>\n                <a ng-repeat=\"article in current.results\" class=\"item item-thumbnail-left\" href=\"\" ui-sref=\"news-view({id: article.id})\" >\n                    <img ng-src=\"{{article.image}}\" />\n                    <h2 ng-bind=\"article.name\"></h2>\n                    <p ng-bind-html=\"article.headline\"></p>\n                </a>\n            </div>\n            <div ng-repeat-end=\"\"></div>\n             <p class=\"padding\" ng-show=\"queryModel.noResult\">\n                <p>Nao foram encontrados resultados.</p>\n                <p ng-show=\"query.model.text!==\'\'\">Tenta pesquisar com outras palavras sem ser \"<b ng-bind=\"queryModel.text\"></b>\"</p>\n                <button class=\"button button-block button-positive\">limpa a pesquisa</button>\n            </p>\n        </div>\n    </ion-content>\n</ion-view>");
$templateCache.put("core/news/news-update.tpl.html","<ion-view>\n    <ion-nav-title>\n        Criar Evento\n    </ion-nav-title>\n    <ion-content>\n        <div class=\"list\">\n          <label class=\"item item-input item-select\">\n            <div class=\"input-label\">\n              Tipo de Evento\n            </div>\n            <select ng-model=\"event.tags\">\n              <option>Concerto</option>\n              <option selected>Fittness</option>\n            </select>\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Hora de Entrada</span>\n            <input ng-model=\"event.doorTime\" type=\"date\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Hora de Fim</span>\n            <input ng-model=\"event.endDate\" type=\"date\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Duraçao do Evento</span>\n            <input ng-model=\"event.duration\" type=\"text\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Nome do Evento</span>\n            <input ng-model=\"event.title\" type=\"text\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">Descricao curta</span>\n            <input ng-model=\"event.excerpt\" type=\"text\">\n          </label>\n          <label class=\"item item-input item-stacked-label\">\n            <span class=\"input-label\">O conteudo da noticia</span>\n            <textarea ng-model=\"event.content\"></textarea>\n          </label>\n          <label class=\"item item-input\">\n          <button ng-click=\"submitForm()\" class=\"button button-stable\">Criar Evento</button>\n          </label>\n        </div>\n    </ion-content>\n</ion-view>");
$templateCache.put("core/news/news-view.tpl.html","<ion-view>\n    <ion-nav-title>\n        Noticia\n    </ion-nav-title>\n    <ion-content>\n        <div ng-style=\"{\'background\':\'url(\' + article.image + \')\'}\" class=\"cover__wrapper\">\n            <h3 class=\"item__name\" ng-bind=\"article.name\"></h3>\n        </div>\n        <div ng-bind-html=\"article.articleBody\"></div>\n        <a class=\"creative-reffer\" target=\"_blank\" ng-ref=\"{{article.refferUrl\">\n            <div class=\"creative-reffer__img\">\n                <img ng-src=\"{{article.refferImage}}\" />\n            </div>\n            <div class=\"creative-reffer__info\">\n                Escrito por<br>\n                <span class=\"creative-reffer__info-owner\" ng-bind=\"article.refferName\"></span>\n            </div>\n        </a>\n        <div class=\"row\">\n            <a ng-click=\"shareFacebook()\" class=\"col\"><i class=\"icon ion-social-facebook\"></i></a>\n            <a ng-click=\"shareTwitter()\" class=\"col\"><i class=\"icon ion-social-twitter\"></i></a>\n            <a ng-click=\"shareEmail()\" class=\"col\"><i class=\"icon ion-social-email\"></i></a>\n        </div>\n        <div pi-facebook-comment page-href=\"{{article.url}}\" numposts=\"5\" colorscheme=\"light\"></div>\n    </ion-content>\n</ion-view>");}]);