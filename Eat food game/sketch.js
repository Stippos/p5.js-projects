var block = 20;
var speed = 5;
var xpos = 50;
var ypos = 50;
var xspeed;
var yspeed;
var score = 0;


var foodSize = 10;
var foodRand = 1;
var foodX = 100;
var foodY = 100;
var width;
var height;
var foodXspeed = 0;
var foodYspeed = 0;
var distance;

function setup() {
  width = 640;
  height = 480;
  createCanvas(width, height);
  frameRate(60);
}

function draw() {

  if( (foodX <= xpos + block) && foodX >= xpos && foodY >= ypos && (foodY <= ypos + block)){
    score += 1;
    foodX = Math.random() * width;
    foodY = Math.random() * height;
    foodXspeed = 0;
    foodYspeed = 0;
  }
  background(51);

  fill(255);
  rect(xpos, ypos, block, block);

  textSize(20);
  text("Score: " + String(score), 30, 30);

  fill('#fae');
  ellipse(foodX, foodY, foodSize, foodSize);

  xspeed = 0;
  yspeed = 0;

  if(keyIsDown(LEFT_ARROW)) { xspeed -= 1;}
  if(keyIsDown(RIGHT_ARROW)){ xspeed += 1;}
  if(keyIsDown(UP_ARROW))   { yspeed -= 1;}
  if(keyIsDown(DOWN_ARROW)) { yspeed += 1;}

  xpos = Math.min(width - block, Math.max(xpos + xspeed * speed, 0));
  ypos = Math.min(height - block, Math.max(ypos + yspeed * speed, 0));

  foodXspeed += (Math.random() - 0.5) * foodRand * 0.9;
  foodYspeed += (Math.random() - 0.5) * foodRand * 0.9;

  if(((foodX + foodXspeed) < 0) || ((foodX + foodXspeed) > (width - foodSize))){
    foodXspeed = -foodXspeed;
    foodX = foodX + foodXspeed;
  }else{
    foodX = foodX + foodXspeed;
  }

  if((foodY + foodYspeed < 0) ||(foodY + foodYspeed > height - foodSize)){
    foodYspeed = -foodYspeed;
    foodY = foodY + foodYspeed;
  }else{
    foodY = foodY + foodYspeed;
  }
}
