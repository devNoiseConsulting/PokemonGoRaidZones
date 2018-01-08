var mymap = L.map('mapid').setView([40.13321276, -75.44876289], 11);

L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken:
      'your.mapbox.access.token'
  }
).addTo(mymap);

let text = 'Raid Channel Here';

// #1  !sight 40.211785 -75.549030 5
L.circle(L.latLng(40.212, -75.549), 5000, {
  opacity: 1,
  weight: 1,
  fillOpacity: 0.25,
  color: '#0047AB'
})
  .bindPopup(String('#1 Royerford/Limerick'))
  .addTo(mymap);

// #2  !setup 40.2020175,-75.444939
L.circle(L.latLng(40.202, -75.445), 8000, {
  opacity: 1,
  weight: 1,
  fillOpacity: 0.25,
  color: '#0047AB'
})
  .bindPopup(String('#2 Collegville/Trappe'))
  .addTo(mymap);

// #3  !setup 40.135492,-75.526528
L.circle(L.latLng(40.135, -75.526), 5000, {
  opacity: 1,
  weight: 1,
  fillOpacity: 0.25,
  color: '#0047AB'
})
  .bindPopup(String('#3 Phoenixville'))
  .addTo(mymap);

// #4  !sight 40.1421369 -75.4261191 4
L.circle(L.latLng(40.142, -75.426), 4000, {
  opacity: 1,
  weight: 1,
  fillOpacity: 0.25,
  color: '#0047AB'
})
  .bindPopup(String('#4 Oaks/Audubon'))
  .addTo(mymap);

// #6  !setup 40.0996742,-75.4059501
L.circle(L.latLng(40.099, -75.406), 5000, {
  opacity: 1,
  weight: 1,
  fillOpacity: 0.25,
  color: '#0047AB'
})
  .bindPopup(String('#6 King of Prussia/Valley Forge'))
  .addTo(mymap);

// #7  !setup 40.0531847,-75.518217
L.circle(L.latLng(40.053, -75.518), 6000, {
  opacity: 1,
  weight: 1,
  fillOpacity: 0.25,
  color: '#0047AB'
})
  .bindPopup(String('#7 Chesterbrook/Malvern/Paoli'))
  .addTo(mymap);

// #8  !setup 40.088199,-75.270557
L.circle(L.latLng(40.088, -75.271), 4000, {
  opacity: 1,
  weight: 1,
  fillOpacity: 0.25,
  color: '#0047AB'
})
  .bindPopup(String('#8 Conshohockon/Plymouth Meeting'))
  .addTo(mymap);
