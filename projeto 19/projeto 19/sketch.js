var Play = 1;
var End = 0;
var estado_de_jogo = Play;

var Luke_Correndo, Luke_CorrendoImg, Luke_ParadoImg;
var Fundo, FundoImg;
var chãoinvisivel;
var barreira, barreiraImg, groupBarreira;
var fundo_ponto, fundo_jogo;
var score = 0;

var gameOver, restart;
var gameOverImg, restartImg;

function preload(){
Luke_CorrendoImg = loadImage("corredor luke.gif");
Luke_ParadoImg = loadImage("corredor luke parado.png");
FundoImg = loadImage("fundo.png");
barreiraImg = loadImage("barreira.png");
gameOverImg = loadImage("fim de jogo.png");
restartImg = loadImage("reset.png");

groupBarreira = new Group();
}

function setup() {
createCanvas(600,600);
Fundo = createSprite(300,300);
Fundo.addImage(FundoImg);
Fundo.velocityX = -6;
Fundo.scale = 10;

chãoinvisivel = createSprite(350,595,700,5);
chãoinvisivel.visible = false;
fundo_ponto = createSprite(100,43,150,40);
fundo_jogo = createSprite(100,345,5000,40);

Luke_Correndo = createSprite(120,525,10,10);
Luke_Correndo.addImage("running", Luke_CorrendoImg);
Luke_Correndo.addImage("collided", Luke_ParadoImg);
Luke_Correndo.scale = 0.5;
Luke_Correndo.velocityX = 0;
Luke_Correndo.setCollider("circle", 0, 20, 90);
Luke_Correndo.debug = false;

gameOver = createSprite(300, 200, 10, 10);
gameOver.addImage(gameOverImg);

restart = createSprite(300, 430, 10, 10);
restart.addImage(restartImg);

gameOver.scale = 1;
restart.scale = 0.18;

gameOver.visible = false;
restart.visible = false;
fundo_jogo.visible = false;
edges = createEdgeSprites();

score = 0;
}

function draw() {
background(200);
drawSprites();
textSize(20);
fill("black");
text("Pontos:" + score, 50, 50);

if (estado_de_jogo === Play){
   score = score + Math.round(getFrameRate() / 60);
   groupBarreira.velocityX = -(6 + 4 * score / 100);
   Fundo.velocityX = -(6 + 3 * score / 100);

if (keyDown("SPACE") && Luke_Correndo.y >= height -130){
 Luke_Correndo.velocityY = -12   ;
}

Luke_Correndo.velocityY += 0.8;
Luke_Correndo.collide(chãoinvisivel);

if (Luke_Correndo.isTouching(groupBarreira)){
    estado_de_jogo = End
}

if (Fundo.x < 100) {
    Fundo.x = Fundo.x = 300;
}

spawnBarreiras(); 
}

if (estado_de_jogo === End){
    gameOver.visible = true;
    restart.visible = true;
    fundo_jogo.visible = true;
    
    textSize(20);
    fill("black");
    text("clique na setinha de cima (^) para reiniciar", 100, 350);


    Fundo.velocityX = 0;
    Luke_Correndo.velocityY = 0;
    groupBarreira.setVelocityXEach(0);

    Luke_Correndo.changeImage("collided", Luke_ParadoImg);

    if (keyDown("up_arrow")) {
    reset();
    }
}
}
function spawnBarreiras() {

if (frameCount % 60 === 0){ 
var barreira = createSprite(600,555,10,10);
barreira.addImage(barreiraImg);   
barreira.scale = 2 ;
barreira.velocityX = -6;
barreira.lifetime = 600
barreira.depth = Luke_Correndo.depth;
Luke_Correndo.depth += 2;
barreira.setCollider("rectangle", -1 ,0, 25 , 40);
barreira.debug = false;

groupBarreira.add(barreira);
}

}

function reset() {

    estado_de_jogo = Play; 

    gameOver.visible = false;
    restart.visible = false;
    fundo_jogo.visible = false;

    Luke_Correndo.changeImage("running", Luke_CorrendoImg);

    groupBarreira.destroyEach();

    score = 0;
}

