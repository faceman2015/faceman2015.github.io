window.onload = function() {

    // Basis layer
    var layers = {
        osmlayer: L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
        }),
        geolandbasemap: L.tileLayer("http://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
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

    // Karte erstellen
    var map = L.map('almen', {
        layers: [layers.osmlayer],
        center: [47.00, 11.07],
        zoom: 12
    });

	// Menü mit Basislayern hinzufügen
    var layerControl = L.control.layers(
        {
            "Open Street Map": layers.osmlayer,
            "Geoland Basemap": layers.geolandbasemap,
            "Geoland Basemap Overlay": layers.bmapoverlay,
            "Geoland Basemap Grau": layers.bmapgrau,
            "Geoland Basemap High DPI": layers.bmaphidpi,
            "Geoland Basemap Orthofoto": layers.bmaporthofoto30cm
        }).addTo(map);
		
	// Maßstabsleiste hinzufügen
    L.control.scale({
        'imperial': false
    }).addTo(map);
	
	// Koordinaten von Punkten über Variable in js File hinzufügen
	L.geoJson(almenzentren_json).addTo(map);
	
	// Marker clustern
	var markers = L.markerClusterGroup(
	//{disableClusteringATZoom : 14
	//}
	);
	makers.addLayer(marker);
	map.addLayer(markers);
	
    // Window.onload beenden:
}