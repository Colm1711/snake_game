//will refactor code and break up objects later:
//#1 game
//#2 canvas
//#3 snake
//#4 food
//#5 eat food
//#6 score
//#7 gameover// wall collison

//creating canvas objects
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//creating a default speed which I will use in game function
//reduced speed to three but need to test this on mobile and larger canvas
let speed = 3;

//Add code to create grid inside the canvas
let tileCount = 20;
let tileSize = canvas.width / tileCount -1;//this will make the tile size fit inside the grid

//create the snake object
let snakeHeadX = 7;
let snakeHeadY = 3;

//add snake velocity to control snake speed
let xVelocity = 0;
let yVelocity = 0;

//create food object starting position
let foodX = 5;
let foodY = 5;

//game loop function, controls the overall game
function snakeGame(){
    //creates game screen
    gameScreen();
    //add snake to canvas
    gameSnake();
    //add movement to snake based on key pressed
    updateSnakeLocation();
    //add food to the canvas
    gameFood();
    //set game loop and time/speed
    setTimeout(snakeGame, 1000/speed);
}

//need to create the screen to run game and to reset when game starts again
function gameScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0 ,0 , canvas.width, canvas.height);
}

//snake function to draw the snake to canvas
function gameSnake(){
    ctx.fillStyle = "green"; //setting snake to green, need to style later for head/body
    ctx.fillRect(snakeHeadX* tileCount, snakeHeadY* tileCount, tileSize, tileSize);
}

//Need to make snake move around screen and let user control direction

//Need to update the snake position to compare against key pressed

function updateSnakeLocation(){
    snakeHeadX = snakeHeadX + xVelocity;
    snakeHeadY = snakeHeadY + yVelocity;
}

//add event listener for keys that user presses and set direction
document.body.addEventListener('keydown', keyDown);

//This controls the key down and adds controls for user to snake
//Need to add mobile//tablet touch controls
// left arrow	37
// up arrow	38
// right arrow	39
// down arrow	40
function keyDown(event){
    //if user presses up
    if(event.keyCode == 38){
        yVelocity = -1;
        xVelocity = 0;
    }
    //if user presses down
    if(event.keyCode == 40){
        yVelocity = 1;
        xVelocity = 0;
    }
    //if user presses left
    if(event.keyCode == 37){
        yVelocity = 0;
        xVelocity = -1;
    }
    //if user presses right
    if(event.keyCode == 39){
        yVelocity = 0;
        xVelocity = 1;
    }
}

//food function to add to canvas
function gameFood(){
    ctx.fillStyle = "orange";
    ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

snakeGame();
