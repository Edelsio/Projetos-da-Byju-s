    var Jaxon, rua;
    var JaxonImg, ruaImg;
    var leftBoundary, rightBoundary;
    var altura_aleatoria = 0;

        function preload() {
    //imagens pré-carregadas
    ruaImg = loadImage("path.png");
    JaxonImg = loadAnimation("Runner-1.png", "Runner-2.png");
    }

        function setup() {
    createCanvas(400, 400);
    //crie sprite aqui
    rua = createSprite(200, 100, 100, 100);
    rua.addImage(ruaImg);
    rua.scale = 1.2
    rua.velocityY = 8

    leftBoundary = createSprite(34, 200, 10, 400);
    rightBoundary = createSprite(375, 200, 10, 400);
    rightBoundary.visible = false;

    Jaxon = createSprite(200, 300, 100, 100);
    Jaxon.addAnimation("carlosCorrendo", JaxonImg);
    Jaxon.scale = 0.07


    //leftBoundary.invisible = false;
    //leftBoundary.visible = true;
    //leftBoundary.invisible = true;
    leftBoundary.visible = false;

}

        function draw() {
    background("black");

    /*if (rua.x > 400) {
        rua.x = height / 2;
    }
    */

    /* if (rua.y > 400) {
        rua.y = width / 4;
    }
    */

    /* if (rua.y < 400) {
        rua.x = height / 4;
    }
    */
     if (rua.y > 400) {
        rua.y = height / 4;
    }

    Jaxon.position.x = mouseX;

    Jaxon.collide(leftBoundary);
    Jaxon.collide(rightBoundary);


    drawSprites();

        }