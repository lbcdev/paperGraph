
$(".popup").hide();
$(".locater4").click(function() {
  $(".popup").show();
});
$("#btnclose").click(function() {
  $(".popup").hide();
});


var c = new fabric.Canvas('myCanvas');
c.setHeight(500);
c.setWidth(850);

var c1, c2;
var rds = 10;
c1 = {left:100, top:200, color: '#093098'};
c2 = {left:300, top:400, color:'green'};
c3 = {left:500, top:200, color:'gray'};
// c1.left = 100;

var cl1 = new fabric.Circle({
	radius: rds, fill: c1.color, left: c1.left, top: c1.top
});

var cl2 = new fabric.Circle({
	radius: rds, fill: c2.color, left: c2.left, top: c2.top
});

var V = new Array(cl1, cl2);

var cl3 = new fabric.Circle({
	radius: rds, fill: c3.color, left: c3.left, top: c3.top
});

V.push(cl3);

console.log("v[2].left: " + V[2].left);
var l1 = new fabric.Line([c1.left + rds,(c1.top + rds),c2.left+ rds,c2.top+ rds], {
        stroke: 'black'
});

var l2 = new fabric.Line([c2.left + rds,(c2.top + rds),cl3.left+ rds,c3.top+ rds], {
				stroke: 'black'});

var e = new Array();
e.push('0,2');
e.push('0,1');
e.push('2,1');
//c.add(cl1, cl2, cl3, l1, l2);

V = genVertices(20);
E = genEdges(V, 50);
drawGraph(V, E);

/* drawing method for the graph. */
function drawGraph(v, e){
  // draw vertices.
  v.forEach(function(item){
    c.add(item);
  });

  // draw edges.
  e.forEach(function(item){
    var s = V[item.split(",")[0]];
    var d = V[item.split(",")[1]];
    console.log("src: " + s.left);
    console.log("dst: " + d.left);
    var ln = new fabric.Line([s.left + rds,(s.top + rds),d.left+ rds,d.top+ rds], {
    				stroke: 'black'});
    c.add(ln);
  });
}

function genVertices (num){
  var V = new Array();
  var i;
  for(i = 0; i < num; i++){
    var left = Math.floor((Math.random() * 500) + 100);
    var top = Math.floor((Math.random() * 300) + 100);
    // var color = "#" + Math.floor((Math.random() * 200000) + 100000);
    var color = '#' + (function co(lor){ return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
  && (lor.length == 6) ?  lor : co(lor); })('');

    var c = new fabric.Circle({
    	radius: rds, fill: color, left: left, top: top
    });    V.push(c);
  }
  return V;
}

function genEdges(V, num){
  var loopcount = Math.min(V.length * V.length, num);
  var e = new Array();
  while(loopcount>0){
    var s = Math.floor((Math.random() * V.length));
    var d = Math.floor((Math.random() * V.length));
    var path = s + "," + d;
    e.push(path);
    console.log(path);
    loopcount = loopcount - 1;
  }
  return e;
}
