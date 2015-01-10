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
		  console.log('\n\n\ndata received: ');
		  console.log(data);
		  //console.log(data);
		  var str_data=data.toString('utf8');
		  console.log('\n\n\nformat data is:');
		  console.log(str_data);
		});
		serialPort.write("SKSREG S1 12345678abcdef01\nSKSREG S2 21\nSKSREG S3 8888\n", function(err, results) {
		  console.log('err ' + err);
		  console.log('results ' + results);
		});
	  }
	});
	
	/*
	console.log("starting to send data");
	setInterval(
		function(){
			iot_peer.send_data(50);
		}
		,1000
	);
	*/
});
