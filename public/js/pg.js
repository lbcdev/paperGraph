
$(".popup").hide();
$(".locater4").click(function() {
  $(".popup").show();
});
$("#btnclose").click(function() {
  $(".popup").hide();
});

$("#btngen").click(function() {
    var nvert = $("#nvert").val();
    var nedge = $("#nedge").val();
    console.log(nvert);
    V = genVertices(nvert);
    E = genEdges(V, nedge);
    drawGraph(V, E);
});

var rds = 10;



/* drawing method for the graph. */
function drawGraph(v, e){
  var c = new fabric.Canvas('myCanvas');
  c.setHeight(500);
  c.setWidth(850);
  // draw vertices.
  v.forEach(function(item){
    c.add(item);
  });

  // draw edges.
  e.forEach(function(item){
    var s = V[item.split(",")[0]];
    var d = V[item.split(",")[1]];
    // console.log("src: " + s.left);
    // console.log("dst: " + d.left);
    var color = '#' + (function co(lor){ return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
  && (lor.length == 6) ?  lor : co(lor); })('');
    var ln = new fabric.Line([s.left + rds,(s.top + rds),d.left+ rds,d.top+ rds], {
    				stroke: color});
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
    loopcount = loopcount - 1;
  }
  return e;
}
