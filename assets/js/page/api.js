var nodesInfo = []
var sensors = []
var nodesAQI = []

//Node history
var nodeHistory
var tempGraphHistory = []
var humidGraphHistory = []
var pm25GraphHistory = []
var selectedNode = 0
var currentSelectedDataDuration = 24

// AQI Information
var nodeAQIData = []

var lastUpdateTimeInterval

// Init Map
var array_marker = [];

var map = new google.maps.Map(document.getElementById('AQI_map'), {
    zoom: 17,
    center: {
        lat: 13.7291448,
        lng: 100.7755224
    },
});

$.busyLoadSetup({
    background: "rgba(103, 119, 239, 0.86)",
    spinner: "circles",
    animation: "fade",
    text: "Getting data"
});


loadAllData(true)


function loadAllData(fullScreenLoading) {
    //Show spinner


    if (fullScreenLoading) {
        $.busyLoadFull("show");
    }
    getNodeInfo()
    getSensorCurrentValue()
    getNodeLatestHistory(currentSelectedDataDuration)


}


function getNodeInfo() {
    // Get data from server and store in 'array_marker'
    $.getJSON("https://lapsscentral.azurewebsites.net/api/nodeinfos", function (data) {
        nodesInfo = data

        getAQIInfo()
    });
}

function getAQIInfo() {
    $.getJSON("https://lapsscentral.azurewebsites.net", function (data) {
        nodeAQIData = data

        nodeAQIData.forEach(function (e) {
            if (e.name == nodesInfo[selectedNode].name) {
                document.getElementById("node-aqi").innerHTML = e.aqi

            }
        })
        createMarker();
    });
}

function createMarker() {
    //Clear previous marker
    for (var i = 0; i < array_marker.length; i++) {
        array_marker[i].setMap(null);
    }
    array_marker = []

    for (var i = 0; i < nodesInfo.length; i++) {
        var nodeAQI
        nodeAQIData.forEach(function (e) {
            if (e.name == nodesInfo[i].name) {
                nodesAQI[i] = e.aqi
            }
        })

        var contentString = "name = " + nodesInfo[i].name
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        // Create marker and push into the array
        var marker = new google.maps.Marker({
            title: nodesInfo[i].name,
            position: new google.maps.LatLng(nodesInfo[i].latitude, nodesInfo[i].longitude),
            map: map,
            icon: generateMarker(nodesAQI[i])
        });

        console.log("i = ", i)
        console.log(marker)
        array_marker.push(marker);
        google.maps.event.addListener(marker, 'click', function () {
            if (navigator.userAgent.match(/Chrome|AppleWebKit/)) {
                window.location.href = "#nodeInfo";
                window.location.href = "#nodeInfo"; /* these take twice */
            } else {
                window.location.hash = "nodeInfo";
            }

            selectedNode = array_marker.indexOf(this)
            console.log("selected = " + selectedNode)
            loadAllData(true)
        });
    }
    $.busyLoadFull("hide");

}

function getSensorCurrentValue() {

    $.getJSON("https://lapsscentral.azurewebsites.net/api/sensors", function (data) {
        sensors = data


        for (var i = 0; i < data.length; i++) {


            if (sensors[i].name == nodesInfo[selectedNode].name) {
                document.getElementById("node-temperature").innerHTML = sensors[i].temp + "°C"
                document.getElementById("node-humidity").innerHTML = sensors[i].humidity + "% RH"
                document.getElementById("node-pm25").innerHTML = sensors[i].pm25Level + " ug/cm³"
            }
        }

        lastUpdateTimeInterval = setInterval(function () {
            var node
            sensors.forEach(function (e) {
                if (e.name == nodesInfo[selectedNode].name) {
                    node = e
                }
            })

            var updateTime = moment(node.recordedOn)
            var secondFromLastUpdate = moment().diff(updateTime, 'second')
            var updateTimeString = moment().diff(updateTime, 'second') + "s ago";

            if (secondFromLastUpdate > 59) {
                updateTimeString = moment().diff(updateTime, 'minute') + "min ago";
            }if (secondFromLastUpdate > 3600) {
                updateTimeString = moment().diff(updateTime, 'hour') + "hour ago";
            }

            if (secondFromLastUpdate < 310) {
                document.getElementById("selected-node-name").innerHTML = nodesInfo[selectedNode].name + "   <span class=\"text-small font-weight-600 text-success\" > <i class=\"fas fa-circle\"></i> " + "Online " + updateTimeString
            } else {
                document.getElementById("selected-node-name").innerHTML = nodesInfo[selectedNode].name + "   <span class=\"text-small font-weight-600 text-danger\" > <i class=\"fas fa-circle\"></i> " + "No response " + updateTimeString
            }

        }, 1000)
    });
}

function getNodeLatestHistory(hours) {
    var timeString
    if (hours == 168) {
        timeString = "1 Week"
    } else {
        timeString = hours + " Hours"
    }
    document.getElementById("btn-select-range").innerHTML = timeString

    var currentTime = new Date();
    currentTime.setHours(currentTime.getHours() - hours)
    dateString = currentTime.toISOString()
    $.getJSON("https://lapsscentral.azurewebsites.net/api/sensors/history/?limit=500&from=" + dateString, function (data) {
        nodeHistory = data
        console.log(nodeHistory)
        updateChart()
    });
}

function updateChart() {
    updateTempHistoryDataForGraph();
    updateHumidHistoryDataForGraph();
    updatePM25HistoryDataForGraph();
    chart_temp.update();
    chart_Humid.update();
    chart_pm25.update();
}



function updateTempHistoryDataForGraph() {
    tempGraphHistory.length = 0
    // var data = []
    for (var i = 0; i < nodeHistory.length; i++) {
        if (nodeHistory[i].name == nodesInfo[selectedNode].name) {
            tempGraphHistory.push({
                x: moment(nodeHistory[i].recordedOn).format(),
                y: nodeHistory[i].temp
            })
        }
    }
}

function updateHumidHistoryDataForGraph() {
    humidGraphHistory.length = 0
    // var data = []
    for (var i = 0; i < nodeHistory.length; i++) {
        if (nodeHistory[i].name == nodesInfo[selectedNode].name) {
            humidGraphHistory.push({
                x: moment(nodeHistory[i].recordedOn).format(),
                y: nodeHistory[i].humidity
            })
        }
    }
}

function updatePM25HistoryDataForGraph() {
    pm25GraphHistory.length = 0
    // var data = []
    for (var i = 0; i < nodeHistory.length; i++) {
        if (nodeHistory[i].name == nodesInfo[selectedNode].name) {
            pm25GraphHistory.push({
                x: moment(nodeHistory[i].recordedOn).format(),
                y: nodeHistory[i].pm25Level
            })
        }
    }
}
