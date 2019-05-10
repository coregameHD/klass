var arrayID = [];
var arrayName = [];
var arrayPM25 = [];
var arrayPM10 = [];
var arrayPM1 = [];
var arrayTemperature = [];
var arrayHumidity = [];
var arrayRecordedOn = [];

// TEST: get data from the server
$.getJSON("https://lapsscentral.azurewebsites.net/api/sensors", function(data) {
  console.log(data.length);
  for (var i = 0; i < data.length; i++){
    arrayID.push(data[i].id);
    arrayName.push(data[i].name);
    arrayPM25.push(data[i].pm25Level);
    arrayPM10.push(data[i].pm10Level);
    arrayPM1.push(data[i].pm1Level);
    arrayTemperature.push(data[i].temp);
    arrayHumidity.push(data[i].humidity);
    arrayRecordedOn.push(data[i].recordedOn);
  }
  
  console.log("Test");
  console.log(arrayName);
  console.log(arrayPM25);
  console.log(arrayTemperature);
  console.log(arrayHumidity);
  console.log(data[0].id);
  myChart1.update();
  myChart2.update();
});

document.getElementById("myButton1").onclick = function () { myChart1.update(); };
document.getElementById("myButton2").onclick = function () { myChart2.update(); };