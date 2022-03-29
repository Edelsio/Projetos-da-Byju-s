
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var ball;
var chão, cesta_direita, cesta_esquerda;

function preload()
{
	
}

function setup() {
	createCanvas(700, 700);
	engine = Engine.create();
	world = engine.world;

	var chão_options ={
		isStatic: true
	}

	chão = Bodies.rectangle(400, 690, 900, 20,chão_options);
    World.add(world, chão);
	rectMode(CENTER);

	cesta_direita = Bodies.rectangle(620, 640, 10, 80,chão_options);
    World.add(world, cesta_direita);
	rectMode(CENTER);

	cesta_esquerda = Bodies.rectangle(500, 640, 10, 80,chão_options);
    World.add(world, cesta_esquerda);
	rectMode(CENTER);

	var ball_options ={
		isStatic: false,
		restitution: 0.3,
		friction: 0,
		density: 1.2
	}

	ball = Bodies.circle(20, 20, 15,ball_options);
	World.add(world,ball);
	ellipseMode(RADIUS);

	//Create the Bodies Here.


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("cyan");

  fill("blue");
  rect(chão.position.x, chão.position.y, 900, 20);

  fill("blue");
  rect(cesta_direita.position.x, cesta_direita.position.y, 10, 80);

  fill("blue");
  rect(cesta_esquerda.position.x, cesta_esquerda.position.y, 10, 80);

  fill("white");
  ellipse(ball.position.x, ball.position.y, 15);

  drawSprites();
}
function keyPressed(){
   if (keyCode === UP_ARROW) {
	Body.applyForce(ball, {x:0, y:0}, {x:25, y:-60});
   }
}



