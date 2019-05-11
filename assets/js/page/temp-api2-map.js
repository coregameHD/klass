var array_mapid = [];
var array_mapname = [];
var array_maplatitude = [];
var array_maplongitude = [];

var array_marker = [];

$.getJSON("https://lapsscentral.azurewebsites.net/api/nodeinfos", function(data) {
    for (var i = 0; i < data.length; i++){
        array_mapid.push(data[i].id);
        array_mapname.push(data[i].name);
        array_maplatitude.push(data[i].latitude);
        array_maplongitude.push(data[i].longitude);
    }
});