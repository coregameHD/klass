"use strict";

// AQI Index Chart
var ctx = document.getElementById("chart_AQI").getContext('2d');
var chart_AQI = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: array_name,
    datasets: [{
      label: 'AQI Index',
      data: array_pm25Level,
      borderWidth: 2,
      backgroundColor: '#6777ef',
      borderColor: '#6777ef',
      borderWidth: 2.5,
      pointBackgroundColor: '#ffffff',
      pointRadius: 4
    },]
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        gridLines: {
          drawBorder: false,
          color: '#f2f2f2',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 10
        }
      }],
      xAxes: [{
        ticks: {
          display: true
        },
        gridLines: {
          display: false
        }
      }]
    },
  }
});

// Temperature & Humidity Chart
var ctx = document.getElementById("chart_TempAndHumid").getContext('2d');
var chart_TempAndHumid = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: array_name,
    datasets: [{
      label: 'Temperature',
      data: array_temp,
      borderWidth: 2,
      backgroundColor: '#e83e8c',
      borderColor: '#e83e8c',
      borderWidth: 2.5,
      pointBackgroundColor: '#ffffff',
      pointRadius: 4
    }, 
    {
      label: 'Humidity',
      data: array_humidity,
      borderWidth: 2,
      backgroundColor: '#6777ef',
      borderColor: '#6777ef',
      borderWidth: 2.5,
      pointBackgroundColor: '#ffffff',
      pointRadius: 4
    }]
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        gridLines: {
          drawBorder: false,
          color: '#f2f2f2',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 10
        }
      }],
      xAxes: [{
        ticks: {
          display: true
        },
        gridLines: {
          display: false
        }
      }]
    },
  }
});

// Refresh Button
document.getElementById("myButton1").onclick = function () { 
  chart_AQI.update(); 
  iziToast.success({
    title: 'Updated',
    message: 'AQI Index chart updated',
    position: 'topRight',
    timeout: 2000,
  });
};

document.getElementById("myButton2").onclick = function () { 
  chart_TempAndHumid.update(); 
  iziToast.success({
    title: 'Updated',
    message: 'Temperature & Humidity chart updated',
    position: 'topRight',
    timeout: 2000,
  });
};