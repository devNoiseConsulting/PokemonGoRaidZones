import config from './config';
import knownGyms from './knownGyms';
let showGyms = false;

let mymap = L.map('mapid', { zoomControl: false });
new L.Control.Zoom({ position: 'bottomright' }).addTo(mymap);

let zoneLayers = L.layerGroup();
let gymLayers = L.layerGroup();

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
  if (zoneLayers) {
    mymap.removeLayer(zoneLayers);
  }
};

let zoneSort = function(a, b) {
  return b.radius - a.radius;
};

let drawArea = function(area) {
  L.rectangle(area, {color: "#000", weight: 1, fillOpacity: 0.1}).addTo(mymap);
};

let drawZones = function(zones, offset = 0) {
  removeZones();

  zones.sort(zoneSort).forEach(zone => {
    let newLayer = L.circle(L.latLng(zone.lat, zone.lng), zone.radius + offset, {
      opacity: 1,
      weight: 1,
      fillOpacity: 0.25,
      color: zone.color
    })
      .bindPopup(String(zone.text))
      .addTo(mymap);
    zoneLayers.addLayer(newLayer);
  });

  mymap.addLayer(zoneLayers);
};

let removeGyms = function() {
  if (gymLayers) {
    mymap.removeLayer(gymLayers);
  }
};

let drawGyms = function(gyms) {
  removeGyms();


    var gymIcon = L.icon({
        iconUrl: './dist/32e9ce835b73c2f75db766cd1a4babff.png',
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        popupAnchor: [0, -26]
    });

  gyms.forEach(gym => {
    let newLayer = L.marker([gym.lat, gym.lng], {icon: gymIcon})
      .bindPopup(String(gym.name));
    gymLayers.addLayer(newLayer);
  });

  //mymap.addLayer(gymLayers);
};

// drawArea(config.area);
drawZones(config.zones);
// drawZones(config.zones, -1000);
drawGyms(knownGyms);

const toggleGyms = function(e) {
  console.log('toggle gyms');
  e.preventDefault();

  if (showGyms) {
    mymap.removeLayer(gymLayers);
    showGyms = false;
  } else {
    mymap.addLayer(gymLayers);
    showGyms = true;
  }
}

const gymButton = document.querySelector('#gym-toggle');
gymButton.addEventListener('click', toggleGyms);
