var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var over,overimg,restart,restartimg;

function preload(){

  cloudImage = loadImage("cloud.png");

  trex_running=loadAnimation("trex1.jpg","trex2.jpg","trex3.jpg","trex4.jpg");
  trex_collided=loadImage("trex_collide.jpg");
  groundImage = loadImage("ground.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  overimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
  
}

function setup() {
  createCanvas(1915, 500);
  
  trex = createSprite(50,440,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided", trex_collided);
  trex.scale = 2.5;

  ground = createSprite(900,480,400,20);
  ground.addImage("ground",groundImage);

  ground = createSprite(200,480,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,490,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  over = createSprite(930,100);
  over.addImage(overimg);
  over.scale = 1.6;
  over.visible = false;
  
  restart = createSprite(900,200);
  restart.addImage(restartimg);
  restart.scale = 1.6;
  restart.visible = false;
  

}

function draw() {
  background(242, 246, 249);

  textSize(50);
   textFont("Georgia");
   textStyle(BOLD);
    text("Score: "+ score, 1500,100);

  
   if(gameState === PLAY){
  
    score = score+Math.round(getFrameRate()/50);
    ground.velocityX = -(6+3*score/100);
     
  if(keyCode===32 && trex.y >=161 ) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  trex.collide(invisibleGround);
  console.log(gameState);
  
 
  spawnClouds();
  spawnObstacles();
  
     
      if(obstaclesGroup.isTouching(trex)){
        gameState = END;
        
      }

     
}
 else if (gameState === END ){
        over.visible = true;
        restart.visible = true;
        ground.velocityX=0;
        trex.velocityY=0;
        cloudsGroup.setVelocityXEach(0);
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setLifetimeEach(-1);
        obstaclesGroup.setLifetimeEach(-1);
        trex.changeAnimation("collided",trex_collided) ;
       
       
    if(mousePressedOver(restart)){
      reset();
      
    }
   
}
  
  drawSprites();
}

function reset(){
  
  gameState = PLAY;
  over.visible = false;
  restart.visible = false;
   obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  score = 0;
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(1915,1800,40,10);
    cloud.y = Math.round(random(80,320));
    cloud.addImage(cloudImage);
    cloud.scale = 1.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 500;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 160 === 0) {
    var obstacle = createSprite(1915,430,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1.5;
    obstacle.lifetime = 500;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}