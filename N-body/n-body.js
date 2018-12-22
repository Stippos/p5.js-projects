var g = 0.00001;
var scl = 1;
var newPlanet = false;
var planetSize = 0;

var p1 = {
  x: 320,
  y: 240,
  vx: 0,
  vy: 0,
  m: 200,
  c: '#fae'
};

var p2 = {
  x: 100,
  y: 240,
  vx: 0,
  vy: -19,
  m: 2,
  c: 255
};

var p3 = {
  x: 320,
  y: 280,
  vx: 6,
  vy: 0,
  m: 7,
  c: 'blue'
};

var p4 = {
  x: 400,
  y: 240,
  vx: 0,
  vy: -30,
  m: 2,
  c: 255
};



var ps = [p1, p2];

function setup() {
  width = 1200;
  height = 1200;
  createCanvas(width, height);
  frameRate(30);
}

function draw(){

  background(255);

  for(var i = 0; i < ps.length; i++){
    fx = 0;
    fy = 0;
    for(var j = 0; j < ps.length; j++){
      if(j != i){
        forces = f(ps[i].m, ps[i].x, ps[i].y, ps[j].m, ps[j].x, ps[j].y);
        fx += forces[0];
        fy += forces[1];
      }
    }
    ps[i].vx += fx / ps[i].m;
    ps[i].vy += fy / ps[i].m;
  }

  for(i = 0; i < ps.length; i++){
    ps[i].x += ps[i].vx;
    ps[i].y += ps[i].vy;
    //ps = ps.filter(p => eat(ps[i], p));
  }


  for(i = 0; i < ps.length; i++){
    fill(ps[i].c);
    ellipse(ps[i].x, ps[i].y, ps[i].m * scl, ps[i].m * scl);
  }

  if(mouseIsPressed){
    newPlanet = true;
    planetSize += 1;
    ellipse(mouseX, mouseY, planetSize * scl, planetSize * scl);
  }else if(newPlanet){
    ps.push({
      x: mouseX,
      y: mouseY,
      vx: (random() - 0.5) * 3,
      vy: (random() - 0.5) * 3,
      m: planetSize,
      c: random()*255
    });
    newPlanet = false;
    planetSize = 0;
  }

}

function f(m1, x1, y1, m2, x2, y2){
  var r = Math.sqrt((x1 - x2)^2 + (y2 - y1)^2);
  var force = g * m1 * m2 / r^3;

  var angle = Math.atan(abs(y1 - y2) / abs(x1 - x2));
  var fx = Math.cos(angle) * force;
  var fy = -Math.sin(angle) * force;

  if(x1 > x2){
    fx = -fx;
  }
  if(y1 < y2){
    fy = -fy;
  }
  return [fx, fy];
}

function eat(p1, p2){
  var r = Math.sqrt((p1.x - p2.x)^2 + (p1.y - p2.y)^2);
  console.log(r);
  console.log(p1.m);
  console.log((r < (p1.m * scl / 2)) && (p1.m > p2.m));
  if(((r < (p1.m * scl / 2)) && (p1.m > p2.m))){
    return false;
  }else{
    return true;
  }

}
