const Body = Matter.Body;
const Bodies = Matter.Bodies;
const World = Matter.World;
const Engine = Matter.Engine;

var engine, world;
var solo, parado;
var bola1 , mexendo1;
var bola2, mexendo2;
var rect1, mexendo3;

function setup() {
    createCanvas(800, 800);
    engine = Engine.create();
    world = engine.world;
    
    mexendo1 = {
        isStatic : false,
        restitution : 1,
        frictionAir : 0.01	  
	 }

    bola1 = Bodies.circle(200,10,20,mexendo1);
    World.add(world, bola1);
    ellipseMode(RADIUS);

	mexendo2 = {
		isStatic: false,
		restitution: 0.4,
		frictionAir: 0.04
	}

    bola2 = Bodies.circle(400,20,10,mexendo2);
	World.add(world, bola2);
	
    mexendo3 = {
    	isStatic: false,
		restitution: 0.8,
		frictionAir: 0.1

	}

	rect1 = Bodies.rectangle(600, 30, 50, 30, mexendo3);
	World.add(world, rect1);

    parado = {
        isStatic: true
    }

    solo = Bodies.rectangle(400, 390, 800, 20, parado);
    World.add(world, solo);

    rectMode(CENTER);

}

function draw() {
    Engine.update(engine);
    background("cyan");
    fill("brown");
    rect(solo.position.x, solo.position.y, 800, 20);

    fill("blue");
    ellipse(bola1.position.x, bola1.position.y, 20);
    
	fill("green");
	ellipse(bola2.position.x, bola2.position.y,10);

	fill("yellow");
	rect(rect1.position.x, rect1.position.y, 50, 30);
}


