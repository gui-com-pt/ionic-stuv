(function(){

  angular
    .module('stuv.core')
    .controller('stuv.core.place.placeListMapCtrl', ['$ionicModal', 'stuv.common.responseUtilsSvc', 'pi.core.place.placeSvc', '$scope', '$stateParams', '$rootScope', '$q', function($ionicModal, responseUtilsSvc, placeSvc, $scope, $stateParams, $rootScope, $q){

      var mbAccessToken = 'pk.eyJ1IjoiZ3VpbGhlcm1lZ2VlayIsImEiOiJjaWlndXM1eXAwMDN0dnJrcmIydWpzNHRmIn0.4N9q6HjOGEiksMCvhYR9cQ';
      
      $scope.layers = {
        baselayers: {
          osm: {
            name: 'Mapbox',
            type: 'xyz',
            url: 'https://api.mapbox.com/v4/mapbox.streets/0/0/0.png?access_token=pk.eyJ1IjoiZ3VpbGhlcm1lZ2VlayIsImEiOiJjaWlndXM1eXAwMDN0dnJrcmIydWpzNHRmIn0.4N9q6HjOGEiksMCvhYR9cQ'
          }
        }
      };

      $scope.center = {
        lat: null,
        lng: null,
        zoom: 18
      }

      $scope.defaults = {
        scrollWheelZoom: false,
        // maxZoom: 22
      }

      var getClusterResult = function(nodes) {
        var totalVotes = nodes.length;
        var pollName = '';
        var votesObj = {};

        //computes counts for each vote
        $.each(nodes, function(index) {
          if (!pollName) {
            pollName = this.feature.properties.pollName;
          }
          var voteKey = this.feature.properties.vote;

          if (!(voteKey in votesObj)) {
            votesObj[voteKey] = 1;
          } else {
            votesObj[voteKey] += 1;
          }
        });
        // returns object of all votes
        return {
          pollName: pollName,
          votesObj: votesObj,
          totalVotes: totalVotes
        };
      };

     function addGeoJsonLayerWithClustering(data) {
        var markers = L.markerClusterGroup({
          showCoverageOnHover: false,
          zoomToBoundsOnClick: false
        });
        markers.on('clusterclick', function(a) {
          var children = a.layer.getAllChildMarkers();
          var resultObj = getClusterResult(children);

          popupContent = '<div>' +
            '<p><b>' + resultObj.pollName + '</b></p>' +
            '<p>Votes: ' + resultObj.totalVotes + '</p>' +
            '<p>yes:' + resultObj.votesObj.Yes + '</p>' +
            '<p>no:' + resultObj.votesObj.No + '</p>' +
            '</div>';

          a.layer.bindPopup(popupContent, {
            closeButton: true,
            keepInView: true
          }).openPopup();

        });
        var geoJsonLayer = L.geoJson(data, {
          onEachFeature: function(feature, layer) {
            // layer.bindPopup(feature.properties.vote);
          }
        });
        markers.addLayer(geoJsonLayer);
        leafletData.getMap().then(function(map) {
          map.addLayer(markers);
          map.fitBounds(markers.getBounds());
        });
      }

  }]);

})();