
/*
 *  StationMap - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 *  @param _data            -- Array with all stations of the bike-sharing network
 */


StationMap = function(_parentElement, _data, _mapPosition) {

	this.parentElement = _parentElement;
	this.data = _data;
	this.mapPosition = _mapPosition;
	this.initVis();
}


/*
 *  Initialize station map
 */

StationMap.prototype.initVis = function() {
	var vis = this;

    $.getJSON("json/MBTA-Lines.json", function(line) {
		vis.lines=line;
		console.log(vis.lines);
        vis.wrangleData();
    });
	

}


/*
 *  Data wrangling
 */

StationMap.prototype.wrangleData = function() {
	var vis = this;
	console.log("haha");

	// Currently no data wrangling/filtering needed
	// vis.displayData = vis.data;

	// Update the visualization
	vis.updateVis();

}


/*
 *  The drawing function
 */

StationMap.prototype.updateVis = function() {
    //map and tilelayer
	var vis=this;
	var map = L.map('ny-map').setView([42.3601, -71.0589], 13);
    var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        ext: 'png'
    }).addTo(map);

    //creat layer
	var stations=L.layerGroup().addTo(map);

    //customize icon
    // Defining an icon class with general options
    var LeafIcon = L.Icon.extend({
        options: {
            shadowUrl: 'icons/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -28]

        } });

    var redMarker = new LeafIcon({ iconUrl:  'icons/marker-red.png' });
    var blueMarker = new LeafIcon({ iconUrl:  'icons/marker-blue.png' });


    //draw maker
	var marker;
	var markerColor = blueMarker;
    vis.data.forEach(function(element){
    	if (element.nbBikes=="0" || element.nbEmptyDocks=="0"){
    		markerColor = redMarker;
		}else{
            markerColor = blueMarker;
		}
		marker=L.marker([element.lat, element.long], {icon: markerColor}).bindPopup(element.name+"<br>Available Bikes: "+element.nbBikes+"<br>Available Docks: "+element.nbEmptyDocks);
        stations.addLayer(marker);
	});
    //draw lines
	var subway=L.geoJson(vis.lines,{
		style: styleSubway,
		weight: 5
	}).addTo(map);

	function styleSubway(features){
		switch (features.properties.LINE){
			case "GREEN": return{ color: "green"};
            case "RED": return{ color: "red"};
            case "ORANGE": return{ color: "orange"};
		}

	}


    //var marker = L.marker([42.378774, -71.117303]).bindPopup("hah");

    //stations.addLayer(marker);
    /*
    //popup
    var popupContent =  "<strong>One World Trade Center</strong><br/>";
    popupContent += "New York City";
    // Create a marker and bind a popup with a particular HTML content
    var marker = L.marker([40.713008, -74.013169])
        .bindPopup(popupContent)
        .addTo(map);

        */

}
