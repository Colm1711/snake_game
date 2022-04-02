//creating canvas objects
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//creating a default speed which I will use in game function
let speed = 5;

//Add code to create grid inside the canvas
let tileCount = 20;
let tileSize = canvas.width / tileCount -2;//this will make the tile size fit inside the grid

//create the snake object
let headX = 7;
let headY = 3;


//game loop function, controls the overall game
function snakeGame(){
    //creates game screen
    gameScreen();
    //adds snake to canvas
    gameSnake();
    setTimeout(snakeGame, 1000/speed);
}

//need to create the screen to run game and to reset when game starts again
function gameScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0 ,0 , canvas.width, canvas.height);
}

//snake function to draw the snake to cnavas
function gameSnake(){
    ctx.fillStyle = "green"; //setting snake to green, need to style later for head/body
    ctx.fillRect(headX* tileCount, headY* tileCount, tileSize, tileSize);
}

snakeGame();
