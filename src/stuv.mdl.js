var appVersion = "0.0.0";
(function(){
	/*
	 * Templates are cached with gulp-angular-templatecache on templates module
	 * We need to create it
	 */
	angular
		.module('templates', []);

	angular
		.module('stuv', [
			'stuv.core',
			'stuv.core.event',
			'stuv.core.news',
			'stuv.core.bus',
			'stuv.core.place',
			'stuv.core.tourism',
			'angularMoment',
			'stuv.common',
			'templates',
			'ionic',
			'ngCordova',
            'leaflet-directive',
            'ngFileUpload',
            'pi',
            'pi.core',
            'pi.core.app',
            'pi.core.place',
            'pi.ionic',
            'pascalprecht.translate',
            'ionic.rating',
            'ngGPlaces'
			])
		.config(['ngGPlacesAPIProvider', '$cordovaAppRateProvider', '$ionicConfigProvider', 'piProvider', 'piHttpProvider', 'facebookMetaServiceProvider', '$stateProvider', '$cordovaFacebookProvider', 
			function(ngGPlacesAPIProvider, $cordovaAppRateProvider, $ionicConfigProvider, piProvider, piHttpProvider, facebookMetaServiceProvider, $stateProvider, $cordovaFacebookProvider){

				$ionicConfigProvider.tabs.position('bottom');

				var prefs = {
					language: 'pt',
					appName: 'Viseu',
					androidURL: 'market://details?id=com.guilhermecardoso.viseu'
				};
				try {
					$cordovaAppRateProvider.setPreferences(prefs);	
				}
				catch(err) {

				}
				

				ngGPlacesAPIProvider.setDefaults({
					radius: 500,
					nearbySearchKeys: ['name', 'reference', 'vicinity', 'id', 'place_id', 'icon', 'reference', 'photos', 'types'],
					 placeDetailsKeys: ['formatted_address', 'formatted_phone_number',
				        'reference', 'website', 'place_id', 'geometry', 'name', 'photos', 'formatted_phone_number',
				        'international_phone_number', 'rating', 'reviews', 'types'
				    ],
				});

				piHttpProvider.setBaseUrl('http://localhost/api');
		        facebookMetaServiceProvider.setAuthor('https://www.facebook.com/living.with.jesus');
		        facebookMetaServiceProvider.setPublisher('https://www.facebook.com/viseu.ovh');
		        facebookMetaServiceProvider.setSiteName('Viseu');
		        facebookMetaServiceProvider.setType('article');
		        facebookMetaServiceProvider.setLocale('pt_PT');
		        facebookMetaServiceProvider.setImage('https://image.freepik.com/free-vector/web-programmer_23-2147502079.jpg');

		        var appID = 123456789;
		        var version = "v2.0"; // or leave blank and default is v2.0
		        //$cordovaFacebookProvider.browserInit(appID, version);
		        piProvider.setAppId('viseu');

				$stateProvider
					.state('home', {
						url: '/home',
						controller: 'stuv.core.homeCtrl',
						templateUrl: 'core/home.tpl.html'
					})
					.state('webcam', {
						url: '/webcam',
						controller: 'stuv.core.webcamCtrl',
						controllerAs: 'ctrl',
						templateUrl: 'core/webcam.tpl.html'
					})
					.state('login', {
						url: '/login',
						controller: 'stuv.core.loginCtrl',
						controllerAs: 'ctrl',
						templateUrl: 'core/login.tpl.html'
					})
					.state('support', {
						url: '/support',
						controller: 'stuv.core.supportCtrl',
						templateUrl: 'core/support.tpl.html'
					})
					.state('roadmap', {
						url: '/roadmap',
						templateUrl: 'core/roadmap.tpl.html'
					})
					.state('weather', {
						url: '/weather',
						templateUrl: 'core/weather.tpl.html',
					})
					.state('profile', {
						url: '/profile',
						controller: 'ProfileCtrl',
						templateUrl: 'core/user/profile.tpl.html'
					})
					.state('wizard', {
						templateUrl: 'core/wizard.tpl.html',
						url: '/',
						controller: 'wizardCt'
					});
		}])
		.controller('wizardCt', function($scope, $state, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})
		.run(['$cordovaGoogleAnalytics', 'googlePlaceTypeEnum', '$ionicPlatform', '$ionicLoading', '$cordovaGeolocation', '$state', 'stuv.core.setupSvc', 'pi.core.app.eventCategorySvc', 'pi.core.article.articleCategorySvc', '$rootScope', 'stuv', '$log', 
			function($cordovaGoogleAnalytics, googlePlaceTypeEnum, $ionicPlatform, $ionicLoading, $cordovaGeolocation, $state, setupSvc, eventCategorySvc, articleCategorySvc, $rootScope, stuv, $log){

				function boot(){	
	    			$rootScope.booted = true;
	                $state.go("home");
				}

				$rootScope.events = [
	            {
	                id: 1, 
	                doorTime: '1 Junho',
	                image: 'http://www.cm-viseu.pt/images/_Y0A7660.jpg',
	                title: 'Milhares de crianças participam amanhã do “seu” Dia, em Viseu',
	                content: '<p>Viseu associa-se amanhã, 1 de junho, às comemorações do Dia Mundial da Criança. A cidade-jardim dedica aos mais novos inúmeras atividades em vários espaços e locais da cidade, a contar com milhares de crianças.</p<p>Para o Presidente da Câmara Municipal, Almeida Henriques, “Viseu é uma cidade educadora e amiga das famílias e das crianças. Queremos fazer deste dia uma celebração especialmente feliz para os nossos mais jovens munícipes”.</p><p>Na semana em que assinala o seu 14º aniversário, a Biblioteca Municipal D. Miguel da Silva promove espetáculos de teatro para os petizes, desenvolvidos a partir da literatura infantil e do mundo fantástico, para além de outros ‘aperitivos’ como música e magia. “Magia na Estrada” terá lugar pelas 10 e 11 horas, mas também pelas 15H30 e 16H30. Já os “Contos e Cantos” realiza-se às 14H30.</p><p>Os Museus Municipais integram também os espaços aderentes neste dia. Pelas 10, 11, 14, 15 e 16 horas, as crianças são convidadas a participar em momentos de diversão e aprendizagem, todos eles alusivos à temática de cada espaço museológico. Pinturas em murais, atividades sonoras, construção de brinquedos, caças ao tesouro e exploração de minerais são alguns dos desafios para os mais pequenos poderem desfrutar.</p><p>Para todos aqueles que gostam de apreciar o ar livre e os espaços verdes da cidade-jardim, haverá também lugar a atividades nos Parques do Fontelo e Aquilino Ribeiro, entre as 9 e as 13 horas.</p><p>No Parque da Cidade, “Jardins Lúdicos” irá por conhecimentos à prova, abordados em contexto de sala de aula, na disciplina de Estudo do Meio. No Fontelo, as crianças poderão participar em jogos tradicionais e peddy-papers. As atividades são desenvolvidas pelos alunos do 1º ano do curso de Turismo da Escola Superior de Tecnologia e Gestão de Viseu.</p><p>Neste dia, as crianças terão ainda oportunidade de subir a bordo do comboio turístico e descobrir a cidade e os seus encantos. As visitas são gratuitas até aos 12 anos e realizam-se de manhã, entre as 9H30 e as 12 horas, e à tarde, entre as 14 horas e as 17H30, com saídas a cada 30 minutos.</p><p>Em Dia da Criança, também se pedala em Viseu. A cidade-jardim é ponto de partida do 26º Grande Prémio de Ciclismo do Jornal de Notícias e recebe um pelotão de elite na disputa pela vitória. Amanhã, pelas 18 horas, terá início o prólogo de 4,5 quilómetros, na Avenida da Europa. Quinta-feira, 2 de junho, arranca a 1ª etapa da prova, pelas 12H25, na mesma avenida.</p><p>Também amanhã, entre as 9H30 e as 13 horas, a Quinta do Soqueiro, em Viseu, acolhe 550 crianças do 1º ciclo do ensino básico de algumas escolas da cidade, para uma manhã dedicada à Proteção Civil, com diversas atividades lúdicas e pedagógicas.  A iniciativa é promovida pelo Comando Distrital de Operações de Socorro (CDOS) de Viseu, em parceria com o Instituto da Conservação da Natureza e Florestas, e conta com a participação de diversas entidades e agentes de proteção civil de Viseu, entre eles os Bombeiros Municipais e Voluntários de Viseu, Polícia Municipal, PSP e GNR. Neste espaço, sede do Instituto da Conservação da Natureza e Florestas, as crianças poderão contactar com agentes e equipas e conhecer o seu trabalho, numa interação que visa o envolvimento da comunidade escolar na importância da segurança mas também da preservação ambiental.</p>'
	            },
	            {
	                id: 2,
	                doorTime: '27 Maio 18:00-19:00',
	                image:'http://www.cm-viseu.pt/images/_concurso.jpg',
	                title: 'Artistas mundiais desafiados a reinterpretar os sons do mundo rural do concelho',
	                content: '<p>Explorações Sonoras de um Arquivo Rural é o nome do Concurso Internacional de Música Eletroacústica e Arte Sonora, promovido pela Binaural/Nodar, no âmbito do projeto “Viseu Rural 2.0”. As candidaturas têm início hoje, 1 de junho, e prolongam-se até 30 de setembro.</p<p>Ao longo de 2015, a equipa do projeto "Viseu Rural 2.0" recolheu e organizou um arquivo audiovisual alusivo à ruralidade do concelho, constituído por mais de uma centena de documentos. Agora, artistas sonoros e músicos eletroacústicos de todo o mundo são convidados a conhecer o arquivo, a pensar e expressar a sua perspetiva sobre o contexto rural de Viseu através da criação de obras sonoras, numa lógica de expansão e divulgação desta identidade tão presente nas freguesias do concelho.</p<p>Os interessados têm à sua disposição parte do arquivo na página web do projeto, disponível em www.viseururalmedia.org, podendo escolher os excertos e trabalhá-los livremente, existindo a possibilidade de adicionar outras fontes ou processamentos sonoros. Cada obra a submeter deverá ter uma duração de 10 minutos, acompanhada de título, sinopse, imagem e nota biográfica do seu autor.</p><p>Os trabalhos submetidos serão alvo de apreciação por parte de um júri que irá eleger e premiar 20 criações. Os vencedores irão expor coletivamente os seus trabalhos na Casa da Ribeira, em Viseu, a partir de dezembro.</p><p>O projeto “Viseu Rural 2.0” é cofinanciado pelo Município de Viseu, no âmbito do programa de apoio à criatividade e cultura VISEU TERCEIRO, e pelo Programa Europa Criativa da União Europeia, da Rede SOCCOS. Este é um projeto de inventariação e documentação patrimonial, de criação artística sonora, de media e difusão cultural, com vista à valorização e divulgação da identidade rural de Viseu.</p>'
	            },
	            {
	                id: 3,
	                image: 'http://www.cm-viseu.pt/images/FEIRA15_5I3A3834.jpg',
	                title: 'Feira de São Mateus 2016 com ingressos a partir de hoje',
	                content: '<p>A partir de hoje, terça-feira, está aberta a bilheteira para os 16 dias pagos da Feira de São Mateus, de Viseu, em 2016.<p>Estes 16 dias de entrada paga são relativos ao cartaz principal do evento, que se realizará durante 38 dias, entre 5 de Agosto e 11 de Setembro.</p><p>O cartaz principal da Feira de São Mateus também é já conhecido por completo. No Palco Banco BIC atuarão nomes como Mariza, THE GIFT, Rui Veloso, Carlão, GNR, David Carreira, Dengaz, AGIR, D.A.M.A., C4 Pedro, Ana Malhoa, Diogo Piçarra, Amor Electro, Jorge Palma & Sérgio Godinho e Camané.</p><p>“É o melhor cartaz de sempre, que pisca o olho a todos os públicos, a visitantes e a turistas”, defendeu esta segunda-feira a organização, a cargo da associação Viseu Marca.</p><p>A organização do certame anunciou ainda a mais precoce abertura da bilheteira da mais antiga feira franca viva da Península Ibérica. “Face a 2015, antecipamos a abertura da bilheteira 50 dias”, afirmou Jorge Sobrado, Gestor da Viseu Marca. “A medida visa aumentar a acessibilidade e o número de visitantes no certame e diminuir significativamente as filas de espera durante o evento.”</p><p>Neste contexto, a organização anunciou ainda novos meios de compra de bilhetes. A partir de hoje será possível adquirir bilhetes para os dias pagos da Feira na Internet, no site do evento e no site da Blueticket, assim como na rede nacional de lojas associadas (Fnac, Worten, Media Markt, ACP, El Corte Inglés e rede Pagaqui). Outra das novidades está na disponibilização de quiosques de venda automática na cidade de Viseu, nos dois shoppings e na Central de Transportes.</p><p>Na apresentação do cartaz e bilheteira, a Viseu Marca anunciou ainda “prosseguir uma política de preços amiga dos visitantes e das famílias”. Os bilhetes serão vendidos com descontos até 30 de Junho, a 2,5 EUR, 4 EUR e 6 EUR. A partir de 1 de Julho, os mesmos ingressos passarão a custar 3, 5 e 7,5 Euros.</p><p>“No seu segmento, a Feira de São Mateus é o certame mais acessível do país, sem prejuízo de uma qualidade superior na sua oferta”, referiu Jorge Sobrado. Face ao ano passado, a Feira de São Mateus terá em 2016 menos um dia de entrada paga e menos dois dias com preços superiores. O cabaz total dos bilhetes diminui em 6 euros, de 68 para 62 euros. Ainda assim, será adotado o passe geral a 40 Euros</p><p>Famílias a partir de 4 pessoas terão descontos de 1 bilhete por cada 4. Seniores, estudantes e cidadãos com deficiência beneficiarão também de desconto no ingresso.</p><p>Segundo a Organização, “esta política de preços faz justiça à tradição popular do evento e ao objetivo do Município e da Viseu Marca em afirmar a Feira de São Mateus como um evento para todos. Desejamos uma feira amiga das pessoas, dos visitantes e dos turistas”.</p><p>Em 2016, a mais antiga feira franca viva da Península Ibérica adota o slogan “É de feirar por mais!”</p>'
	            },
	            {
	                id: 4,
	                image: 'http://www.cm-viseu.pt/images/2nh.jpg',
	                title: 'Assembleia Municipal de Viseu',
	                content: 'Numa perspetiva de abertura à sociedade, de desenvolvimento de estratégias de cooperação e de promoção da proximidade nas relações com os cidadãos, a Mesa da Assembleia Municipal de Viseu e os representantes dos Grupos Municipais estão disponíveis para audiência dos cidadãos.No mês de junho, o dia de audiência será na segunda feira, dia 6, pelas 19 horas.Local: Solar dos Peixotos, Rua Cimo de Vila '
	            }
	            ];

	            $rootScope.articles = [
	            {
	                id: 1, 
	                image: 'http://www.cm-viseu.pt/images/_Y0A7660.jpg',
	                name: 'Milhares de crianças participam amanhã do “seu” Dia, em Viseu',
	                articleBody: '<p>Viseu associa-se amanhã, 1 de junho, às comemorações do Dia Mundial da Criança. A cidade-jardim dedica aos mais novos inúmeras atividades em vários espaços e locais da cidade, a contar com milhares de crianças.</p<p>Para o Presidente da Câmara Municipal, Almeida Henriques, “Viseu é uma cidade educadora e amiga das famílias e das crianças. Queremos fazer deste dia uma celebração especialmente feliz para os nossos mais jovens munícipes”.</p><p>Na semana em que assinala o seu 14º aniversário, a Biblioteca Municipal D. Miguel da Silva promove espetáculos de teatro para os petizes, desenvolvidos a partir da literatura infantil e do mundo fantástico, para além de outros ‘aperitivos’ como música e magia. “Magia na Estrada” terá lugar pelas 10 e 11 horas, mas também pelas 15H30 e 16H30. Já os “Contos e Cantos” realiza-se às 14H30.</p><p>Os Museus Municipais integram também os espaços aderentes neste dia. Pelas 10, 11, 14, 15 e 16 horas, as crianças são convidadas a participar em momentos de diversão e aprendizagem, todos eles alusivos à temática de cada espaço museológico. Pinturas em murais, atividades sonoras, construção de brinquedos, caças ao tesouro e exploração de minerais são alguns dos desafios para os mais pequenos poderem desfrutar.</p><p>Para todos aqueles que gostam de apreciar o ar livre e os espaços verdes da cidade-jardim, haverá também lugar a atividades nos Parques do Fontelo e Aquilino Ribeiro, entre as 9 e as 13 horas.</p><p>No Parque da Cidade, “Jardins Lúdicos” irá por conhecimentos à prova, abordados em contexto de sala de aula, na disciplina de Estudo do Meio. No Fontelo, as crianças poderão participar em jogos tradicionais e peddy-papers. As atividades são desenvolvidas pelos alunos do 1º ano do curso de Turismo da Escola Superior de Tecnologia e Gestão de Viseu.</p><p>Neste dia, as crianças terão ainda oportunidade de subir a bordo do comboio turístico e descobrir a cidade e os seus encantos. As visitas são gratuitas até aos 12 anos e realizam-se de manhã, entre as 9H30 e as 12 horas, e à tarde, entre as 14 horas e as 17H30, com saídas a cada 30 minutos.</p><p>Em Dia da Criança, também se pedala em Viseu. A cidade-jardim é ponto de partida do 26º Grande Prémio de Ciclismo do Jornal de Notícias e recebe um pelotão de elite na disputa pela vitória. Amanhã, pelas 18 horas, terá início o prólogo de 4,5 quilómetros, na Avenida da Europa. Quinta-feira, 2 de junho, arranca a 1ª etapa da prova, pelas 12H25, na mesma avenida.</p><p>Também amanhã, entre as 9H30 e as 13 horas, a Quinta do Soqueiro, em Viseu, acolhe 550 crianças do 1º ciclo do ensino básico de algumas escolas da cidade, para uma manhã dedicada à Proteção Civil, com diversas atividades lúdicas e pedagógicas.  A iniciativa é promovida pelo Comando Distrital de Operações de Socorro (CDOS) de Viseu, em parceria com o Instituto da Conservação da Natureza e Florestas, e conta com a participação de diversas entidades e agentes de proteção civil de Viseu, entre eles os Bombeiros Municipais e Voluntários de Viseu, Polícia Municipal, PSP e GNR. Neste espaço, sede do Instituto da Conservação da Natureza e Florestas, as crianças poderão contactar com agentes e equipas e conhecer o seu trabalho, numa interação que visa o envolvimento da comunidade escolar na importância da segurança mas também da preservação ambiental.</p>',
	                datePublished: 'há 1 minuto',
	                keywords: ['CMV', 'Crianças']
	            },
	            {
	                id: 2,
	                image:'http://www.cm-viseu.pt/images/_concurso.jpg',
	                name: 'Artistas mundiais desafiados a reinterpretar os sons do mundo rural do concelho',
	                articleBody: '<p>Explorações Sonoras de um Arquivo Rural é o nome do Concurso Internacional de Música Eletroacústica e Arte Sonora, promovido pela Binaural/Nodar, no âmbito do projeto “Viseu Rural 2.0”. As candidaturas têm início hoje, 1 de junho, e prolongam-se até 30 de setembro.</p<p>Ao longo de 2015, a equipa do projeto "Viseu Rural 2.0" recolheu e organizou um arquivo audiovisual alusivo à ruralidade do concelho, constituído por mais de uma centena de documentos. Agora, artistas sonoros e músicos eletroacústicos de todo o mundo são convidados a conhecer o arquivo, a pensar e expressar a sua perspetiva sobre o contexto rural de Viseu através da criação de obras sonoras, numa lógica de expansão e divulgação desta identidade tão presente nas freguesias do concelho.</p<p>Os interessados têm à sua disposição parte do arquivo na página web do projeto, disponível em www.viseururalmedia.org, podendo escolher os excertos e trabalhá-los livremente, existindo a possibilidade de adicionar outras fontes ou processamentos sonoros. Cada obra a submeter deverá ter uma duração de 10 minutos, acompanhada de título, sinopse, imagem e nota biográfica do seu autor.</p><p>Os trabalhos submetidos serão alvo de apreciação por parte de um júri que irá eleger e premiar 20 criações. Os vencedores irão expor coletivamente os seus trabalhos na Casa da Ribeira, em Viseu, a partir de dezembro.</p><p>O projeto “Viseu Rural 2.0” é cofinanciado pelo Município de Viseu, no âmbito do programa de apoio à criatividade e cultura VISEU TERCEIRO, e pelo Programa Europa Criativa da União Europeia, da Rede SOCCOS. Este é um projeto de inventariação e documentação patrimonial, de criação artística sonora, de media e difusão cultural, com vista à valorização e divulgação da identidade rural de Viseu.</p>',
	                datePublished: 'há 1 minuto',
	                keywords: ['CMV', 'Concurso']
	            },
	            {
	                id: 3,
	                image: 'http://www.cm-viseu.pt/images/FEIRA15_5I3A3834.jpg',
	                name: 'Feira de São Mateus 2016 com ingressos a partir de hoje',
	                articleBody: '<p>A partir de hoje, terça-feira, está aberta a bilheteira para os 16 dias pagos da Feira de São Mateus, de Viseu, em 2016.<p>Estes 16 dias de entrada paga são relativos ao cartaz principal do evento, que se realizará durante 38 dias, entre 5 de Agosto e 11 de Setembro.</p><p>O cartaz principal da Feira de São Mateus também é já conhecido por completo. No Palco Banco BIC atuarão nomes como Mariza, THE GIFT, Rui Veloso, Carlão, GNR, David Carreira, Dengaz, AGIR, D.A.M.A., C4 Pedro, Ana Malhoa, Diogo Piçarra, Amor Electro, Jorge Palma & Sérgio Godinho e Camané.</p><p>“É o melhor cartaz de sempre, que pisca o olho a todos os públicos, a visitantes e a turistas”, defendeu esta segunda-feira a organização, a cargo da associação Viseu Marca.</p><p>A organização do certame anunciou ainda a mais precoce abertura da bilheteira da mais antiga feira franca viva da Península Ibérica. “Face a 2015, antecipamos a abertura da bilheteira 50 dias”, afirmou Jorge Sobrado, Gestor da Viseu Marca. “A medida visa aumentar a acessibilidade e o número de visitantes no certame e diminuir significativamente as filas de espera durante o evento.”</p><p>Neste contexto, a organização anunciou ainda novos meios de compra de bilhetes. A partir de hoje será possível adquirir bilhetes para os dias pagos da Feira na Internet, no site do evento e no site da Blueticket, assim como na rede nacional de lojas associadas (Fnac, Worten, Media Markt, ACP, El Corte Inglés e rede Pagaqui). Outra das novidades está na disponibilização de quiosques de venda automática na cidade de Viseu, nos dois shoppings e na Central de Transportes.</p><p>Na apresentação do cartaz e bilheteira, a Viseu Marca anunciou ainda “prosseguir uma política de preços amiga dos visitantes e das famílias”. Os bilhetes serão vendidos com descontos até 30 de Junho, a 2,5 EUR, 4 EUR e 6 EUR. A partir de 1 de Julho, os mesmos ingressos passarão a custar 3, 5 e 7,5 Euros.</p><p>“No seu segmento, a Feira de São Mateus é o certame mais acessível do país, sem prejuízo de uma qualidade superior na sua oferta”, referiu Jorge Sobrado. Face ao ano passado, a Feira de São Mateus terá em 2016 menos um dia de entrada paga e menos dois dias com preços superiores. O cabaz total dos bilhetes diminui em 6 euros, de 68 para 62 euros. Ainda assim, será adotado o passe geral a 40 Euros</p><p>Famílias a partir de 4 pessoas terão descontos de 1 bilhete por cada 4. Seniores, estudantes e cidadãos com deficiência beneficiarão também de desconto no ingresso.</p><p>Segundo a Organização, “esta política de preços faz justiça à tradição popular do evento e ao objetivo do Município e da Viseu Marca em afirmar a Feira de São Mateus como um evento para todos. Desejamos uma feira amiga das pessoas, dos visitantes e dos turistas”.</p><p>Em 2016, a mais antiga feira franca viva da Península Ibérica adota o slogan “É de feirar por mais!”</p>',
	                datePublished: 'há 2 horas',
	                keywords: ['CMV', 'Feira SM']
	            },
	            {
	                id: 4,
	                image: 'http://www.cm-viseu.pt/images/2nh.jpg',
	                name: 'Assembleia Municipal de Viseu',
	                articleBody: 'Numa perspetiva de abertura à sociedade, de desenvolvimento de estratégias de cooperação e de promoção da proximidade nas relações com os cidadãos, a Mesa da Assembleia Municipal de Viseu e os representantes dos Grupos Municipais estão disponíveis para audiência dos cidadãos.No mês de junho, o dia de audiência será na segunda feira, dia 6, pelas 19 horas.Local: Solar dos Peixotos, Rua Cimo de Vila ',
	                datePublished: 'há 1 dia',
	                keywords: ['CMV']
	            }
	            ];

				$rootScope.googlePlaceTypes = googlePlaceTypeEnum;
				$rootScope.booted = false;

				$rootScope.position = {latitude:40.657155, longitude:-7.913674};
				$rootScope.currentLocation = function() {
					$cordovaGeolocation.getCurrentPosition()
						.then(function(pos) {
							return {
								latitude: position.coords.latitude,
								longitude: position.coords.longitude
							}
						})
				}

				$rootScope.$on('http:start', function(){
						$ionicLoading.show({
						template: 'show'
					});
				});

				$rootScope.$on('http:end', function(){
					$ionicLoading.hide();
				});

				

				articleCategorySvc.find({take: 100})
			        .then(function(res){
			          $rootScope.articleCategories = res.data.categories;
			        });
			        
			    eventCategorySvc.find({take: 100})
			        .then(function(res){
			          $rootScope.eventCategories = res.data.events;
			        });


			    function loadDatabase() {
			    	try {
			    		window.plugins.sqlDB.copy("viseuapp.db", function() {
			            	db = $cordovaSQLite.openDB("viseuapp.db");
				        }, function(error) {
				            console.error("There was an error copying the database: " + error);
				            db = $cordovaSQLite.openDB("viseuapp.db");
				            $log.info('default sqlite database loaded.');
				        });
				    } catch(err) {
				    	$log.error(err);
				    }
				    finally {

				    }
			    }

				$ionicPlatform.ready(function() {
				    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				    // for form inputs)
				    if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				    }

				    try {
						$cordovaGoogleAnalytics.startTrackerWithId('UA-73381368-1');	
						$log.debug('Google Analytics configured')
					}
					catch(err) {
						$log.error('Error seting Google Analytics tracker id: ' + err);
					}

				    if(window.StatusBar) {
				      StatusBar.styleDefault();
				    }
				    loadDatabase();
	                setupSvc.reset();

	                stuv.init()
	            	.then(function(){
	            		boot();		
	            	}, function(){
	            		boot();
	            	});

	            	// Assign the app version
	            	try {
	            		cordova.getAppVersion(function(version) {
			                appVersion = version;
			            });	
	            	}
	            	catch(err) {
	            		$log.error('Error getting Application version: ' + err);
	            		appVersion = '0.0.1';
	            	}
	            	
	            	
				 });
			  	

			  	$rootScope.$on('$stateChangeStart',
				    function(event, toState, toParams, fromState, fromParams){
				    	if(!$rootScope.booted) {
				    		event.preventDefault();
				    		return;
				    	}
				    	return;
				        // check if user is set
	//			        if(!$rootScope.userId && toState.name !== 'login'){  
				            event.preventDefault();

				            stuv.init()
				            	.then(function(){
				            		event.currentScope.$apply(function() {
					                    $state.go("home")
					                });	
				            	})
				    }
				);
		}]);
})();