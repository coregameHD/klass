// Sensors Information Table
$.getJSON("https://lapsscentral.azurewebsites.net/api/sensors", function (data) {
  var table = '<div class="table-responsive">';
  table += '<table class="table table-striped table-md">'
  table += "<tr><th>#</th><th>Name</th><th>PM 2.5</th><th>PM 10</th><th>PM 1</th><th>Temperature</th><th>Humidity</th><th>Record On</th></tr>";
  for (var i = 0; i < data.length; i++) {
    table += "<tr><td>" + (i+1) + "</td><td>" + data[i].name + "</td><td>" + data[i].pm25Level + "</td><td>" + data[i].pm10Level + "</td><td>" + data[i].pm1Level + "</td><td>" + data[i].temp + "</td><td>" + data[i].humidity + "</td><td>" + new Date(data[i].recordedOn).toLocaleString() + "</td></tr>";
  }
  table += "</table>";
  table += "</div>";

  //Showing the table inside html
//  document.getElementById("table_sensors").innerHTML = table;
});

// Sensor Information History Table
$.getJSON("https://lapsscentral.azurewebsites.net/api/sensors/history?limit=10", function (data) {
  var table = '<div class="table-responsive">';
  table += '<table class="table table-bordered table-md table-hover">'
  table += "<tr><th>#</th><th>Name</th><th>PM 2.5</th><th>PM 10</th><th>PM 1</th><th>Temperature</th><th>Humidity</th><th>Record On</th></tr>";
  for (var i = 0; i < data.length; i++) {
    table += "<tr><td>" + (i+1) + "</td><td>" + data[i].name + "</td><td>" + data[i].pm25Level + "</td><td>" + data[i].pm10Level + "</td><td>" + data[i].pm1Level + "</td><td>" + data[i].temp + "</td><td>" + data[i].humidity + "</td><td>" + new Date(data[i].recordedOn).toLocaleString() + "</td></tr>";
  }
  table += "</table>";
  table += "</div>";

  //Showing the table inside html
  document.getElementById("table_sensors_history").innerHTML = table;
});

// Node Information Table
$.getJSON("https://lapsscentral.azurewebsites.net/api/nodeinfos", function (data) {
  var table = '<div class="table-responsive">';
  table += '<table class="table table-striped table-md">'
  table += "<tr><th>#</th><th>Name</th><th>Latitude</th><th>Longitude</th><th>Status</th></tr>";
  for (var i = 0; i < data.length; i++) {
    table += "<tr><td>" + (i+1) + "</td><td>" + data[i].name + "</td><td>" + data[i].latitude + "</td><td>" + data[i].longitude + "</td><td>Active</td></tr>";
  }
  table += "</table>";
  table += "</div>";

  //Showing the table inside html
//  document.getElementById("table_nodeinfos").innerHTML = table;
});