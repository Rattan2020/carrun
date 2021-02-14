var carI,car,carr;
var ground,ground2,line;
var treeI,treeG;
var treeI2,treeG2;
var cloud,cloudG;
var step,stepG;
var step2,step2G;
var s,b;
var mount,mountG;
var bomb,bombG;
var explosion;
var playI,play;
var start,restart;
var jump;
var SERVE=1;
var PLAY=0;
var END=2;
var gameState=SERVE;
var bgI;
var score;
var points;
var starI,starG;

function preload(){
  carI=loadImage("gamecar.png");
  treeI=loadImage("tree1.png");
  treeI2=loadImage("tree1.png");
  cloud=loadImage("cloudd.png");
  step=loadImage("gamestep.png");
  mount=loadImage("mountain.png");
  bomb=loadImage("bomb.png");
  starI=loadImage("star.png");
  explosion=loadImage("EXPL.png");
  start=loadImage("replay.png");
  playI=loadImage("play.png");
  bgI=loadImage("bg.gif");
}

function setup(){
  createCanvas(650,400);
  
  car=createSprite(200,300,400,70);
  car.addImage(carI);
  car.scale=0.2;
  car.setCollider("rectangle",80,50,650,180)
  
  carr=createSprite(300,200);
  carr.addImage(carI);
  carr.scale=0.5;
  
    play=createSprite(320,120);
    play.addImage(playI);
    play.scale=0.4;
  
  restart=createSprite(320,120);
   restart.addImage(start);
    restart.scale=0.08;
  
  ground=createSprite(325,390,650,50);
  ground.shapeColor="#7e481c";
  
  ground2=createSprite(325,372,650,15);
  ground2.shapeColor="green";
  
  line=createSprite(150,270,10,600);
  line.visible=false;
  
  score=0;
  points=0
  
  mountG=new Group();
  treeG=new Group();
  treeG2=new Group();
  cloudG=new Group();
  stepG=new Group();
  step2G=new Group();
  bombG=new Group();
  jumpG=new Group();
  starG= new Group();
  
}


function draw(){
  background("skyblue");
    
  
  if (gameState===SERVE){
    
    
    background(bgI);
    
    ground.visible=false;
    ground2.visible=false;
    restart.visible=false;
    carr.visible=true;
    car.visible=false;
    
    play.visible=true;
    
    if (mousePressedOver(play)){
      
      gameState=PLAY;
      play.visible=false;
    }
  }
  
  if (gameState===PLAY){
    
    ground.visible=true;
    ground2.visible=true;
    restart.visible=false;
    carr.visible=false;
    car.visible=true;
    play.visible=false;
    
    if (starG.isTouching(car)){
      points=points+1;
      starG.destroyEach();
    }
    
    
    if (car.collide(ground)&&keyWentDown("up")){
    car.velocityY=-15;
  }
  if (car.collide(stepG)&&keyWentDown("up")){
    car.velocityY=-15;
  }
  car.velocityY=car.velocityY+1;
  
     if (bombG.isTouching(car)){
      
       bombG.setVelocityXEach=0;
      gameState=END;
    }
    if (jumpG.isTouching(car)){
      
      gameState=END;
    }
  clouds();
  
  mountains();
  
  tree();
  
  tree2();
  
  steps();
  
  step2();
  
  bombs();
    
   jumps();
    
    stars();
    
    
    
    score=Math.ceil(frameCount/3);
  text("score:"+score,50,50);
    
    text("Points:"+points,550,50);
  }
  
  if (gameState===END){
   
    background(bgI);
    
    ground.visible=false;
    ground2.visible=false;
    restart.visible=true;
    carr.visible=true;
    car.visible=false;
    
    cloudG.setVelocityXEach=0;
      treeG.setVelocityXEach=0;
      treeG2.setVelocityXEach=0;
      mountG.setVelocityXEach=0;
      stepG.setVelocityXEach=0;
      step2G.setVelocityXEach=0; 
      jumpG.setVelocityXEach=0;
    starG.setVelocityXEach=0;
    
    cloudG.destroyEach();
    mountG.destroyEach();
    treeG.destroyEach();
    treeG2.destroyEach();
    stepG.destroyEach();
    step2G.destroyEach();
    bombG.destroyEach();
    jumpG.destroyEach();
    starG.destroyEach();
    
    if (mousePressedOver(restart)){
      gameState=PLAY;
      reset();
    }
    
  }
  
  car.collide(ground);
  car.collide(stepG);
  stepG.collide(car)
  car.collide(line);
  
  createEdgeSprites();
  
  drawSprites();

}

function reset(){
  cloudG.setVelocityXEach=-10;
      treeG.setVelocityXEach=-10;
      treeG2.setVelocityXEach=-10;
      mountG.setVelocityXEach=-10;
      stepG.setVelocityXEach=-10;
      step2G.setVelocityXEach=-10;
      jumpG.setVelocityXEach=-10;
  points=0;
  frameCount=0;
  carr.visible=false;
      
}

function mountains(){
  
  if(frameCount%40===0){
    var t=createSprite(800,312,10,10);
    t.addImage(mount);
    t.scale=1;
    t.velocityX=-(10+score/300);
    t.lifetime=100;
    t.depth=0;
    mountG.add(t);
  }
}

function tree(){
  
  if(frameCount%20===0){
    var t=createSprite(630,312,10,10);
    t.addImage(treeI);
    t.scale=0.2;
    t.velocityX=-(10+score/300);
    t.lifetime=100;
    t.depth=0;
    treeG.add(t);
  }
  
}

function tree2(){
  
  if(frameCount%20===0){
    var t=createSprite(720,325,10,10);
    t.addImage(treeI2);
    t.scale=0.15;
    t.velocityX=-(10+score/300);
    t.lifetime=75;
    t.depth=0;
    treeG2.add(t);
  }
  
}

function clouds(){
  if(frameCount%20===0){
    var c=createSprite(655,Math.round(random(40,120)),10,10);
    c.addImage(cloud);
    c.scale=0.1;
    c.velocityX=-(10+score/300);
    c.lifetime=150;
    c.depth=0;
    cloudG.add(c);
  }
  
}

function steps(){
  
  if (frameCount%100===0){
    s=createSprite(700,300,100,50);
  
  s.addImage(step);
  s.scale=0.5  
  s.velocityX=-(10+score/300);
  s.lifetime=100;  
  s.depth=1;
  
  stepG.add(s);
  
  }
}

function step2(){
  if (frameCount%100===0){
    s=createSprite(990,190,100,50);
  
  s.addImage(step);
  s.scale=0.5  
  s.velocityX=-(10+score/300);
  s.lifetime=100;  
  s.depth=1;
  
  stepG.add(s);
  
}
}

function bombs(){
  
  if (frameCount%130===0){
    r=Math.round(random(1,3));
   b=createSprite(630,r,10,10);
    if (r===1){
      b.y=340;
    }
    if (r===2){
      b.y=240;
    }
    if (r===3){
      b.y=170;
    }
    b.addImage(bomb);
    b.scale=0.08;
    b.velocityX=-(10+score/300);
    b.lifetime=100;
    b.depth=0;
    
    bombG.add(b);
    
  }
  
}

function jumps(){
  
  if (frameCount%100===0){
    jump=createSprite(730,385,200,50);
    jump.shapeColor="skyblue";
    jump.velocityX=-(10+score/300);
    jump.lifetime=100;
    
    jumpG.add(jump);
  }
  
}

function stars(){
  
  if (frameCount%150===0){
   var s=createSprite(630,250,10,10);
    s.addImage(starI);
    s.scale=0.07;
    s.velocityX=-(10+score/300);
    s.lifetime=100;
    s.depth=0;
    
    starG.add(s)
  }

  
}