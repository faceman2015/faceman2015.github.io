window.onload = function() {
	
    // Basis layer hinzufügen
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
    });

    //Koordinaten Lienz
    //map.setView([46.829722, 12.769722], 11);

    // Menü mit Basislayern hinzufügen
    var layerControl = L.control.layers({
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

    // GeoJSON Daten nach Attribut NAME sortieren
    window.almen_osttirol_json.features.sort(function(a, b) {
        if (a.properties.NAME < b.properties.NAME) {
            return -1;
        } else if (a.properties.NAME > b.properties.NAME) {
            return 1;
        } else {
            return 0;
        }
    });

    // Legendenobjekt mit Bezeichnungen nach Typnummern
    var legendLabels = {
        1: 'Kein Leger/nur Almzentrum',
        2: 'Niederleger',
        3: 'Mittelleger',
        4: 'Hochleger',
        5: 'Galtviehleger',
        6: 'Schafleger',
    };

    // Marker clustern
    var mc = new L.markerClusterGroup({
        disableClusteringATZoom: 14
    });

    // Marker mit Pop ups über GeoJSON zur Marker Cluster Gruppe hinzufügen
    var alm = L.geoJson(window.almen_osttirol_json, {
        onEachFeature: function(feature, layer) {
            var icon = L.icon();
            var description = feature.properties.NAME;
            layer.bindPopup(description);
        },


        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: L.icon({
                    iconSize: [36, 36],
                    iconAnchor: [18, 18],
                    iconUrl: 'icons/alm_' + feature.properties.OBJEKT + '.png'
                })
            });
        }
    }).addTo(mc)

    // Marker Cluster Gruppe zur Karte hinzufügen
    mc.addTo(map);

    // Legenden DIV finden und mit Icons samt Beschriftung befüllen
    legend_div = document.getElementById("legende");

    legend_div.innerHTML += '<img src="icons/alm_EL.png" style="vertical-align:middle;padding-bottom:3px;" /> ';
    legend_div.innerHTML += legendLabels[1] + '<br/>';
    legend_div.innerHTML += '<img src="icons/alm_NL.png" style="vertical-align:middle;padding-bottom:3px;" /> ';
    legend_div.innerHTML += legendLabels[2] + '<br/>';
    legend_div.innerHTML += '<img src="icons/alm_ML.png" style="vertical-align:middle;padding-bottom:3px;" /> ';
    legend_div.innerHTML += legendLabels[3] + '<br/>';
    legend_div.innerHTML += '<img src="icons/alm_HL.png" style="vertical-align:middle;padding-bottom:3px;" /> ';
    legend_div.innerHTML += legendLabels[4] + '<br/>';
    legend_div.innerHTML += '<img src="icons/alm_GAL.png" style="vertical-align:middle;padding-bottom:3px;" /> ';
    legend_div.innerHTML += legendLabels[5] + '<br/>';
    legend_div.innerHTML += '<img src="icons/alm_SCHL.png" style="vertical-align:middle;padding-bottom:3px;" /> ';
    legend_div.innerHTML += legendLabels[6] + '<br/>';
    //

    //Marker nach NAMEN sortieren
    var markers = alm.getLayers();
    markers.sort(function(a, b) {
        if (a.feature.properties.NAME > b.feature.properties.NAME) {
            return 1;
        } else {
            return -1;
        }
    });

    // Pulldown Menü DIV finden und Auswahleinträge für die Icons hinzufügen
    var pulldownMenu = document.getElementById("pulldown");
    var markers = alm.getLayers();
    for (var i = 0; i < markers.length; i += 1) {
        option = document.createElement("option");
        option.value = i;
        option.text = markers[i]._popup.getContent();
        pulldownMenu.appendChild(option);
    }

    // auf Änderungen im Pulldown Menü reagieren
    pulldownMenu.onchange = function(event) {
        var i = pulldownMenu.options[pulldownMenu.options.selectedIndex].value;
        var icon = alm.getLayers()[i];
        map.setView(icon.getLatLng(), 15);
        icon.openPopup();
    };

    // Ausschnitt setzen
    map.fitBounds(alm.getBounds());

    // Window.onload beenden:
}