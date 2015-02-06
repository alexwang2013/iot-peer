var iot_peer = require("../../iot-peer.js");
var com_port = "/dev/ttyACM0";
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
		  var strData = data.toString();
		  var arrData = strData.split('\n');
		  arrData.forEach(function(element, index, array) {
		    if(/^B.*/.test(element)){
		    	console.log(element);
			if(element.length > 1){
		          var decimalValue = element.substr(1);
		          console.log(decimalValue);
		          var hexValue = Number(decimalValue).toString(16);
		          if(hexValue.length <= 1) {
		             hexValue = '0'+hexValue;
	                  }
		          console.log(hexValue);
	                  var strBuff = 'ffffffff905a3130303031'+hexValue+'004700000000';
			  console.log(strBuff);
	                  var orig_buff = new Buffer(strBuff,'hex');
	                  var opt = { client_time: Date.now(), data: orig_buff};
                          iot_peer.send_data(opt);
		        }
		    }
		  });
		});
	  }
	});
        
});
