var log4js = require('log4js'); 
var date = require('./dateString');

var logfile = date.dateAsStr();

exports.getTraceLogger = function(name){
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('logs/'+logfile), name); 
var logger = log4js.getLogger(name);
logger.setLevel('TRACE');
return logger;

}


