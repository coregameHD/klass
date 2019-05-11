"use strict";

// Helper Function: Generate marker with a number
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