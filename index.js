import config from './config';

let geoLayers;

let mymap = L.map('mapid').setView([
  40.13321276, -75.44876289
], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: config.mapboxAccessToken
}).addTo(mymap);

// let zones = [
//   {
//     lat: 40.211785,
//     lng: -75.549030,
//     radius: 5000,
//     text: '#1 Royerford/Limerick'
//   }, {
//     lat: 40.2020175,
//     lng: -75.444939,
//     radius: 8000,
//     text: '#2 Collegville/Trappe'
//   }, {
//     lat: 40.135492,
//     lng: -75.526528,
//     radius: 5000,
//     text: '#3 Phoenixville'
//   }, {
//     lat: 40.1421369,
//     lng: -75.4261191,
//     radius: 4000,
//     text: '#4 Oaks/Audubon'
//   }, {
//     lat: 40.0996742,
//     lng: -75.4059501,
//     radius: 5000,
//     text: '#6 King of Prussia/Valley Forge'
//   }, {
//     lat: 40.0531847,
//     lng: -75.518217,
//     radius: 6000,
//     text: '#7 Chesterbrook/Malvern/Paoli'
//   }, {
//     lat: 40.088199,
//     lng: -75.270557,
//     radius: 4000,
//     text: '#8 Conshohockon/Plymouth Meeting'
//   }
// ];

let removeBreweries = function() {
  if (geoLayers) {
    mymap.removeLayer(geoLayers);
  }
};

let zoneSort = function(a, b) {
  return b.radius - a.radius;
};

let drawZones = function(zones) {
  removeBreweries();

  geoLayers = L.layerGroup();

  zones.sort(zoneSort).forEach(zone => {
    let newLayer = L.circle(L.latLng(zone.lat, zone.lng), zone.radius, {
      opacity: 1,
      weight: 1,
      fillOpacity: 0.25,
      color: zone.color
    }).bindPopup(String(zone.text)).addTo(mymap);
    geoLayers.addLayer(newLayer);
  });

  mymap.addLayer(geoLayers);
}

drawZones(config.zones);
