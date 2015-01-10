var iot_peer = require("../iot-peer.js");
iot_peer.login("sensor1",function(data){
	console.log("starting to send data");
	setInterval(
		function(){
			iot_peer.send_data(50);
		}
		,1000
	);
});
