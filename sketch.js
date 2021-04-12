var bgSprite, backImage, iGround;
var player, playerImg;
var banana, bananaImg, foodGroup; 
var obstacle, obstacleImg, obstaclesGroup;
var score;//Global variables
var survivalTime;//The survival time will start at 0.
//var numberOfChances = 3;
var gameState = "play";

function preload() {
  backImage = loadImage('jungle.jpg');
  //playerImg = loadImage("Monkey_01.png");
  playerImg = loadAnimation('Monkey_01.png', 'Monkey_02.png', 'Monkey_03.png', 'Monkey_04.png', 'Monkey_05.png', 'Monkey_06.png', 'Monkey_07.png', 'Monkey_08.png', 'Monkey_09.png', 'Monkey_10.png');
  //playerImg = loadAnimation('Monkey_01.png');
  bananaImg = loadImage('banana.png');
  obstacleImg = loadImage('stone.png');
  
  
} //Preloads the images and the sprites required for the game

function setup() {
  createCanvas(400, 400);
  
  bgSprite = createSprite(200, 350, 400, 20);//bgSprite.y = 350
  bgSprite.addAnimation('bgSpr', backImage);
  bgSprite.velocityX = -6;//Background setup
  
  iGround = createSprite(200, 390, 400, 20);
  iGround.visible = false;
  
  player = createSprite(50, 300, 20, 20);
  player.addAnimation('player', playerImg);
  /*console.log("x: " + player.x);
  console.log("y: " + player.y);
  console.log("width: " + player.width);
  console.log("height: " + player.height);
  console.log("depth: " + player.depth);*/
  player.scale = 0.1;//Player setup
  //player.depth = 1;
  
  banana = createSprite(415, random(80, 400), 20, 20);
  banana.addAnimation('food', bananaImg);
  banana.scale = 0.05;
  banana.visible = false;//Banana setup
  
  obstacle = createSprite(415, 350, 20, 20);
  obstacle.addAnimation('obstacle', obstacleImg);
  obstacle.scale = 0.2;
  obstacle.visible = false;//Obstacle setup
  
  score = 0;
  foodGroup = new Group();
  obstaclesGroup = new Group();
  survivalTime = 0;
} //Acts as an initializer that initializes things and "sets them up"

function draw() {
  background(255);
  survivalTime = Math.ceil(frameCount/frameRate());
  camera.position.x = player.x;
  text('Score: ' + score, 250, 30);
  console.log('Score: ' + score);
  console.log("Survival Time: " + survivalTime);
  
  if (gameState === "play") {
    //If the space key is pressed, the monkey will jump.
    if (keyDown('space') && player.y >= 300) {
      player.velocityY = -12;
    }
  
    //Very important concept when creating an infinite game ground
    if (bgSprite.x < 0) {
      bgSprite.x = bgSprite.width/2;
    }
    
    //If the monkey collides with the food, the monkey will eat the food, and the score will increase by 2.
    if (foodGroup.isTouching(player)) {
      score += 2;
      foodGroup.destroyEach();
      player.scale += 0.005;//Scale increases each time a banana is eaten from the monkey.
    }
    
    
    //If the monkey happens to collide with any stone, it resizes itself.
    if (obstaclesGroup.isTouching(player)) {
      player.scale = 0.1;
      score = 0;
      survivalTime = 0;
      //numberOfChances--;
      gameState = "end";
    }

    /*if (numberOfChances === 0) {
      //gameState = "end";
    }*/

    //switch/case in action
    switch (score) {
      case 10: player.scale = 0.15;
        break;
      case 20: player.scale = 0.2;
        break;
      case 30: player.scale = 0.25;
        break;
      case 40: player.scale = 0.19;
        break;
      default:
        break;
    }
    
    player.velocityY++;//Giving gravity to the monkey
    player.collide(iGround);//Collides the monkey to the invisible ground

  }
  

  if (gameState === "end") {
    bgSprite.velocityX = 0;
    bgSprite.velocityY = 0;
    obstaclesGroup.setVelocityEach(0, 0);
    foodGroup.setVelocityEach(0, 0);
    player.velocityX = 0;
    player.velocityY = 0;
    survivalTime = 0;
  }
  
  
  food();
  obstacles();
  drawSprites();//Very important in code.org and P5JS
  
  stroke('white');
  textSize(20);
  fill('white');
  
  
  stroke('white');
  textSize(20);
  fill('white');
  text("Survival Time: " + survivalTime, 250, 50);//Displays survival time
}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(415, random(150, 250), 20, 20);
    banana.addAnimation('food', bananaImg);
    banana.visible = true;
    banana.scale = 0.05;
    banana.velocityX = -7;
    banana.lifetime = 400/7;
    foodGroup.add(banana);
  }


}

//Obstacles
function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(415, 350, 20, 20);
    obstacle.addAnimation('obstacle', obstacleImg);
    obstacle.visible = true;
    obstacle.scale = 0.1;
    obstacle.velocityX = -8;
    obstacle.lifetime = 50;
    obstaclesGroup.add(obstacle);
  }
}

//Written By Priyanshu
//Problems(1): The survival time is not reseting to 0 anytime the obstacle collides with the player