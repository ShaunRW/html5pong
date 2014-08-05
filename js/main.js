function init(){
    
    // create stage
    stage = new createjs.Stage('view');

    // create player1
    plr1 = new createjs.Shape();
    plr1.graphics.beginFill("#0000ff").drawRect(0,0,25,100);
    plr1.x = 20;
    plr1.y = 100;
    stage.addChild(plr1);

    // create player2
    plr2 = new createjs.Shape();
    plr2.graphics.beginFill("#ff0000").drawRect(0,0,25,100);
    plr2.x = 755;
    plr2.y = 100;
    stage.addChild(plr2);

    // create puck
    puck = new createjs.Shape();
    puck.graphics.beginFill("#000000").drawCircle(0,0,20);
    puck.x = 400;
    puck.y = 300;
    puckSpeedX = 100.0;
    puckSpeedY = 100.0;
    stage.addChild(puck);

    center = new createjs.Shape();
    center.graphics.beginFill("#gggggg").drawRect(0,0,2,600);
    center.x = 399;
    center.y = 0;
    stage.addChild(center);

    score1 = new createjs.Text("Player 1\n    0","20px Arial",'#0000ff');
    score1.x = 310;
    score1.y = 10;
    stage.addChild(score1);

    score2 = new createjs.Text("Player 2\n    0","20px Arial",'#ff0000');
    score2.x = 410;
    score2.y = 10;
    stage.addChild(score2);

    // use the mouse to control the paddles
    stage.on("stagemousemove",function(event){
        movePaddles(event);
    });

    plr1Score = 0;plr2Score = 0;

    createjs.Ticker.on("tick",tick);
    createjs.Ticker.setFPS(60);

}

function tick(event){
    puckMovement(event);
    // TODO: AI for Red Paddle
    stage.update(event);
}

function puckMovement(event){

    // Check Blue Paddle 
    hit = 0;
    if(puckSpeedX < 0){
        if(puck.y > plr1.y && puck.y < plr1.y+100){
            if(puck.x < 65){
                puckSpeedX = -(puckSpeedX*1.1);
                hit = 1
            }
        }
    }

    // Check Red Paddle
    if(puckSpeedX > 0){
        if(puck.y > plr2.y && puck.y < plr2.y+100){
            if(puck.x > 735){
                puckSpeedX = -(puckSpeedX*1.1);
                hit = 1
            }
        }
    }

    // Check Wall Collisions
    if(hit==0){
        if(puck.x > 780){puckSpeedX = -100.0;plr1Score = plr1Score + 1;score1.text="Player 1\n    "+plr1Score}
        if(puck.x < 20){puckSpeedX = 100.0;plr2Score = plr2Score + 1;score2.text="Player 2\n    "+plr2Score}
    }
    if( (puck.y > 480 && puckSpeedY > 0)|| (puck.y < 20 && puckSpeedY < 0) ){puckSpeedY = -puckSpeedY;}

    if(puckSpeedX > 3500){puckSpeedX = 3500;}

    // Move Puck
    puck.x += (event.delta)/1000.0*puckSpeedX;
    puck.y += (event.delta)/1000.0*((Math.abs(puckSpeedX)/100.0)*puckSpeedY);
}

function movePaddles(event){
    // Blue Paddle
    plr1.y = event.stageY-50;
    if(plr1.y < 0){plr1.y = 0;}
    if(plr1.y+100 > 500){plr1.y = 400;}

    // Red Paddle
    plr2.y = event.stageY-50;
    if(plr2.y < 0){plr2.y = 0;}
    if(plr2.y+100 > 500){plr2.y = 400;}
}