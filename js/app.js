var stage = new createjs.Stage("gameView");
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick", stage);

var gameView = new createjs.Container();
stage.addChild(gameView);

var clickCounter = 0;
var circleArr = [[], [], [], [], [], [], [], [], []];
var currentCat;
var MOVE_NONE = -1, MOVE_LEFT = 0, MOVE_UP_LEFT = 1, MOVE_UP_RIGHT = 2,
    MOVE_RIGHT = 3, MOVE_DOWN_RIGHT = 4, MOVE_DOWN_LEFT = 5;

function endThisRound(msg){
    setTimeout(function(){
        var r = window.confirm(msg + " Do you want to play again?");
        if (r){
            addCircles();
        }
    }, 50);
}

function getMoveDir(cat){

    var distanceMap = [];

    //left
    var can = true;
    for (var x = cat.indexX; x >= 0; x--) {
        if (circleArr[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_LEFT] = cat.indexX - x;
            break;
        }
    }
    if (can) {
        return MOVE_LEFT;
    }
    //left up
    can = true;

    for(var x = cat.indexX, y = cat.indexY;;){
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
            can = false;
            distanceMap[MOVE_UP_LEFT] = cat.indexY - y;
            break;
        }
        if (y%2 == 0){
            x--;
        }
        y--;
        if (x < 0 || y < 0){
            break;
        }
    }
    if (can) {
        return MOVE_UP_LEFT;
    }
    //right up
    can = true;

    for(var x = cat.indexX, y = cat.indexY;;){
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
            can = false;
            distanceMap[MOVE_UP_RIGHT] = cat.indexY - y;
            break;
        }
        if (y%2 == 1){
            x++;
        }
        y--;
        if (x > 8 || y < 0){
            break;
        }
    }
    if (can) {
        return MOVE_UP_RIGHT;
    }
    //right
    can = true;
    for (var x = cat.indexX; x < 9; x++) {
        if (circleArr[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_RIGHT] = x - cat.indexX;
            break;
        }
    }
    if (can) {
        return MOVE_RIGHT;
    }
    //right down
    can = true;

    for(var x = cat.indexX, y = cat.indexY;;){
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
            can = false;
            distanceMap[MOVE_DOWN_RIGHT] = y - cat.indexY;
            break;
        }
        if (y%2 == 1){
            x++;
        }
        y++;
        if (x > 8 || y > 8){
            break;
        }
    }
    if (can) {
        return MOVE_DOWN_RIGHT;
    }
    //left down
    can = true;

    for(var x = cat.indexX, y = cat.indexY;;){
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED){
            can = false;
            distanceMap[MOVE_DOWN_LEFT] = y - cat.indexY;
            break;
        }
        if (y%2 == 0){
            x--;
        }
        y++;
        if (x < 0 || y > 8){
            break;
        }
    }
    if (can) {
        return MOVE_DOWN_LEFT;
    }

    var dir = -1; maxDistance = -1;

    for (var i = 0; i < distanceMap.length;i++){
        if (distanceMap[i] > maxDistance) {
            dir = i;
            maxDistance = distanceMap[i];
        }
    }

    if (maxDistance == 1){
        return MOVE_NONE;
    } else {
        return dir;
    }
}

function circleClicked(event){
    if (event.target.getCircleType() == Circle.TYPE_UNSELECTED) {
        clickCounter++;
        event.target.setCircleType(Circle.TYPE_SELECTED);
    } else {
        return;
    }

    var dir = getMoveDir(currentCat);

    switch(dir) {
        case MOVE_LEFT:
            circleArr[currentCat.indexX-1][currentCat.indexY].setCircleType(Circle.TYPE_CAT);
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexX-1][currentCat.indexY];
            break;
        case MOVE_UP_LEFT:
            circleArr[currentCat.indexX+(currentCat.indexY%2?0:-1)][currentCat.indexY-1].setCircleType(Circle.TYPE_CAT);
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexX+(currentCat.indexY%2?0:-1)][currentCat.indexY-1];
            break;
        case MOVE_UP_RIGHT:
            circleArr[currentCat.indexX+(currentCat.indexY%2?1:0)][currentCat.indexY-1].setCircleType(Circle.TYPE_CAT);
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexX+(currentCat.indexY%2?1:0)][currentCat.indexY-1];
            break;
        case MOVE_RIGHT:
            circleArr[currentCat.indexX+1][currentCat.indexY].setCircleType(Circle.TYPE_CAT);
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexX+1][currentCat.indexY];
            break;
        case MOVE_DOWN_RIGHT:
            circleArr[currentCat.indexX+(currentCat.indexY%2?1:0)][currentCat.indexY+1].setCircleType(Circle.TYPE_CAT);
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexX+(currentCat.indexY%2?1:0)][currentCat.indexY+1];
            break;
        case MOVE_DOWN_LEFT:
            circleArr[currentCat.indexX+(currentCat.indexY%2?0:-1)][currentCat.indexY+1].setCircleType(Circle.TYPE_CAT);
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexX+(currentCat.indexY%2?0:-1)][currentCat.indexY+1];
            break;
        default:
            endThisRound("You win in " + clickCounter + " steps!");
            break;
    }

    if (currentCat.indexX == 0 || currentCat.indexX == 8
        || currentCat.indexY == 0 || currentCat.indexY == 8)
    {
        endThisRound("You lose!");
    }
}

function addCircles(){
    for (var indexY = 0; indexY < 9; indexY++) {
        for (var indexX = 0; indexX < 9; indexX++) {
            var c = new Circle();

            circleArr[indexX][indexY] = c;
            c.indexX = indexX;
            c.indexY = indexY;
            c.x = 30 + indexX * 50 + indexY % 2 * 25;
            c.y = 30 + indexY * 50;

            if (indexX === 4 && indexY === 4) {
                c.setCircleType(Circle.TYPE_CAT);
                currentCat = c;
            }else if (Math.random() < 0.1) {
                c.setCircleType(Circle.TYPE_SELECTED);
            }

            c.addEventListener("click", circleClicked);

            gameView.addChild(c);
        }
    }
}


addCircles();


