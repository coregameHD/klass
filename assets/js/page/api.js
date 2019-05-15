// Sensor Information
var array_id = [];
var array_name = [];
var array_pm25Level = [];
var array_pm10Level = [];
var array_pm1Level = [];
var array_temp = [];
var array_humidity = [];
var array_recordedOn = [];

// Node Information
var array_mapid = [];
var array_mapname = [];
var array_maplatitude = [];
var array_maplongitude = [];

//Node history
var nodeHistory
var tempGraphHistory = []

// Init Map
var array_marker = [];
var map = new GMaps({
    div: '#AQI_map',
    lat: 13.7298665,
    lng: 100.7783111,
    zoom: 17
});

// Get data from server and store in 'array_marker'
$.getJSON("https://lapsscentral.azurewebsites.net/api/nodeinfos", function(data) {
    for (var i = 0; i < data.length; i++){
        // Push data into the array
        array_mapid.push(data[i].id);
        array_mapname.push(data[i].name);
        array_maplatitude.push(data[i].latitude);
        array_maplongitude.push(data[i].longitude);

        // Create marker and push into the array
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
        // Push data into the array
        array_id.push(data[i].id);
        array_name.push(data[i].name);
        array_pm25Level.push(data[i].pm25Level);
        array_pm10Level.push(data[i].pm10Level);
        array_pm1Level.push(data[i].pm1Level);
        array_temp.push(data[i].temp);
        array_humidity.push(data[i].humidity);
        array_recordedOn.push(new Date(data[i].recordedOn).toLocaleString());

        // Generate marker icon
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
        map.addMarker(array_marker[i]);

        // Update chart
        chart_AQI.update();
        chart_TempAndHumid.update();
    }
});

getNodeLatestHistory(8)

function getNodeLatestHistory(hours){
    var currentTime = new Date();
    currentTime.setHours(currentTime.getHours() - hours)
    dateString = currentTime.toISOString()
    $.getJSON("https://lapsscentral.azurewebsites.net/api/sensors/history/?limit=500&from="+dateString, function(data) {
        nodeHistory = data
        console.log(nodeHistory)
        // tempGraphHistory = Object.values(getTempHistory())
        getTempHistory()
        console.log(tempGraphHistory)
        chart_temp.update()
    })
    
  

}

function getTempHistory(){
    tempGraphHistory.length = 0
    for(var i = 0; i < nodeHistory.length; i++){
        tempGraphHistory.push({
            x: moment(nodeHistory[i].recordedOn).format(),
            y:nodeHistory[i].temp
        })
    }
    // return data
}