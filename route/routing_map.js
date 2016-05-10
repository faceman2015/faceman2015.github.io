var layers = {

		osmlayer: L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
		}),

		geolandbasemap: L.tileLayer("http://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
			subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
			attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
		}),
		osmlayer: L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
		}),

		bmapoverlay: L.tileLayer("http://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
			subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
			attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
		}),
		bmapgrau: L.tileLayer("http://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
			subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
			attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
		}),
		bmaphidpi: L.tileLayer("http://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
			subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
			attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
		}),
		bmaporthofoto30cm: L.tileLayer("http://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
			subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
			attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
		})
    };

    var routingkarte = L.map('routingmap', {
        layers: [layers.osmlayer],
    });
	
	var routing = L.Routing.control({
  waypoints: [
    L.latLng(47.56, 12.12),
    L.latLng(47, 12.54)
  ],
  routeWhileDragging: true,
  //geocoder: L.Control.Geocoder.nominatim()
 
}).addTo(routingkarte);
routingkarte.setView([47.56, 12.12]),9;