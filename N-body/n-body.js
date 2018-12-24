var g = 0.10;
var scl = 1;
var newPlanet = false;
var planetSize = 0;
var dt = 1;
var stopped = false;
var damp = 1;
var history;
var history_lenght = 100;

var p1 = {
  name: "Sun",
  x:  window.innerWidth / 2,
  y:  window.innerHeight / 2,
  vx: 0,
  vy: 0,
  r: 20,
  c: 'red'
};

var p2 = {
  name: "Mercurius",
  x:  window.innerWidth / 2,
  y:  window.innerHeight / 2 + 50,
  vx: 5.5,
  vy: 0,
  r: 1,
  c: 'red'
};

var p3 = {
  name: "Earth",
  x:  window.innerWidth / 2,
  y:  window.innerHeight / 2 - 350,
  vx: -1,
  vy: 0,
  r: 5,
  c: 'yellow'
};

var p4 = {
  name: "Mars",
  x:  window.innerWidth / 2 + 350,
  y:  window.innerHeight / 2,
  vx: 0,
  vy: -1.5,
  r: 3,
  c: 255
};

var p5 = {
  name: "Comet",
  x:  window.innerWidth / 2 - 30,
  y:  window.innerHeight / 2,
  vx: 0,
  vy: 7,
  r: 3,
  c: 255
};



var ps = [p1, p2, p3, p4, p5];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  history = [[]];
  //gui = createGui('p5.gui');
  //gui.addGlobals('g', 'dt');

  //noLoop();
}

function draw(){

  background(1);

  for(var i = 0; i < ps.length; i++){
    fx = 0;
    fy = 0;
    for(var j = 0; j < ps.length; j++){
      if(j != i){
        forces = f(ps[i], ps[j]);
        fx += forces[0];
        fy += forces[1];
      }
    }
    ps[i].vx += fx / pow(ps[i].r, 3) * dt;
    ps[i].vy += fy / pow(ps[i].r, 3) * dt;
    ps[i].vx = ps[i].vx * damp;
    ps[i].vy = ps[i].vy * damp;

  }

  for(i = 0; i < ps.length; i++){
    //ps[i].x += ps[i].vx * dt;

    history[frameCount - 1 % history_lenght] = ps;

    ps[i].y += ps[i].vy * dt;
    ps[i].x += ps[i].vx * dt;

    // if((ps[i].y < ps[i].r / 2.0) || (ps[i].y > windowHeight - ps[i].r / 2.0)){
    //   ps[i].vy = -ps[i].vy
    // }
    //
    // if((ps[i].x < ps[i].r / 2.0) || (ps[i].x > windowWidth - ps[i].r / 2.0)){
    //   ps[i].vx = -ps[i].vx
    // }
    //
    //
    // ps[i].y = Math.min(Math.max(ps[i].y, ps[i].r / 2.0), windowHeight - ps[i].r / 2.0);
    // ps[i].x = Math.min(Math.max(ps[i].x, ps[i].r / 2.0), windowWidth - ps[i].r / 2.0);

    //ps = ps.filter(p => eat(ps[i], p));
  }
  ps[0].y = windowHeight / 2;
  ps[0].x = windowWidth / 2;

  for(i = 0; i < ps.length - 1; i++){
    for(j = i + 1; j < ps.length; j++){
      var r = Math.sqrt(pow(ps[i].x - ps[j].x, 2) + pow(ps[i].y - ps[j].y, 2));
      if(r < (ps[i].r + ps[j].r) / 2){
        var vx = (ps[i].vx * pow(ps[i].r, 3) + ps[j].vx * pow(ps[j].r, 3)) / (pow(ps[i].r, 3) + pow(ps[j].r, 3));
        var vy = (ps[i].vy * pow(ps[i].r, 3) + ps[j].vy * pow(ps[j].r, 3)) / (pow(ps[i].r, 3) + pow(ps[j].r, 3));
        ps[i].vx = vx * 0.9;
        ps[i].vy = vy * 0.9;
        ps[j].vx = vx * 0.9;
        ps[j].vy = vy * 0.9;
      }

    }
  }

  console.log(history[0][0])
  //DRAW PLANETS
  for(i = 0; i < ps.length; i++){
    fill(ps[i].c);
    //stroke(ps[i].c);
    ellipse(ps[i].x, ps[i].y, ps[i].r, ps[i].r);
    text(ps[i].name, ps[i].x + ps[i].r, ps[i].y);

    for(j = 0; j < history.length; j++){
      ellipse(history[j][i].x, history[j][i].y, history[j][i].r);
    }
  }

  //ADD NEW PLANETS
  if(mouseIsPressed){
    newPlanet = true;
    planetSize += 1;
    ellipse(mouseX, mouseY, planetSize, planetSize * scl);
  }else if(newPlanet){
    ps.push({
      name: "Planet " + String(ps.length),
      x: mouseX,
      y: mouseY,
      vx: (random() - 0.5) * 3,
      vy: (random() - 0.5) * 3,
      r: planetSize,
      c: color(random()*255, random()*255, random()*255)
    });
    newPlanet = false;
    planetSize = 0;
  }

}

function f(p1, p2){
  var r = Math.sqrt(pow((p1.x - p2.x),2) + pow((p1.y - p2.y), 2));

  var force = g * pow(p1.r, 3)  * pow(p2.r, 3)  / pow(r, 2);

  if(r < (p1.r + p2.r) / 2){
    force = force;
  }

  var angle = Math.atan(abs(p1.y - p2.y) / abs(p1.x - p2.x));
  var fx = Math.cos(angle) * force;
  var fy = -Math.sin(angle) * force;

  if(p1.x > p2.x){
    fx = -fx;
  }
  if(p1.y < p2.y){
    fy = -fy;
  }

  return [fx, fy];
}

function eat(p1, p2){
  var r = Math.sqrt((p1.x - p2.x)^2 + (p1.y - p2.y)^2);
  //console.log(r);
  //console.log(p1.r);
  //console.log((r < (p1.r * scl / 2)) && (p1.r > p2.r));
  if(((r < (p1.r * scl / 2)) && (p1.r > p2.r))){
    return false;
  }else{
    return true;
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  function keyPressed(){
    if(keyCode === UP_ARROW && !stopped){
      noLoop();
      stopped = true;
    }else if(keyCode === UP_ARROW && stopped){
      loop();
      stopped = false;
    }
  }
}
