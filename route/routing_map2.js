var map = L.map('routingmap');

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
		}).addTo(map);

    
	
var routing = L.Routing.control({
  waypoints: [
    L.latLng(47.56, 12.12),
    L.latLng(47, 12.54)
  ],
  routeWhileDragging: true,
  //geocoder: L.Control.Geocoder.nominatim()
}).addTo(map);

//routingkarte.setView([47.56, 12.12]),9;

//Variable für den ersten geklickten Punkt
var first_point = null;

// Routing control hinzufügen und minimieren
var routing_control = L.Routing.control({
	show:false
}).addTo(map);



// Klicks auf Karte verarbeiten

map.on("click", function (event) {
if (first_point){
//zeichnen der Route
console.log("2. Punkt", event);

// Wegpunkte zeichnen und Routing control zeigen
routing_control.setWaypoints([
first_point],

routeWhileDragging:true, 
event.latlng
routing_control.show();
]);

//ersten Punkt wieder löschen
first_point = null;
} else {

// Routing control minimieren
routing_control.hide();
routing.hide();

// merken des ersten Punkts
first_point = event.latlng;
console.log("1. Punkt", event);
}
});

	