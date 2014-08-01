/**
 * Created by iamrick86 on 7/28/14.
 */
var stage = new createjs.Stage("gameView");
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);

//create a container
var gameView = new createjs.Container();
gameView.x = 30;
gameView.y = 30;
stage.addChild(gameView);


var circleArr = [[],[],[],[],[],[],[],[],[]];
var currentCat;

var x = false;

var MOVE_NONE = -1, MOVE_LEFT = 0, MOVE_UP_LEFT = 1, MOVE_UP_RIGHT = 2,
    MOVE_RIGHT = 3, MOVE_DOWN_RIGHT = 4, MOVE_DOWN_LEFT = 5;




function addCircles(){
    for (var indexY = 0; indexY < 9; indexY++){
        for (var indexX = 0; indexX < 9; indexX++) {
            var c = new Circle();
            gameView.addChild(c);
            circleArr[indexX][indexY] = c;
            c.indexX = indexX;
            c.indexY = indexY;
            c.x = indexY %2? indexX*55+25 : indexX*55;
            c.y = indexY * 55;

            if (indexX==4 && indexY == 4){
                c.setCircleType(3);
                currentCat = c;

            }

            c.addEventListener("click", circleClicked);
        }
    }
}

function getMoveDir(cat){
    //left
    var distanceMap = [];
    var can = true;
    for (var x = cat.indexX; x > 0; x--){
        if (circleArr[x])
    }
}


function circleClicked(event){
    if (event.target.getCircleType() != Circle.TYPE_CAT){
        event.target.setCircleType(Circle.TYPE_SELECTED);
    }

     if (currentCat.indexX ==0 || currentCat.indexX == 8
     || currentCat.indexY==0 || currentCat.indexY == 8){

     alert("game over,haha");
     }

    var dir = getMoveDir()

    var leftCircle = circleArr[currentCat.indexX-1][currentCat.indexY];
    var upCircle = circleArr[currentCat.indexX][currentCat.indexY-1];
    var rightCircle = circleArr[currentCat.indexX+1][currentCat.indexY];
    var downCircle = circleArr[currentCat.indexX][currentCat.indexY+1];
    var leftTopCircle = circleArr[currentCat.indexX - 1][currentCat.indexY - 1];
    var leftBottomCircle = circleArr[currentCat.indexX - 1][currentCat.indexY + 1];

    change(leftCircle);
    change(rightCircle);
    change(upCircle);
    change(downCircle);
    change(leftCircle);
    change(leftBottomCircle);
    if (x == false){
        alert("game over");
    }
}

function change(circle){
    if (circle.getCircleType() == 1){
        x = true;
        circle.setCircleType(3);
        currentCat.setCircleType(1);
        currentCat = circle;
    }
}



addCircles();


