(function(){
	angular
		.module('stuv.common')
		.provider('stuv.common.responseUtilsSvc', [function(){

			return {
				$get: function(){
					return {
						orderByNewest: function(items, keyDate) {
							if(!_.isArray(items) || !_.isString(keyDate)) {
								return null;
							}

							var events = _.groupBy(items, function (event) {
		                      return moment.utc(event[keyDate], 'X').startOf('day').format('DD-MM-YYYY');
		                    });

		                    events = _.map(events, function(group, day){
		                        return {
		                            day: day,
		                            results: group
		                        }
		                    });

							return events;
						}
					}
				}
			}
		}]);
})();