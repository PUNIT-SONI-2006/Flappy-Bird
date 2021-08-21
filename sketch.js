// All the game Variables are maded here 👇👇👇
/*Game objects*/
var bird, ground, invisibleGround, obstacles, obstecles2;
/*Backround variable*/

/*GAMESTATES*/
var gameState = "Play";
/*Images variables*/
var bImage, gImage, dImage, oImage, backgroundImg;
var o1, o2, o3, o4;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var bg;
// var bg2 = "daybg.jpg";
var score;
var obstaclesGroup, bg2Group;


const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var hour;

var dnbg = "sunrise.png";



//=======================================================
// This function loads all the images,sound,gif in variables👇👇👇👇👇👇👇👇👇👇👇👇👇👇
function preload() {
  gImage = loadImage("ground.jpg");
  bImage = loadImage("bird.png");
  dImage = loadImage("nightbg.jpg");
  oImage = loadImage("obstecles.png");
   getBackgroundImg();

}
//========================================================
// This function contains all the properties of all the objects👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
function setup() {
  createCanvas(480, 640);
  // world
  engine = Engine.create();
  world = engine.world;
  // sprites
  ground = createSprite(300, 635, 500, 5);
  ground.shapeColor = "red";
  ground.velocityX = "-3";
  ground.addImage(gImage);
  ground.scale = 4;
  bg = createSprite(200, 305, 0, 0);
  // bg.addImage(dImage);
  bg.scale = "4";
  invisibleGround = createSprite(0, 630, 1000, 10);
  invisibleGround.visible = false;
  bird = createSprite(200, 200, 20, 20);
  bird.shapeColor = "grey";
  bird.addImage(bImage);
  bird.scale = 0.2;
  score = 0;
  obstaclesGroup = new Group();
}
//========================================================
// This function contains all functions of objects
function draw() {
  if(backgroundImg)
        bg.addImage(backgroundImg);

    Engine.update(engine);
  background("black");
  /*Setting collider radius for bird*/
  bird.debug = true;
  // sprite.setCollider("shape", xOffset, yOffset, width, height); 
  bird.setCollider("rectangle", 0, 0, 310, 200);

  /*Looping Ground*/
  if (ground.x < 98) {
    ground.x = ground.width / 2;
  }
  /*Starting velocity Y of all objects */
  if (gameState === "Play") {
    if (keyDown("space")) {
      gameState = "obNow";
    }
  }
  if (gameState === "obNow") {
    spawnObstacles();
    bird.velocityY = "2.5";
    if (keyDown("space")) {
      bird.y = bird.y - 10;
    }
  }
  /*If bird will touch the ground game will end*/
  if (gameState === "obNow" && obstaclesGroup.isTouching(bird)) {
    gameState = "End";
  }
  if (gameState === "obNow" && bird.isTouching(invisibleGround)) {
    gameState = "End";
  }


  /*When the gamestate is on end set velocity0 of all objects */
  if (gameState === "End") {
    obstaclesGroup.setVelocityEach(0, 0);
    ground.velocityX = 0;
    // bird.collide(obstaclesGroup);
    bird.velocityY = 0;
    bird.velocityX = 0;
    // bird.collide(ground);

  }
  /*Console will give what is error and on which line number*/
  // console.log("GameState is:"+gameState);


  /*Drawing all objects by using this function*/
  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 40 === 0) {
    var obstacle = createSprite(600, 120, 0, 0);
    obstacle.addImage(oImage);
    var ob2 = createSprite(600, 525, 0, 0);
    ob2.addImage(oImage);
    obstacle.velocityX = -(4 + score / 100);
    ob2.velocityX = -(4 + score / 100);
    obstacle.debug = true;
    obstacle.setCollider("rectangle", 0, -15, 100, 200);
    ob2.debug = true;
    ob2.setCollider("rectangle", 0, 11, 99, 200);
    console.log(ob2.x);
    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        // obstacle.y=30;
        // ob2.y=550;

        break;
      case 2:

        break;
      case 3:

        break;
      case 4:

        break;
      case 5:

        break;
      case 6:

        break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1;
    ob2.scale = 1;


    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    obstaclesGroup.add(ob2);

  }
}
async function getBackgroundImg() {

  // write code to fetch time from API
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");

  //change the data in JSON format and store it in variable responseJSON
  var responseJSON = await  response.json();
  var datetime = responseJSON.datetime;

  

  // slice the datetime to extract hour
  var hour = datetime.slice(11,13);    

  
  if(hour>=0 && hour<18 ){
      dnbg = "daybg.jpg";
  }
  else{
      dnbg="nightbg.jpg"
  }
  
  console.log(hour)
  backgroundImg = loadImage(dnbg);
}