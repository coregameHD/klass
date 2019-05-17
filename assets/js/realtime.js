function nodeUpdated(data) {
  parsedData = JSON.parse(data);
  if (("Notification" in window) && (Notification.permission === "granted")) {
    var notification = new Notification("New data from " + parsedData.name);
  }
  loadAllData()
  iziToast.success({
    title: 'New data from ' + parsedData.name,
    message: 'AQI Index, Temperature & Humidity chart updated',
    position: 'topRight',
    timeout: 2000,
  });

}

// Notification
if ("Notification" in window) {
  Notification.requestPermission().then(function(permission) {
    console.log("Permission: " + permission);
  });
}

// Azure SignalR
const connection = new signalR.HubConnectionBuilder()
  .withUrl(`https://realtimebroadcaster.azurewebsites.net/api`)
  .configureLogging(signalR.LogLevel.Information)
  .build();
connection.on('nodeUpdated', nodeUpdated);
connection.onclose(() => console.log('disconnected'));
console.log('connecting...');
connection.start()
  .catch(console.error);