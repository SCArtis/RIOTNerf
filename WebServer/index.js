//HTTP-Server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//COAP-Server
var coap = require('coap');
var coapServer = coap.createServer({type: 'udp6'});

coapServer.on('request', function(req, res){
  console.log('COAP: Request came in');

  //NAch Methode unterscheiden (PUT, GET, etc).
  /*
  var method = req.method;
  console.log(method);
  var url = req.url;
  console.log(url);
  //get PUT value and print on console
  if(method == 'PUT'){
    var value = url.split('=');
    console.log(value[1]);
  }
  res.end('Hello ' + req.url.split('/')[1] + '\n');
  */


  //Payload in Textform 
  var payload = req.payload;
  console.log(payload.toString());
  if(payload == 'hello'){
    res.end('Welcome Home');
  }
  res.end('Gway!');
});

/**
coapServer.listen(function(){
  var request = coap.request('coap://localhost/Matteo');

  request.on('response', function(response){
    response.pipe(process.stdout);
    response.on('end', function(){
      //process.exit(0);
    });
  });
  request.end();
});
*/



//hier 8888?
coapServer.listen(function(){
  //var request = coap.request('coap://localhost/Matteo');
  //request.end();
  console.log('COAP listening ');
});

//provide Webpage
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



//Web-Functionality
io.on('connection', function(socket){
  //When User clicks Button on Webpage, 'chat message' is emitted, message is reversed and sent back
 	socket.on('user input', function(msg){

	    console.log('input: '+ msg);

	    io.emit('user input', msg);

		//-------------------------//-----------------------------//
		//put periph/testled 1||0 als Payload (auch mal mit 2 testen)
    var request = coap.request('localhost/');
    //var request = coap.request('coap://[fd1d:8d5c:12a5:0:4be3:4e73:718d:600a]/periph/servos');
		//var request = coap.request('coap://[fd1d:8d5c:12a5:0:4be3:4e73:718d:600a]/periph/testled');
		//console.log('request ' + request.url);

		/*
    var payload = '1';
		request.write(payload);
		console.log('payload ' + payload);
    */
		
		//request.on('response', function(response){
		//	console.log(response);
			//response.pipe(process.stdout);
		//});
		request.end();
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});