
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var PLAY = 1;
var END = 0;
var Estado_de_jogo = PLAY;
var score = 0;

var fundoImg, fundo;
var barreira, barreiraImg;
var indiana_jones, indianaImg;
var gameOverImg, gameOver;
var restartImg, restart;

var bola_de_pedra, bola_de_pedraImg;
var solo, soloImg;

function preload(){
  
indianaImg = loadImage("indiana jones game.gif");
fundoImg = loadImage("fundo jogo indiana.png");
barreiraImg = loadImage("obstaculo_do_jogo.png");
gameOverImg = loadImage("fim de jogo.png");
restartImg = loadImage("reset.png");

groupBarreira = new Group();
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;
  
  fundo = createSprite("600, 600, 10, 10")
  fundo.addImage(fundoImg);
  fundo.velocityX = -6;

  indiana_jones = createSprite(400, 600, 100, 100);
  indiana_jones.addImage("indianaImg",indianaImg);
  indiana_jones.scale = 0.5;
  indiana_jones.velocityX = 0;
  indiana_jones.setCollider('circle', 0, 0, 100);

  gameOver = createSprite(300, 200, 10, 10);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300, 430, 10, 10);
  restart.addImage(restartImg);

  gameOver.scale = 1;
  restart.scale = 0.18;

  gameOver.visible = false;
  restart.visible = false;

  var ball_options = {
    restitution: 0.95,
    frictionAir: 0.01

  }

  //prop = {density:0.0005}
  //bola_de_pedra = Bodies.circle(width / 2, height / 2, 20, prop);
  //World.add(world, bola_de_pedra);

  solo = new Solo(width / 2, height - 10, width, 20);

  edges = createEdgeSprites();
}


function draw() {
  indiana_jones.debug=true
  barreira.debug=true
  background(fundo);
  Engine.update(engine);
  drawSprites();
  textSize(20);
  fill("black");
  text("Pontos:" + score, 50, 50);

  if (estado_de_jogo === PLAY){
    score = score + Math.round(getFrameRate() / 60);
    groupBarreira.velocityX = -(6 + 4 * score / 100);
    fundo.velocityX = -(6 + 3 * score / 100);
 
 if (keyDown("SPACE") && indiana_jones.y >= height -130){
  indiana_jones.velocityY = -12   ;
 }
 
 indiana_jones.velocityY += 0.8;
 indiana_jones.collide();
 
 if (indiana_jones.isTouching(groupBarreira)){
    Estado_de_jogo = END
 }
 
 if (fundo.x < 100) {
     fundo.x = fundo.x = 300;
 }
 
 spawnBarreiras(); 
 }
 
 if (Estado_de_jogo === END){
    gameOver.visible = true;
    restart.visible = true;
     
    textSize(20);
    fill("black");
    text("clique na setinha de cima (^) para reiniciar", 100, 350);
 
    fundo.velocityX = 0;
    indiana_jones.velocityY = 0;
    groupBarreira.setVelocityXEach(0);
 
    if (keyDown("up_arrow")) {
    reset();
  }
}
  solo.show()
  image(soloImg, solo.position.x, solo.position.y, 100, 20);
  ellipse(ball.position.x, ball.position.y, 20);
}

function spawnBarreiras() {

  if (frameCount % 60 === 0){ 
  var barreira = createSprite(600,555,10,10);
  barreira.addImage(barreiraImg);   
  barreira.scale = 2 ;
  barreira.velocityX = -6;
  barreira.lifetime = 600
  barreira.depth = indiana_jones.depth;
  indiana_jones.depth += 2;
  barreira.setCollider("rectangle", -1 ,0, 25 , 40);
  barreira.debug = false;
  
  groupBarreira.add(barreira);
}
  
}

function reset() {

Estado_de_jogo = PLAY; 

gameOver.visible = false;
restart.visible = false;

groupBarreira.destroyEach();

score = 0;
}
  

