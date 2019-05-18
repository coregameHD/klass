"use strict";

// Helper Function: Generate Google Maps marker with an AQI number
function generateMarker(aqi) {
	var canvas = document.createElement('canvas');
	canvas.height = 64;
	canvas.width = 64;

	var ctx = canvas.getContext("2d");

	if (aqi <= 25) {
		ctx.fillStyle = "#3BCCFF";	//Light Blue
		ctx.strokeStyle = "#2D9ABF";
	} else if (aqi >= 26 && aqi <= 50) {
		ctx.fillStyle = "#92D050";	//Green
		ctx.strokeStyle = "#74A540";
	} else if (aqi >= 51 && aqi <= 100) {
		ctx.fillStyle = "#FFF200";	//Yellow
		ctx.strokeStyle = "#D3A902";
	} else if (aqi >= 101 && aqi <= 200) {
		ctx.fillStyle = "#FFA200";	//Orange
		ctx.strokeStyle = "#BF7900";
	} else if (aqi > 200) {
		ctx.fillStyle = "#FF3B3B";	//Red
		ctx.strokeStyle = "#BF2D2D";
	}

	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(32, 32, 24, 0, Math.PI * 2, true);
	ctx.fill();

	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = "bold 14px Segoe UI";

	if (aqi > 200) {
		ctx.fillStyle = "white";
	} else {
		ctx.fillStyle = "#17202A";
	}
    
    if (isNaN(aqi)){
		ctx.fillText("N/A", 32, 32, 64);
    }
    else{
		ctx.fillText(aqi, 32, 32, 64);
    }
	ctx.stroke();

	var marker = canvas.toDataURL("image/png;base64");
	return marker;
}

// Helper Function: Display pop-up when user clicked on the marker
function displayPopup(marker, title, content) {
	google.maps.event.addListener(marker, "click", function (e) {
		swal(title, content);
	});
}



window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

(function (global) {
	var MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	var COLORS = [
		'#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba'
	];

	var Samples = global.Samples || (global.Samples = {});
	var Color = global.Color;

	Samples.utils = {
		// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
		srand: function (seed) {
			this._seed = seed;
		},

		rand: function (min, max) {
			var seed = this._seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this._seed = (seed * 9301 + 49297) % 233280;
			return min + (this._seed / 233280) * (max - min);
		},

		numbers: function (config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 1;
			var from = cfg.from || [];
			var count = cfg.count || 8;
			var decimals = cfg.decimals || 8;
			var continuity = cfg.continuity || 1;
			var dfactor = Math.pow(10, decimals) || 0;
			var data = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = (from[i] || 0) + this.rand(min, max);
				if (this.rand() <= continuity) {
					data.push(Math.round(dfactor * value) / dfactor);
				} else {
					data.push(null);
				}
			}

			return data;
		},

		labels: function (config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 100;
			var count = cfg.count || 8;
			var step = (max - min) / count;
			var decimals = cfg.decimals || 8;
			var dfactor = Math.pow(10, decimals) || 0;
			var prefix = cfg.prefix || '';
			var values = [];
			var i;

			for (i = min; i < max; i += step) {
				values.push(prefix + Math.round(dfactor * i) / dfactor);
			}

			return values;
		},

		months: function (config) {
			var cfg = config || {};
			var count = cfg.count || 12;
			var section = cfg.section;
			var values = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = MONTHS[Math.ceil(i) % 12];
				values.push(value.substring(0, section));
			}

			return values;
		},

		color: function (index) {
			return COLORS[index % COLORS.length];
		},

		transparentize: function (color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return Color(color).alpha(alpha).rgbString();
		}
	};

	// DEPRECATED
	window.randomScalingFactor = function () {
		return Math.round(Samples.utils.rand(-100, 100));
	};

	// INITIALIZATION

	Samples.utils.srand(Date.now());

	// Google Analytics
	/* eslint-disable */
	if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
		(function (i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function () {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o),
				m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
		ga('create', 'UA-28909194-3', 'auto');
		ga('send', 'pageview');
	}
	/* eslint-enable */

}(this));