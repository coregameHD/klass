var array_mapid = [];
var array_mapname = [];
var array_maplatitude = [];
var array_maplongitude = [];

var array_marker = [];
var map2 = new GMaps({
    div: '#AQI_map',
    lat: 13.7298665,
    lng: 100.7783111,
    zoom: 17
});

// Get data from server and store in 'array_marker'
$.getJSON("https://lapsscentral.azurewebsites.net/api/nodeinfos", function(data) {
    for (var i = 0; i < data.length; i++){
        array_mapid.push(data[i].id);
        array_mapname.push(data[i].name);
        array_maplatitude.push(data[i].latitude);
        array_maplongitude.push(data[i].longitude);
        var temp = {
            lat: data[i].latitude,
            lng: data[i].longitude,
            title: data[i].name,
            icon: ''
        };
        array_marker.push(temp);
    };
});

// Display Icon (Marker) on the map
$.getJSON("https://lapsscentral.azurewebsites.net/api/sensors", function(data) {
    for (var i = 0; i < data.length; i++){
        // Get PM2.5 data and generate marker icon
        array_marker[i].icon = generateMarker(array_pm25Level[i]);
        
        // Display data as a pop-up if user clicked the marker
        var displayDetails = "(";
        displayDetails += array_maplatitude[i] + ", ";
        displayDetails += array_maplongitude[i] + ")\n\n";
        displayDetails += "PM 2.5: " + array_pm25Level[i] + "\n";
        displayDetails += "Temperature: " + array_temp[i] + "\n";
        displayDetails += "Humidity: " + array_humidity[i];
        displayPopup(array_marker[i], array_mapname[i], displayDetails);

        // Add marker to the
        map2.addMarker(array_marker[i]);
    }
});
