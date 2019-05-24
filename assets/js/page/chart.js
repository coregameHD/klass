"use strict";



//PM2.5 Chart
var chart_pm25_element = document.getElementById("chart_PM25").getContext('2d');
var chart_pm25 = new Chart(chart_pm25_element, {
    type: 'line',
    data: {
        datasets: [{
            tension: 0.2,
            backgroundColor: "#6777EF20",
            borderColor: '#6777ef',
            fill: true,
            pointRadius: 0,
            data: pm25GraphHistory
    }]
    },
    options: {
        legend: {
            display: false
        },
        responsive: true,
        scales: {
            xAxes: [{
                type: 'time',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                },
                ticks: {
                    major: {
                        fontStyle: 'bold',
                        fontColor: '#FF0000'
                    }
                }
      }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'ug/cm3'
                }
      }]
        }
    }
})

// Humidity Chart
var chart_humid_element = document.getElementById("chart_Humid").getContext('2d');
var chart_Humid = new Chart(chart_humid_element, {
    type: 'line',
    data: {
        datasets: [{
            pointRadius: 0,
            backgroundColor: "#6777EF20",
            borderColor: '#6777ef',
            data: humidGraphHistory

    }]
    },
    options: {
        legend: {
            display: false
        },
        responsive: true,
        scales: {
            xAxes: [{
                type: 'time',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                },
                ticks: {
                    major: {
                        fontStyle: 'bold',
                        fontColor: '#FF0000'
                    }
                }
      }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Percent'
                }
      }]
        }
    }
})


var chart_temp_element = document.getElementById("chart_Temp").getContext('2d');
var chart_temp = new Chart(chart_temp_element, {
    type: 'line',
    data: {
        datasets: [{
            pointRadius: 0,
            backgroundColor: "#6777EF20",
            borderColor: '#6777ef',
            data: tempGraphHistory

    }]
    },
    options: {
        legend: {
            display: false
        },
        responsive: true,
        scales: {
            xAxes: [{
                type: 'time',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                },
                ticks: {
                    major: {
                        fontStyle: 'bold',
                        fontColor: '#FF0000'
                    }
                }
      }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Celsius'
                }
      }]
        }
    }
})





$("#range-select li a").click(function () {
    console.log('press')
})

$('#myDropdown').on('show.bs.dropdown', function () {
    // do something…
})

function newDate(days) {
    return moment().add(days, 'd').toDate();
}

function newDateString(days) {
    return moment().add(days, 'd').format();
}
