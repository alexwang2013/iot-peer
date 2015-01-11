var iot_peer = require("../../iot-peer.js");
iot_peer.login("sensor_data",function(data){
	console.log("starting to receive data");
	iot_peer.onDataReceived(
		function(data){
			console.log(data);
		}
	);
});
