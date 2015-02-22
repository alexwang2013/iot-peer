var iot_peer = require("../../iot-peer.js");
var com_port = "/dev/ttyACM0";
var baudrate = 115200;
iot_peer.login("sensor1",function(data){
	setInterval(function(){
		  bunch_send_data();
	},1000);
});

function bunch_send_data() {
	for(var i = 32; i<32+30; i++) {
		var heart_rate = Math.floor((Math.random() * 5) + 70);
                var breath_rate = Math.floor((Math.random() * 5) + 25);
                var str_hex_heart = getHexStrFromVal(heart_rate);
                var str_hex_breath = getHexStrFromVal(breath_rate);

		var device_id = '5a31303030'+i;
		postdata(device_id, str_hex_heart, str_hex_breath);
	}
}

function getHexStrFromVal(decimalValue){
	var hexValue = Number(decimalValue).toString(16);
	  if(hexValue.length <= 1) {
	     hexValue = '0'+hexValue;
	  }
	  //console.log(hexValue);
          return hexValue;
}

function postdata(device_id, heart_rate, breath_rate){
      var strBuff = 'ffffffff90'+device_id+heart_rate+breath_rate+'47000000000000000000000000000000000627';
      //console.log(strBuff);
      var orig_buff = new Buffer(strBuff,'hex');
      var opt = { client_time: Date.now(), data: orig_buff};
      iot_peer.send_data(opt);
}
