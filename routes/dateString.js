//var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
exports.dateAsStr = function(){

var d= new Date();
console.log(d);
var times = d.toString().split(" ");
var date = times[0] + "-" + times[1] + "-" + times[2] + "-" + times[3] + ".log";

return date;
}