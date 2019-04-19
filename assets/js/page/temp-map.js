"use strict";

// initialize map
var map = new GMaps({
  div: '#map',
  lat: 13.7298665,
  lng: 100.7783111,
  zoom: 17
});

var iconBase = 'assets/img/mapicon-numbers/number_';
// Added markers to the map
map.addMarker({
  lat: 13.7298665,
  lng: 100.7783111,
  title: 'KMITL Office of the President',
  icon: generateMarker(42),
  infoWindow: {
    content: '<h6>KMITL Office of the President</h6><p>King Mongkuts Institute of Technology Ladkrabang,<br>Chalongkrung Rd. Ladkrabang, Bangkok Thailand 10520</p><p><a target="_blank" href="https://www.kmitl.ac.th">Website</a></p>'
  }
});
map.addMarker({
  lat: 13.7300547,
  lng: 100.7754368,
  title: 'International College',
  icon: generateMarker(79),
  infoWindow: {
    content: '<h6>International College</h6><p>King Mongkuts Institute of Technology Ladkrabang,<br>Chalongkrung Rd. Ladkrabang, Bangkok Thailand 10520</p><p><a target="_blank" href="http://sigmaid.net/">Website</a></p>'
  }
});
map.addMarker({
  lat: 13.729523,
  lng: 100.778866,
  title: 'Faculty of Science',
  icon: generateMarker(172),
  infoWindow: {
    content: '<h6>Faculty of Science</h6><p>King Mongkuts Institute of Technology Ladkrabang,<br>Chalongkrung Rd. Ladkrabang, Bangkok Thailand 10520</p><p><a target="_blank" href="http://sigmaid.net/">Website</a></p>'
  }
});

$.getJSON("https://lapsscentral.azurewebsites.net/api/sensors", function(data) {
    console.log(data);

    var id = data[0].id;
    var name = data[0].name;
    var pm25 = data[0].pm25level;
    var temp = data[0].temp;
    console.log("Test");
    console.log(data[0].id);
  });


function generateMarker(aqi) {
  var canvas = document.createElement('canvas');
  canvas.height = 64;
  canvas.width = 64;

  var ctx = canvas.getContext("2d");

  if(aqi <= 50) {
      ctx.fillStyle = "green";
  } else if(aqi >= 51 && aqi <= 100) {
      ctx.fillStyle = "yellow";
  } else if(aqi >= 101 && aqi <= 150) {
      ctx.fillStyle = "orange";
  } else if(aqi >= 151){
      ctx.fillStyle = "red";
  }

  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(32, 32, 16, 0, Math.PI * 2, true);
  ctx.fill();

  if(aqi >= 51 && aqi <= 150) {
      ctx.fillStyle = "black";
  } else {
      ctx.fillStyle = "white";
  }
  ctx.textAlign = "center";
  ctx.font = "12px Lucida Console";
  ctx.fillText(aqi, 32, 35, 64);
  ctx.stroke();

  var marker = canvas.toDataURL("image/png;base64");
  return marker;
}