var block = 20;

var game_over = false;
var start_screen = true;

var px;
var py;
var ex;
var ey;

var score = 0;
var hp = 100;

var es = 0.6;
var energy_cost = 1;
var heal = 20;
var damage = 100;

n_foods = 1;

var foods = [[]];
var foodSize = 10;
var width;
var height;
var message;

function setup() {
  width = 640;
  height = 480;
  createCanvas(width, height);
  frameRate(60);

  px = round(Math.random() * ((width - 1 - block) / block)) * block;
  py = round(Math.random() * ((height - 1 - block) / block)) * block;
  ex = round(Math.random() * ((width - 1 - block) / block)) * block;
  ey = round(Math.random() * ((height - 1 - block) / block)) * block;

  for(var i = 0; i < n_foods; i++){
    foods[i][0] = round(Math.random() * ((width - 1 - block) / block)) * block;
    foods[i][1] = round(Math.random() * ((height - 1 - block) / block)) * block;
  }
}

function draw() {
  if(start_screen){
    background(200);
    textAlign(CENTER);
    textSize(30);
    text("The Survival game", width/2, 150)
    textSize(20)
    text("Eat food to survive and avoid the Red Menace.", width / 2, 175)


    fill("blue");
    rect(width / 2 - 150, 210, block, block);
    text("You", width / 2 - 140, 200)

    fill("green")
    rect(width / 2, 210, block, block);
    text("Food", width / 2 + 10, 200)

    fill("red")
    rect(width / 2 + 150, 210, block, block);
    text("The Red Menace", width / 2 + 160, 200)

    fill("black")
    textSize(20);
    text("Press ENTER to start", width / 2, height / 2 + 100);

  }else if(!game_over){
    background(200);

    fill("blue");
    rect(px, py, block, block);

    fill("red")
    rect(ex, ey, block, block);


    for(var i = 0; i < n_foods; i++){


      if(foods[i][0] == px && foods[i][1] == py){
        foods[i][0] = round(Math.random() * ((width - 1 - block) / block)) * block;
        foods[i][1] = round(Math.random() * ((height - 1 - block) / block)) * block;
        hp += heal;
      }

      fill("green");
      rect(foods[i][0], foods[i][1], block, block);

      textAlign(LEFT)
      fill("black")
      textSize(20);
      text("Score: " + String(score), 10, 25);
      text("Energy: " + String(hp), 10, 45);

    }


  }else{
    background(200);
    textAlign(CENTER);
    fill("red");
    textSize(50);
    text("GAME OVER", width/2, height / 2);
    textSize(20);
    text(message, width / 2, height / 2 + 40)
    fill("green");
    textSize(20);
    text("Final score: " + String(score), width/2, height / 2 + 70);
    fill("black")
    textSize(20);
    text("Press ENTER to restart", width / 2, height / 2 + 100);

  }


}

function keyPressed() {
  if(!game_over && !start_screen){
    if (keyCode === LEFT_ARROW) {
      px -= block;
    } else if (keyCode === RIGHT_ARROW) {
      px += block;
    } else if (keyCode === UP_ARROW) {
      py -= block;
    } else if (keyCode === DOWN_ARROW) {
      py += block;
    }
    px = Math.min(width - block, Math.max(px, 0));
    py = Math.min(height - block, Math.max(py, 0));
    hp -= energy_cost;
    score += 1;

    if(hp < 1){
      game_over = true;
      message = "You ran out of energy."
    }

    if(px < ex){
      ex -= block * es;
    }else if (px > ex){
      ex += block * es;
    }

    if (py < ey){
      ey -= block * es;
    }else if(py > ey){
      ey += block * es;
    }

    if(abs(px - ex) < block && abs(ey - py) < block){
      hp -= damage;
      ex = round(Math.random() * ((width - 1 - block) / block)) * block;
      ey = round(Math.random() * ((height - 1 - block) / block)) * block
      if(hp < 1){
        game_over = true;
        message = "You were killed by the Red Menace."
      }
    }

  }else{
    if (keyCode === ENTER){
      if(start_screen){
        start_screen = false;
      }else{
        restart();
      }
    }
  }

}

function restart(){
  start_sreen = true;
  game_over = false;
  message = "";
  px = round(Math.random() * ((width - 1 - block) / block)) * block;
  py = round(Math.random() * ((height - 1 - block) / block)) * block;
  ex = round(Math.random() * ((width - 1 - block) / block)) * block;
  ey = round(Math.random() * ((height - 1 - block) / block)) * block;
  score = 0;
  hp = 100;

  for(var i = 0; i < n_foods; i++){
    foods[i][0] = round(Math.random() * ((width - 1 - block) / block)) * block;
    foods[i][1] = round(Math.random() * ((height - 1 - block) / block)) * block;
  }
}
