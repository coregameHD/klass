"use strict";

// initialize map
var map = new GMaps({
  div: '#map',
  lat: 13.7298665,
  lng: 100.7783111,
  zoom: 17
});

// initialize markers
var marker1 = {
  lat: 13.7298665,
  lng: 100.7783111,
  title: 'KMITL Office of the President',
  icon: generateMarker(42)
};

var marker2 = {
  lat: 13.7300547,
  lng: 100.7754368,
  title: 'International College',
  icon: generateMarker(79)
};

var marker3 = {
  lat: 13.729523,
  lng: 100.778866,
  title: 'Faculty of Science',
  icon: generateMarker(172)
};

// Display popup
displayPopup(marker1, "AQI Index: 42", "Office of the Register" + "\n\n" + "King Mongkuts Institute of Technology Ladkrabang Chalongkrung Rd. Ladkrabang, Bangkok Thailand 10520");
displayPopup(marker2, "AQI Index: 79", "International College" + "\n\n" + "King Mongkuts Institute of Technology Ladkrabang Chalongkrung Rd. Ladkrabang, Bangkok Thailand 10520");
displayPopup(marker3, "AQI Index: 172", "Faculty of Science" + "\n\n" + "King Mongkuts Institute of Technology Ladkrabang Chalongkrung Rd. Ladkrabang, Bangkok Thailand 10520");

// Added markers to the map
map.addMarker(marker1);
map.addMarker(marker2);
map.addMarker(marker3);


// Helper Function: a function to generate colored marker based on the AQI number
// 000-050 = Green
// 051-100 = Yellow
// 101-150 = Orange
// 151++++ = Red
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

// Helper Function: Display pop-up when user clicked on the marker
function displayPopup(marker, title, content){
  google.maps.event.addListener(marker, "click", function (e) {
      swal(title, content);
    }
  );
}