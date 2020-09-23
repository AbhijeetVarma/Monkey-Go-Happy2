var gamestate="play"
var ground 
var monkey , monkey_running , go
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  go = loadAnimation("gameOver.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundI = loadImage("ground.png");
 
}



function setup() {
createCanvas(400,400);  

  monkey = createSprite(50,300);
  monkey.addAnimation("monk",monkey_running);
  monkey.addAnimation("g",go);
  monkey.scale = 0.15
  monkey.setCollider("circle",0,0,210)
  
  ground = createSprite(400,350,800,20);
 
 foodGroup = new Group();
  obstacleGroup = new Group()
   
}


function draw() {

  
  if(gamestate=== "play"){
     if(keyDown("space") && monkey.y> 290){
     monkey.velocityY=-12
     
     }
  
    monkey.velocityY=  monkey.velocityY+0.8
  bananaSpawn()
   obstacleSpawn()
  
  
  
  if(monkey.isTouching(obstacleGroup)){
     
    monkey.scale = monkey.scale - 0.01
    obstacleGroup.destroyEach()
     }
    
    if(monkey.isTouching(foodGroup)){
     
    monkey.scale = monkey.scale + 0.01
      foodGroup.destroyEach();
     }
    if(monkey.scale>0.20){
     
    monkey.scale = 0.15
     }
    if(monkey.scale <= 0.10){
     
    gamestate="end"
     }
  
  score = Math.round(frameCount/getFrameRate());
     
     
     }else if(gamestate==="end"){
              
              obstacleGroup.destroyEach()
              foodGroup.destroyEach()
               monkey.changeAnimation("g",go);
              monkey.x=200
               monkey.y=200
              monkey.scale=1
              
              }

  
  monkey.collide(ground);

  

  
  
  
background("white");
  drawSprites();
  
  text("score: "+ score,300,10);
}

function bananaSpawn(){
  if(frameCount%150 === 0){
     banana = createSprite(400,Math.round(random(180,240)));
     banana.addImage("b",bananaImage);
    banana.scale = 0.1
    banana.velocityX = -5
    banana.lifetime=100
    
    foodGroup.add(banana)
     }
  
  
  
}

function obstacleSpawn(){
  if(frameCount%200 === 0){
    obstacle = createSprite(400,330);
     obstacle.addImage("o",obstacleImage);
    obstacle.scale = 0.1
    obstacle.velocityX = -5
    obstacle.lifetime=100
    obstacleGroup.add(obstacle)
     }
}


