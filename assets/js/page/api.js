// Sensor Information
// var array_id = [];
// var array_name = [];
// var array_pm25Level = [];
// var array_pm10Level = [];
// var array_pm1Level = [];
// var array_temp = [];
// var array_humidity = [];
// var array_recordedOn = [];

// Node Information
// var array_mapid = [];
// var array_mapname = [];
// var array_maplatitude = [];
// var array_maplongitude = [];

var nodesInfo = []
var sensors = []
var nodesAQI = []

//Node history
var nodeHistory
var tempGraphHistory = []
var selectedNode = 1

// AQI Information
var array_aqi = [];
var array_api_node_name = [];

// Init Map
var array_marker = [];
var map = new GMaps({
    div: '#AQI_map',
    lat: 13.7298665,
    lng: 100.7783111,
    zoom: 17
});

getNodeInfo()

function getNodeInfo(){
// Get data from server and store in 'array_marker'
$.getJSON("https://lapsscentral.azurewebsites.net/api/nodeinfos", function(data) {
    nodesInfo = data
    for (var i = 0; i < data.length; i++){
        // Create marker and push into the array
        var temp = {
            lat: data[i].latitude,
            lng: data[i].longitude,
            title: data[i].name,
            icon: ''
        };
        array_marker.push(temp);
    };


    getNodeLatestHistory(24)

});
}




// Display Icon (Marker) on the map
function addData(){

$.getJSON("https://lapsscentral.azurewebsites.net/api/sensors", function(data) {
    for (var i = 0; i < data.length; i++){

        // Generate marker icon
        
        // // Display data as a pop-up if user clicked the marker
        // var displayDetails = "(";
        // displayDetails += array_maplatitude[i] + ", ";
        // displayDetails += array_maplongitude[i] + ")\n\n";
        // displayDetails += "PM 2.5: " + array_pm25Level[i] + "\n";
        // displayDetails += "Temperature: " + array_temp[i] + "\n";
        // displayDetails += "Humidity: " + array_humidity[i];
        // displayPopup(array_marker[i], array_mapname[i], displayDetails);

        // Add marker to the
        map.addMarker(array_marker[i]);

        // Update chart
        chart_TempAndHumid.update();
    }
});
}

$.getJSON("https://klassaqi.azurewebsites.net", function(data){
    data.forEach(function(element) {
        array_api_node_name.push(element.name);
        array_aqi.push(element.aqi);
    });
    chart_AQI.update();
});

getNodeLatestHistory(8)
//Get 24-hr pm2.5 value, average it and then calculate the aqi.
function calculateAQI(){
    for(var i = 0 ; i < nodesInfo.length; i++){
        var nodeName = nodesInfo[i].name
        var nodeSum = 0
        var count = 0
        for(var j = 0; j < nodeHistory.length; j++){
            if( nodeHistory[j].name == nodeName){
                nodeSum += nodeHistory[j].pm25Level
                count ++
            }
        }
        var avg = nodeSum/count
        console.log("sum " + nodeSum + " count "+ count)
        nodesAQI[i] =  calc_aqi(avg,"PM25")
        console.log("aqi = " + nodesAQI[i])
        console.log(array_marker[i])

        array_marker[i].icon = generateMarker(nodesAQI[i])
        map.addMarker(array_marker[i]);
    }
    

}



function getNodeLatestHistory(hours){
    var currentTime = new Date();
    currentTime.setHours(currentTime.getHours() - hours)
    dateString = currentTime.toISOString()
    $.getJSON("https://lapsscentral.azurewebsites.net/api/sensors/history/?limit=500&from="+dateString, function(data) {
        nodeHistory = data
        console.log(nodeHistory)
        // tempGraphHistory = Object.values(getTempHistory())
        updateTempHistoryForGraph()
        console.log(tempGraphHistory)
        chart_temp.update()

        if (hours == 24){
            calculateAQI()
        }

    })
    
}



function updateTempHistoryForGraph(){
    tempGraphHistory.length = 0
    // var data = []
    for(var i = 0; i < nodeHistory.length; i++){
        if(nodeHistory[i].name== nodesInfo[selectedNode].name){
            tempGraphHistory.push({
                x: moment(nodeHistory[i].recordedOn).format(),
                y:nodeHistory[i].temp
            })
        }
                
    
    }


}

var STANDARD_AQI = [
	[0,25,50,100,200],	//AQI 
	[0,25,37,50,90],	//PM25 
	[0,50,80,120,180],	//PM10 
	[0,35,50,70,120],	//O3 
	[0,4.4,6.4,9,30],	//CO 
	[0,60,106,170,340],	//NO2 
	[0,100,200,300,400],	//SO2 
];
var AQI_COLORS = ['#3bccff','#92d050','#ffff00','#ffa200','#ff3b3b','#ff3b3b'];
function calc_aqi(average, fieldName){
	if(average<0) return "-";
	if(average=="") return "-";
	if(isNaN(average)) return "-";
	
	if(fieldName=="AQI")
		return "-";
	else if(fieldName=="PM25") 
		fieldNum=1;
	else if(fieldName=="PM10") 
		fieldNum=2;
	else if(fieldName=="O3") 
		fieldNum=3;
	else if(fieldName=="CO") 
		fieldNum=4;
	else if(fieldName=="NO2") 
		fieldNum=5;
	else if(fieldName=="SO2") 
		fieldNum=6;
	else 
		return "-";
	
	var stepAdd;
	if(fieldNum==4){
		average = average.toFixed(1);
		stepAdd = 0.1;
	}
	else{
		average = average.toFixed(0);
		stepAdd = 1.0;
	}
	console.log("fieldNum = "+fieldNum+"; average = "+average);
	
	
	/*
	if(average > STANDARD_AQI[fieldNum][4]) {
		diff = STANDARD_AQI[fieldNum][4]-STANDARD_AQI[fieldNum][3];
		over = (average-STANDARD_AQI[fieldNum][4])*100/diff;
		over = parseInt(over.toFixed(0));
		if(over == 0) over=1;
		
		return STANDARD_AQI[0][4]+over;
	}
	else {
		for(i=3;i>=0;i--){
			if(average == STANDARD_AQI[fieldNum][i]) {
				return STANDARD_AQI[0][i+1];
			}
			else if(average > STANDARD_AQI[fieldNum][i]) {
				aqiLv = STANDARD_AQI[0][i];
				average -= STANDARD_AQI[fieldNum][i];
				
				aqiDiff = STANDARD_AQI[0][i+1]-STANDARD_AQI[0][i];
				valueDiff = STANDARD_AQI[fieldNum][i+1]-STANDARD_AQI[fieldNum][i];
				
				aqiLv += (average * aqiDiff) / valueDiff;
				//console.log(""+i+": "+average+"*"+aqiDiff+"/"+valueDiff);
				aqiLv = parseInt(aqiLv.toFixed(0));
				if(aqiLv == STANDARD_AQI[0][i])
					aqiLv ++;
				return aqiLv;
			}
		}
		return 0;
	}
	*/
	
	for(i=1;i<=4;i++){
		if(average <= STANDARD_AQI[fieldNum][i]) {
			average -= STANDARD_AQI[fieldNum][i-1]+(i==1?0:stepAdd);
			aqiDiff = STANDARD_AQI[0][i]-(STANDARD_AQI[0][i-1]+(i==1?0:1));
			valueDiff = STANDARD_AQI[fieldNum][i]-(STANDARD_AQI[fieldNum][i-1]+(i==1?0:stepAdd));
			
			aqiLv = STANDARD_AQI[0][i-1]+(i==1?0:1);
			aqiLv += (average * aqiDiff) / valueDiff;
			console.log(""+i+": "+average+"*"+aqiDiff+"/"+valueDiff);
			return parseInt(aqiLv.toFixed(0));
		}
	}
	//console.log("average = "+average);
	average -= STANDARD_AQI[fieldNum][4];

	if(fieldNum==1)
		return average+200;
	else if(fieldNum==2){
		average=201+((average-1)*0.5);
		return parseInt(average.toFixed(0));
	}
	else if(fieldNum==3)
		return average+200;
	return 201;
}