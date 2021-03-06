/***
* Adlerweg Script
* zeigt 3 Etappen auf dem Adlerweges auf einer Leaflet Karte mit 
* Fotos von Panoramio und Artikeln von Wikipedia
* Hintergrundkarten: Open Street Map und basemap.at
***/
	
window.onload = function() {
    
	var layers = {

		osmlayer: L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
		}),

		//http://www.basemap.at/wmts/1.0.0/WMTSCapabilities.xml
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

    var adlerkarte = L.map('adlerwegkarte', {
        layers: [layers.osmlayer],
    });

	var hash = new L.Hash(adlerkarte);
	
	var el = L.control.elevation({
		collapsed: true
		})
	.addTo(adlerkarte);
	

    var etappe01 = L.geoJson(adlerweg01json, {
        style: {
            color: "blue",
            weight: 10
        }, 
		onEachFeature: el.addData.bind(el)
    });
    adlerkarte.addLayer(etappe01);
    etappe01.bindPopup("Adlerweg - Etappe 1");

    var etappe03 = L.geoJson(adlerweg03json, {
        style: {
            color: "red",
            weight: 10
        }, 
		onEachFeature: el.addData.bind(el)
    });
    adlerkarte.addLayer(etappe03);
    etappe03.bindPopup("Adlerweg - Etappe 3");


    var etappe05 = L.geoJson(adlerweg05json, {
        style: {
            color: "black",
            weight: 10
        }, 
		onEachFeature: el.addData.bind(el)
    });
    adlerkarte.addLayer(etappe05);
    etappe05.bindPopup("Adlerweg - Etappe 5");

    var etappenGruppe = L.featureGroup([etappe01, etappe03, etappe05]);
    adlerkarte.addLayer(etappenGruppe);
    adlerkarte.fitBounds(etappenGruppe.getBounds());

    var bounds = etappenGruppe.getBounds();

    var url = 'http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20' +
        '&minx=' + bounds.getWest() +
        '&miny=' + bounds.getSouth() +
        '&maxx=' + bounds.getEast() +
        '&maxy=' + bounds.getNorth() +
        '&size=mini_square&mapfilter=true&callback=zeigBilder';
    //alert(url);

    var script = document.createElement("script");
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);

    window.zeigBilder = function(data) {
        //function zeigBilder(){
        for (var i = 0; i < data.photos.length; i++) {
			//i++: i=i+1
            //console.log("Photo titel: ", i, data.photos[i].photo_title);
            L.marker(
                    [data.photos[i].latitude, data.photos[i].longitude], {
                        icon: L.icon({
                            iconUrl: data.photos[i].photo_file_url
                        })
                    }).bindPopup("<h2>" + data.photos[i].photo_title + "</h2>" +
                    "<a href='" + data.photos[i].photo_url + "'>Link zum Bild</a>")
                .addTo(adlerkarte);
        }
    }


    var url2 = 'http://api.geonames.org/wikipediaBoundingBoxJSON?' +
        'username=oeggl' +
        '&west=' + bounds.getWest() +
        '&south=' + bounds.getSouth() +
        '&east=' + bounds.getEast() +
        '&north=' + bounds.getNorth() +
        '&callback=wikiArtikel';
    //alert(url2);

    var script2 = document.createElement("script");
    script2.src = url2;
    document.getElementsByTagName('head')[0].appendChild(script2);

    window.wikiArtikel = function(data2) {
        for (var i = 0; i < data2.geonames.length; i++) {
            var p = data2.geonames[i];

            //console.log("Wiki Artikel titel: ", i, p.title);

            L.marker([p.lat, p.lng], {
                    icon: L.icon({
                        iconUrl: "wikipedia.jpg",
                        iconSize: [30, 30],
                    })

                })
                .bindPopup("<h2>" + p.title + "</h2>" +
                    "<a href='http://" + p.wikipediaUrl + "'>Link zum Bild</a>")
                .addTo(adlerkarte);
        }
    }

    var basislayer = {
        "Open Street Map": layers.osmlayer,
        "Geoland Basemap": layers.geolandbasemap,
        "Geoland Basemap Overlay": layers.bmapoverlay,
        "Geoland Basemap Grau": layers.bmapgrau,
        "Geoland Basemap High DPI": layers.bmaphidpi,
        "Geoland Basemap Orthofoto": layers.bmaporthofoto30cm
    };

    var alltracks = {
        "Tracks": etappenGruppe
    };

    L.control.layers(basislayer, alltracks).addTo(adlerkarte);

    L.control.scale({
        'imperial': false
    }).addTo(adlerkarte);

    /* var popupwhere = L.popup();

    		function onMapClick(e) {popupwhere
    		.setLatLng(e.latlng)
    		.setContent("You clicked the map at " + e.latlng.toString())
    		.openOn(adlerkarte);
    		}

    		adlerkarte.on('click', onMapClick);
    		

    		zoom the map to the polyline
    		adlerkarte.fitBounds(etappe05.getBounds().pad(3)); */
}