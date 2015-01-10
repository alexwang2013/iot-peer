var server_url = "http://www.tinymid.com:9033";
var current_temperature = 25;
var connected = false;
var socket = require('socket.io-client')(server_url);
var curtemp = 25;
socket.on('event', function(data){});
socket.on('disconnect', function(){});


function login(sensor_name, callback) {
	// Tell the server your username
	socket.emit('add user', sensor_name);
	// Whenever the server emits 'login', log the login message
	socket.on('login', function (data) {
		connected = true;
		// Display the welcome message
		var message = "Welcome to IoTData ";
		console.log(message);
		console.log('from server:');
		console.log(data);
		if(callback) {
			callback(data);
		}
		//send_data(50);
	});
}

function send_data( value ) {
	if(connected) {
		socket.emit('new message', value);
	}
}


var exports = module.exports = {};
exports.send_data = send_data;
exports.login = login;
