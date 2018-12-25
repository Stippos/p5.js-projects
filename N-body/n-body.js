var p1 = {
  name: "Sun",
  x:  window.innerWidth / 2,
  y:  window.innerHeight / 2,
  vx: 0,
  vy: 0,
  r: 20,
  c: 'yellow'
};

var p2 = {
  name: "Mercurius",
  x:  window.innerWidth / 2,
  y:  window.innerHeight / 2 + 50,
  vx: 5.5,
  vy: 0,
  r: 2,
  c: 'orange'
};

var p3 = {
  name: "Earth",
  x:  window.innerWidth / 2,
  y:  window.innerHeight / 2 - 200,
  vx: -2,
  vy: 0,
  r: 5,
  c: 'green'
};

var p4 = {
  name: "Mars",
  x:  window.innerWidth / 2 + 350,
  y:  window.innerHeight / 2,
  vx: 0,
  vy: -1.5,
  r: 3,
  c: "red"
};

var p5 = {
  name: "Comet",
  x:  window.innerWidth / 2 - 200,
  y:  window.innerHeight / 2,
  vx: 0,
  vy: 2,
  r: 3,
  c: "black"
};

var g;
var scl = 1;
var newPlanet = false;
var planetSize = 0;
var dt = 1;
var stopped = false;
var damp = 1;
var history_lenght = 20;
var pg;
var n_planets;
var ps = [p1, p2, p3, p4, p5];

var drawTrajectories = true;
var n_planets;
var gSlider, tSlider, trajButton, pButton, stopButton;

var stats;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  stats = createGraphics(200, 200);
  stats.background(200);

  gSlider = createSlider(0, 1, 0.1, 0.01);
  tSlider = createSlider(0, 10, 1, 0.1);
  trajButton = createButton("Draw trajectories");
  pButton = createButton("Add Planet");
  stopButton = createButton("Stop");

  gSlider.position(20, 50);
  tSlider.position(20, 90);
  trajButton.position(20, 130);
  pButton.position(20, 160);
  stopButton.position(20, 190);

  trajButton.mousePressed(switchTrajectories);
  pButton.mousePressed(addPlanet);
  stopButton.mousePressed(stopSimulation);

  background(255);
}

function draw(){

  n_planets = ps.length;

  if(drawTrajectories){
    background(255);
  }

  stats.resizeCanvas(200, n_planets * 40)
  stats.background(255);

  for(i = 1; i < n_planets; i++){

    p1 = ps[i];
    p2 = ps[0];

    var r = Math.sqrt(pow((p1.x - p2.x),2) + pow((p1.y - p2.y), 2));
    var potential = g * pow(p1.r, 3)  * pow(p2.r, 3)  / r;
    potential = g * r * pow(ps[i].r, 3) / 50;

    var kinetic = 5 * (pow(ps[i].vx, 2) + pow(ps[i].vy, 2));

    stats.fill(ps[i].c);
    stats.text(ps[i].name, 5, 20 + (i - 1) * 40);

    stats.fill("green");
    stats.rect(70, 5 + (i - 1) * 40, r / 10, 5);

    stats.fill("orange");
    stats.rect(70, 10 + (i - 1) * 40, kinetic, 5);


  }

  image(stats, windowWidth - stats.width - 50, 0);


  fill(255);
  rect(150, 3, 200, 68);
  fill(0);
  textSize(20);
  text("Gravity: " + String(g), gSlider.x + gSlider.width + 5, gSlider.y - 25);
  text("Simulation speed: " + String(dt), tSlider.x + tSlider.width + 5, tSlider.y - 25);

  g = gSlider.value();
  dt = tSlider.value();




  for(var i = 0; i < n_planets; i++){
    fx = 0;
    fy = 0;
    for(var j = 0; j < n_planets; j++){
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

  for(i = 0; i < n_planets; i++){
    //ps[i].x += ps[i].vx * dt;


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



  for(i = 0; i < n_planets - 1; i++){
    for(j = i + 1; j < n_planets; j++){
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

  //DRAW PLANETS
  for(i = 0; i < n_planets; i++){
    fill(ps[i].c);
    //stroke(ps[i].c);
    ellipse(ps[i].x, ps[i].y, ps[i].r);
    fill(0);
    //text(ps[i].name, ps[i].x + ps[i].r, ps[i].y);
  }

  //ADD NEW PLANETS
  // if(mouseIsPressed){
  //   newPlanet = true;
  //   planetSize += 1;
  //   ellipse(mouseX, mouseY, planetSize, planetSize * scl);
  // }else if(newPlanet){
  //   ps.push({
  //     name: "Planet " + String(n_planets),
  //     x: mouseX,
  //     y: mouseY,
  //     vx: (random() - 0.5) * 3,
  //     vy: (random() - 0.5) * 3,
  //     r: planetSize,
  //     c: color(random()*255, random()*255, random()*255)
  //   });
  //   newPlanet = false;
  //   planetSize = 0;
  // }

}

function addPlanet(){
  ps.push({
    name: "Planet " + String(n_planets),
         x: random() * windowWidth,
         y: random() * windowHeight,
         vx: (random() - 0.5) * 3,
         vy: (random() - 0.5) * 3,
         r: random() * 5,
         c: color(random()*255, random()*255, random()*255)
       });
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

function switchTrajectories(){
    if(drawTrajectories){
      drawTrajectories = false;
      trajButton.html("Hide trajectories");
    }else{
      drawTrajectories = true;
      trajButton.html("Draw trajectories");
    }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function stopSimulation(){
  if(stop){
    loop();
    stop = false;
    stopButton.html("Stop");
  }else{
    noLoop();
    stop = true;
    stopButton.html("Start");
  }
}
