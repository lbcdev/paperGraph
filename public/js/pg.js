var c = new fabric.Canvas('myCanvas');
c.setHeight(500);
c.setWidth(850);

var c1, c2;
var rds = 20;
c1 = {left:100, top:200, color:'blue'};
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

drawGraph(V, e);

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
