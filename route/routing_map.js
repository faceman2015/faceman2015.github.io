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

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
		startBtn = createButton('Startpunkt', container),
		destBtn = createButton('Endpunkt', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
});

	L.DomEvent.on(startBtn, 'click', function() {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
    });
	
	L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
    });
	
	