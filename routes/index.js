var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
var mongoose = require('mongoose');
var Security = mongoose.model('Security');
var ip;

// var datemod = require("./date");
// var mad = require('./mad');

/* GET home page. */

router.get('/', function(req, res, next) {
	// f(req.cookies.wid == undefined){
// 	res.redirect('ibm.biz/netdiscover', { title: 'Express' });
// 	}
// 	 else
	 res.render('home', { title: 'Home' });

});
//
// router.post('/scanip', function(req, res, next) {
//
// 	res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE");
//
//   ip = req.body.ip;
//   var date = "jul";
//
//   console.log("Ip Addr: ",req.body.ip)
//   var options = {
//       scriptPath: './',
//       args: [req.body.ip, date]
//   };
//   PythonShell.run('sudoScript2.py', options, function (err, results) {
// 		var data = "Got the data   " + req.body.ip;
// //  	res.send(data)
// 		/* */
// 		var col= "RSLT" + datemod.getDate();
// 		var cmpresult = mad.check(ip, col);
//
//   		res.send({cmpresult: cmpresult});
//       if (err){
//         console.error('There was an error reading the file!', err);
//         return;
//       }
//       console.log('results: %j', results);
//       // results is an array consisting of messages collected during execution
//  });
// });

module.exports = router;
