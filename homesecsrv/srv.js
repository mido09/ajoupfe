const http = require('http')
const express = require('express')
const app = express();
var mysql = require('mysql');

var httpServer = http.createServer(app);

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const io = require('socket.io')(httpServer);

var homeconfig = {"latitude":0, "longitude":0};
var sensorStatus = {"connected":"TRUE", "state":"ON", "alerting":"FALSE"};
var mobileconfig = {"connected":"FALSE", "latitude":43.627770, "longitude":7.048154};
var isAuth = false;
var user = "";

var connection = mysql.createConnection({
  host     : '172.17.0.5',
  port     : 3306,
  user     : 'root',
  password : 'Tkhabel_1234',
  database : 'homesec_db'
});
connection.connect();



httpServer.listen(1300, ()=>{

console.log("server is listening on port 1300");
io.emit("connected",sensorStatus.connected);
io.emit("state",sensorStatus.state);
io.emit("alerting",sensorStatus.alerting);

});


app.get("/",(req,res)=>{
console.log("Got request on /");
res.end("OK");
});


app.get("/setOff",(req,res)=>{
console.log("Got request on /setOff");
//port.write('0');
io.emit("setOff",0);
var rss = {"message":"SetOFF Ok"};
sensorStatus.state = "OFF";
sensorStatus.alerting = "FALSE";
io.emit("state","OFF");
io.emit("alerting","FALSE");
res.end(JSON.stringify(sensorStatus));
});


app.get("/getServerState",(req,res)=>{
console.log("Got request on /getServerState");
res.end(JSON.stringify(sensorStatus));
});

app.get("/setOn",(req,res)=>{
console.log("Got request on /setOn");
//port.write('1');
io.emit('setOn',1);
sensorStatus.state = "ON";
io.emit("state","ON");
var rss = {"message":"SetON Ok"};
res.end(JSON.stringify(sensorStatus));
});

app.get("/reset",(req,res)=>{
console.log("Got request on /reset");
//port.write('r');
io.emit('reset',0);
var rss = {"message":"Reset Ok"};
sensorStatus.alerting = "FALSE";
io.emit("alerting","FALSE");
res.end(JSON.stringify(sensorStatus));
});

app.get("/getHomeConfig",(req,res)=>{
console.log("Got request on /getHomeConfig");
res.end(JSON.stringify(homeconfig));
});

app.get("/getMobileConfig",(req,res)=>{
console.log("Got request on /getMobileConfig");
res.end(JSON.stringify(mobileconfig));
});

app.get("/setHomeConfig",(req,res)=>{
var lat = req.query.lat;
var lon = req.query.lon;
console.log("Got request on /setHomeConfig with params: lat="+lat+" | lon="+lon);
homeconfig.latitude = lat;
homeconfig.longitude = lon;
io.emit("homeconfig",homeconfig);
res.end(JSON.stringify(homeconfig));
});


//Authentication handler

app.get("/getAuthStatus",(req,res)=>{
console.log("Got request on /getAuthStatus");
var qrs = {"isAuth":isAuth, "user":user};
res.end(JSON.stringify(qrs));
});

app.post("/disconnect",(req,res)=>{
console.log("Got post request on /disconnect");
isAuth = false;
io.emit("auth",isAuth);
res.end(JSON.stringify(isAuth));
});

app.post("/login",(req,res)=>{
console.log("Got post request on /login");
var allUsers = [];
connection.query('SELECT * FROM user', function (error, results, fields) {
  	if (error) {
        	res.end(JSON.stringify(error));
        	throw error;
        	}
  	console.log('The solution is: ', JSON.stringify(results));
	allUsers = results;
	
	var found = false;
	var email = req.body.email;
	var password = req.body.password;

	for(var i=0;i<allUsers.length;i++){
		if((allUsers[i].email==email)&&(allUsers[i].password==password)){
			found = true;
			isAuth = true;
			user = allUsers[i].username
		}
	}
	if(isAuth){
	var qrs = {"isAuth":isAuth, "user":user};
	io.emit("auth",qrs);
	res.end(JSON.stringify(qrs));
	}
	else{
	var qrs = {"isAuth":isAuth, "user":"null"};	
	res.end(JSON.stringify(qrs));
		}
	});
});

app.post("/insertUser",function(req,res){
        var username = req.body.username;
        var email = req.body.email;
	var password = req.body.password;
        var card = req.body.card;
	var quer = "INSERT INTO \`user\` (\`username\`, \`email\`, \`password\`, \`card_id\`) VALUES (\'"+username+"\', \'"+email+"\', \'"+password+"\', \'"+card+"\')"
	console.log("query ->"+quer);
	connection.query(quer, function (error, results, fields) {
 	 if (error) {
  	      res.end(JSON.stringify(error));
   	     throw error;
        }
  	console.log('The solution is: ', JSON.stringify(results));
  	res.end(JSON.stringify(results));
	});
});

app.get("/getAllUsers",function(req,res){
 	connection.query('SELECT * FROM user', function (error, results, fields) {
  	if (error) {
        	res.end(JSON.stringify(error));
        	throw error;
        	}
  	console.log('The solution is: ', JSON.stringify(results));
  	res.end(JSON.stringify(results));
	});
});



//Socket handler

io.on('connection', (socket) => { 
console.log("socket connected ...");
console.log("public ip ->"+socket.handshake.address);
socket.on("cardState",function(data){
 console.log("received card state:"+JSON.stringify(data));
 sensorStatus.state = data.state;  
});
socket.on("alerting",function(data){
 console.log("received alerting event ...");
 sensorStatus.alerting = "TRUE";
 io.emit("alerting","TRUE");

});

});

//const SerialPort = require('serialport')
//const Readline = require('@serialport/parser-readline')

//const port = new SerialPort("/dev/ttyACM0", {baudRate:9600});

//const parser = new Readline()
//port.pipe(parser)


//var lastLine = null;

//parser.on('data', line => {

//console.log(`> ${line}`)

//var currentLine = parseFloat(line);
//if(lastLine!=null){
//var diff = currentLine - lastLine;
//if(Math.abs(diff)>5) 
//{
//var today = new Date();
//var date = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();
//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//var dateTime = date+' '+time;
//console.log(dateTime+" : Someone is moving");
//if(sensorStatus.state=="ON")
//{
//	sensorStatus.alerting = "TRUE";
//	io.emit("alerting","TRUE");
//}
//port.write('x');
//}
//else console.log("No One is there");
//}
//lastLine = parseFloat(line);
//})
