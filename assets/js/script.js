//creating canvas objects
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//creating a default speed which I will use in game function
let speed = 5;

//Add code to create grid inside the canvas
let tileCount = 20;
let tileSize = canvas.width/tileCount -1;//this will make the tile size fit inside the grid

//game loop

function snakeGame(){
    gameScreen();
    setTimeout(snakeGame, 1000/speed);
}

//need to create the screen to run game and to reset when game starts again

function gameScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0 ,0 , canvas.width, canvas.height);
}

snakeGame();
