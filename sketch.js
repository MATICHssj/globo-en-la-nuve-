var ball,bg,ballx;
var database;
var position;

function preload() {
    ballx = loadImage("air_balloon_PNG19381.png");
    bg = loadImage("caricatura-escena-ciudad-camino-al-centro_43633-6299.jpg");
}

function setup(){
    database = firebase.database();

    createCanvas(800,600);

    ball = createSprite(250,250,10,10);
    ball.addImage(ballx);
    ball.scale = 0.4

    var ballPosition = database.ref('ball/position');
    ballPosition.on("value",readPosition);
}

function draw(){
    background(bg);

    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('ball/position').set({
        'x':position.x+x,
        'y':position.y+y
    });
    ball.y = ball.y + y;
}

function readPosition(data){
    position = data.val();
    //console.log(position.x);
    ball.x = position.x;
   ball.y = position.y;
  }  