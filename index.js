import config from './config';

let geoLayers;

let mymap = L.map('mapid', { zoomControl: false });
new L.Control.Zoom({ position: 'bottomright' }).addTo(mymap);

function resetMap() {
  mymap.setView(
    [config.startPoint.lat, config.startPoint.lng],
    config.startPoint.zoom
  );
}

resetMap();

const homeButton = document.querySelector('#home');
homeButton.addEventListener('click', resetMap);

const brandButton = document.querySelector('.navbar-brand');
brandButton.addEventListener('click', resetMap);

L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: config.mapboxAccessToken
  }
).addTo(mymap);

let removeZones = function() {
  if (geoLayers) {
    mymap.removeLayer(geoLayers);
  }
};

let zoneSort = function(a, b) {
  return b.radius - a.radius;
};

let drawZones = function(zones) {
  removeZones();

  geoLayers = L.layerGroup();

  zones.sort(zoneSort).forEach(zone => {
    let newLayer = L.circle(L.latLng(zone.lat, zone.lng), zone.radius, {
      opacity: 1,
      weight: 1,
      fillOpacity: 0.25,
      color: zone.color
    })
      .bindPopup(String(zone.text))
      .addTo(mymap);
    geoLayers.addLayer(newLayer);

    // let newLayer2 = L.circle(L.latLng(zone.lat, zone.lng), zone.radius - 1000, {
    //   opacity: 1,
    //   weight: 1,
    //   fillOpacity: 0.25,
    //   color: zone.color
    // })
    //   .bindPopup(String(zone.text))
    //   .addTo(mymap);
    // geoLayers.addLayer(newLayer2);
  });

  mymap.addLayer(geoLayers);
};

drawZones(config.zones);
