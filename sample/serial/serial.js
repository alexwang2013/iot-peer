var iot_peer = require("../../iot-peer.js");
var com_port = "COM11";
var baudrate = 115200;
iot_peer.login("sensor1",function(data){
	
	  // message receiving
	var SerialPort = require("serialport").SerialPort
	var serialPort = new SerialPort(com_port, {
	  baudrate: baudrate
	}, false); // this is the openImmediately flag [default is true]
	
	serialPort.open(function (error) {
	  if ( error ) {
		console.log('failed to open: '+error);
	  } else {
		console.log('open');
		serialPort.on('data', function(data) {
		  console.log(data);
                  var opt = { client_time: Date.now(), data: data};
                  iot_peer.send_data(opt);
		});
	  }
	});
        
});
