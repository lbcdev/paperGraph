var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var lgr = require('./routes/logger');
var log = lgr.getTraceLogger("app.js");
var fs = require('fs');
var cors = require('cors');


mongoose.connect('mongodb://localhost/testDB');
require('./models/Security');

var Cookies = require( "cookies" )

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  log.info("MongoDB Connected")
});

//var users = require('./routes/users');
var app = express();

app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);
var routes = require('./routes/index');
//var users = require('./routes/users');
// var schedule = require('./routes/schedule');
// var aggs = require('./routes/aggressive');

app.use('/', routes);
// app.use("/schedule", schedule);
// app.use("/aggs", aggs);

//app.use('/users', users);

/*----- start of scan and check code ----*/
// var mad = require('./routes/mad');
// var scan = require('./routes/scan');
// var ovw = require('./routes/ovw');
// var settings = require('./routes/settings');
// var archivePull = require('./routes/archivePull')
// var dbutil = require("./routes/db");
// var cronjob = require("./routes/cron");

//dbutil.cachewam();
//dbutil.cachemad();

/* Use socket.io */
// var options = {
//   key: fs.readFileSync('./file.pem'),
//   cert: fs.readFileSync('./file.crt'),
//   ca: fs.readFileSync('./csr.pem')
// };
// var serverPort = 443;

// var https = require('https').createServer(options, app);



// var io = require('socket.io')(https);

// app.get('/aggressive', function(req, res){
// 	res.render('aggressive', { title: 'aggressive' });
// });
// app.get('/analytics', function(req, res){
// 	res.render('analytics', { title: 'analytics' });
// });
// app.get('/map', function(req, res){
// 	var cookies = new Cookies( req, res )
//   	cookies.set( "unsigned", "foo", { httpOnly: false } );
// 	res.render('map', { title: 'map' });
// }); // overview page.
// app.get('/report', mad.index); // mad comparison page.
// app.get('/settings', settings.index); // settings page, added 0629
// //app.get("/check", check.index);
// app.get("/scan", scan.index);
// // app.get("/schedule", schedule.index);

// io.on('connection', mad.update);
// io.on('connection', mad.ajaxreport);
// io.on('connection', mad.ajaxBriefCmp);
// io.on('connection', mad.config);
// io.on('connection', archivePull.ajaxreport);
// io.on('connection', archivePull.ajaxDB);

// https.listen(7005, function(){
  // log.info('Socket listening on port:7005');
// });

// httpajax.listen(7006, function(){
//   console.log('mongodb ajax listening on *:7006');
// });
//
// httpconfig.listen(7007, function(){
//   console.log('listening on *:7007');
// });
//
// http2.listen(7009, function(){
//   console.log('mongodb ajax listening on *:10009');
// });
// http3.listen(7010, function(){
//   console.log('mongodb ajax listening on *:10010');
// });

/*----- start of scan and check code ----*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(7000, function () {
  log.info('App listening on port 7000!');
});

/* Begin of download */

// var ibmdb = require('ibm_db');
// var wam = "DRIVER={DB2};DATABASE=SECURITY;HOSTNAME=watxdb1.watson.ibm.com;UID=SECWAM;PWD=1selwAm5;PORT=60014;PROTOCOL=TCPIP";
// var mad = "DRIVER={DB2};DATABASE=SECURITY;HOSTNAME=watxdb1.watson.ibm.com;UID=SECMAD;PWD=RmadO415;PORT=60014;PROTOCOL=TCPIP";
// var wamsql = "select machineid, host_name, booted_os_name, endpoint_type from REMOTE_CWAMPWR.MACHINE_PHY_WAM";
// // var madsql = "select name from REMOTE_MAD.SYSTEM";
// var madsql = "select sys.name as name, os.name as os, loc.name as loc from REMOTE_MAD.system sys left join REMOTE_MAD.operating_system os on sys.operating_system_id = os.id join REMOTE_MAD.location loc on sys.location_id = loc.id;"
//
// global.wamdata = "", global.maddata="";
// global.wamdatalen = "", global.maddatalen ="";
// global.cmp = {resultarr:[],status:{non:0, mad: 0, wam:0}};
//
// /*  Cache WAM data. */
// var importwam = function(){
//   ibmdb.open(wam, function (err,conn) {
//  	if (err) return console.log(err);
//  	var begin = new Date().getTime()/1000;
// 	conn.query(wamsql, function (err, data) {
//     if (err) console.log(err);
//     else {
// 	if (data.length > 0){
// 		global.wamdata = data;
// 		global.wamdatalen = data.length;
// 		console.log("In WAM: " + data.length);
// 		/* Check if device is in WAM. */
// 	    check();
// 		} else {
// 		console.log("No record!");
// 	}
//
// 	console.log(data[0]);
// 	var qtime = new Date().getTime()/1000 - begin;
// 	console.log("Get all use: " + qtime + "s");
//  	begin = new Date().getTime()/1000;
// // 	var result = "Not found!";
// 	for(var i = 0; i < data.length; i++){
// 		if(data[i].HOST_NAME == "IBM-e67abb739e0"){
// 			result = data[i].HOST_NAME;
// 			break;
// 		}
// 	}
// 	qtime = new Date().getTime()/1000 - begin;
// 	console.log("Query use:" + qtime + "s");
// // 	console.log(result);
// // 	savecmp(data, ckcol);
// 	}
//     conn.close(function () {
//       console.log('wam done');
//     });
//   });
// });
// }
// /* Cache MAD data. */
// var importmad = function(){
//   ibmdb.open(mad, function (err,conn) {
//  	if (err) return console.log(err);
//  	var begin = new Date().getTime()/1000;
// 	conn.query(madsql, function (err, data) {
//     if (err) console.log(err);
//     else {
// 	if (data.length > 0){
// 		global.maddata = data;
// 		global.maddatalen = data.length;
// 		console.log("In MAD: " + data.length);
// 		/* Check if device is in MAD. */
// 		check();
// 		} else {
// 		console.log("No record!");
// 	}
//
// 	console.log(data[0]);
// 	var qtime = new Date().getTime()/1000 - begin;
// 	console.log("Get all use: " + qtime + "s");
//  	begin = new Date().getTime()/1000;
// // 	var result = "Not found!";
// 	// for(var i = 0; i < data.length; i++){
// // 		if(data[i].HOST_NAME == "IBM-e67abb739e0"){
// // 			result = data[i].HOST_NAME;
// // 			break;
// // 		}
// // 	}
// 	// qtime = new Date().getTime()/1000 - begin;
// // 	console.log("Query use:" + qtime + "s");
// // 	console.log(result);
// // 	savecmp(data, ckcol);
// 	}
//     conn.close(function () {
//       console.log('wam done');
//     });
//   });
// });
// }
/* Mongodb operations. */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/testDB';
var ckcol = "ckresults";
var scancol = "pingScan";

var check = function(){
	var findsys = function(db, callback) {
	idx = 0;
	newcheck = {resultarr:[],status:{non:0, mad: 0, wam:0},osstats:{aix:0,win:0,lix:0,otr:0}};
	var cursor =db.collection(scancol).find();
    console.dir("madjs: mongodb: " + cursor);
	cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
      	var hostname = doc.fqdn.split("\\.")[0];
      	var info = {host:"", mac:"", ip:"", vendor:"", reg:"",os:"",loc:""};
		info.mac = doc.mac;
		info.host = doc.fqdn;
		info.vendor = doc.vendor;
		info.ip = doc.ipv4;
		var found = "false";
      	for(var i = 0; i < wamdatalen; i++){
			if(wamdata[i].HOST_NAME.trim() == hostname.trim()){
				info.reg = "Registered in WAM";
				info.os = "Unknown";
				info.loc = "Unknown";
				newcheck.status.wam++;
				newcheck.osstats.otr++;
				found = "true";
				break;
			}
		}
		if(found == "false"){
			for(var i = 0; i < maddatalen; i++){
				if(maddata[i].NAME.trim() == doc.fqdn.trim()){
					info.reg = "Registered in MAD";
					info.os = maddata[i].OS.trim();
					info.loc = maddata[i].LOC.trim();
					newcheck.status.mad++;
					var os = info.os.split(" ")[0];
					if(os == "AIX"){
						newcheck.osstats.aix++;
					}else if(os == "Windows"){
						newcheck.osstats.win++;
					}else if(os == "Linux"){
						newcheck.osstats.lix++;
					}else {
						newcheck.osstats.otr++;
					}

					found = "true";
					break;
				}
			}
		}
		if(found == "false"){
					info.reg = "Unknown device";
					info.os = "Unknown";
					info.loc = "Unknown";
					newcheck.status.non++;
					newcheck.osstats.otr++;
		}
		status = newcheck.status;
		newcheck.resultarr[idx] = info;
		idx++;
      } else {
         callback();
    	  }
 	  });
 	  if(cmp === newcheck){
 	  	// do nothing.
 	  }
	 	else cmp = newcheck;
	};
	MongoClient.connect(url, function(err, db) {
  	assert.equal(null, err);
 	console.log("Connected correctly to server.");
  	findsys(db, function() {

      db.close();
  		});
	});
}

// importwam();
// importmad();
// check();

/* End of download */
module.exports = app;
