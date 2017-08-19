function genVertices (num){
  var V = new Array();
  var i;
  for(i = 0; i < num; i++){
    var left = Math.floor((Math.random() * 500) + 100);
    var top = Math.floor((Math.random() * 300) + 100);
    var color = "#" + Math.floor((Math.random() * 100000) + 100000);
    var c = {l: left, t: top, c: color};
    V.push(c);
  }
  return V;
}
