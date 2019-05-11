var array_id = [];
var array_name = [];
var array_pm25Level = [];
var array_pm10Level = [];
var array_pm1Level = [];
var array_temp = [];
var array_humidity = [];
var array_recordedOn = [];

// TEST: get data from the server
$.getJSON("https://lapsscentral.azurewebsites.net/api/sensors", function(data) {
  for (var i = 0; i < data.length; i++){
    array_id.push(data[i].id);
    array_name.push(data[i].name);
    array_pm25Level.push(data[i].pm25Level);
    array_pm10Level.push(data[i].pm10Level);
    array_pm1Level.push(data[i].pm1Level);
    array_temp.push(data[i].temp);
    array_humidity.push(data[i].humidity);
    array_recordedOn.push(data[i].recordedOn);
  }

  chart_AQI.update();
  chart_TempAndHumid.update();
});

function get_pm25Level(index){
  temp = [];
  
  console.log(temp);
  return temp[index];
}