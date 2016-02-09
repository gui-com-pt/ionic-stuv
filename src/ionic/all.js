(function(){
	angular
		.module('stuv')
		  .directive('piScroller', ['$timeout', function($timeout) {
		      return {
		        restrict: 'E',
		        template: '<div class="pi-scroller" ng-transclude></div>',
		        replace: true,
		        transclude: true,

		        compile: function(element, attr) {
		          return function($scope, $element, $attr) {

		            var el = $element[0];
		            angular.element(el).bind("scroll", function(){
		              var left = $element[0].scrollLeft;
		              // console.log($element.childNodes);
		            });


		          }
		        },
		      }
		    }
		])
		.directive('piCardH', ['$rootScope', function($rootScope) {
		      return {
		        restrict: 'E',
		        template: '<div class="pi-card-h" ng-transclude></div>',
		        replace: true,
		        transclude: true,
		        scope: {
		          desc: '@',
		          image: '@',
		          index: '@'
		        },
		        link: function(scope, element, attrs){
		          var img = angular.element("<img class='pi-scroller-img' src='"+attrs.image+"' />");
		          element.append(img);
		          element.append('<div class="pi-scroller-label">'+attrs.desc+'</div>');
		          var animationClass = 'pi-scroller-card-animated-' + attrs.index.toString();
		          element.addClass(animationClass);

		        },

		      }
		    }
		]);

})();