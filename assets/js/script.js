//will refactor code and break up objects later:
//#1 game
//#2 canvas
//#3 snake
//#4 food
//#5 eat food
//#6 score
//#7 gameover// wall collison

//this is class to hold constructor for snake segments of body
class snakeBodySeg{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

//creating canvas objects
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//creating a default speed which I will use in game function
//reduced speed to three but need to test this on mobile and larger canvas
let speed = 5;

//Add code to create grid inside the canvas
let tileCount = 20;
let tileBlock = canvas.width / tileCount;
let tileSize = tileBlock - 2;


//create the snake object
let snakeHeadX = 5;
let snakeHeadY = 5;

//array to hold snake segments
const snakeBodySegs = [];
let snakeTail = 2;

//add snake velocity to control snake speed
let xVelocity = 0;
let yVelocity = 0;

//set score for start of game
//BUG HERE AS WHEN SET TO ZERO IT IS RETURNING ONE AS STARTING SCORE
let score = -1;

//create food object starting position
let foodX = 5;
let foodY = 5;

//game loop function, controls the overall game
function snakeGame(){
    //add movement to snake based on key pressed
    updateSnakeLocation();

    //keep track of game status
    let result = gameStatus();
    if(result){
        return;
    }

    //creates game screen
    gameScreen();
    //add snake to canvas
    gameSnake();
    //see if the snake has eaten the food
    eatFood();
    //add food to the canvas
    gameFood();
    //gamescore
    gameScore();
    //set game loop and time/speed
    setTimeout(snakeGame, 1000/speed);
}

//control whether game is over due to head impacting body or walls
function gameStatus(){
    let gameOver = false;

    //has game started. This will make sure GameOver doesn't log at game start
    //if snake has no velocity then game has not started
    if(yVelocity === 0 && xVelocity ===0){
        return false
    }

    //walls
    //for x axis right to left
    if(snakeHeadX <0){
        gameOver = true;
    }
    else if(snakeHeadX === tileCount){
        gameOver = true
    }
    //same for y axis up and down
    if(snakeHeadY <0){
        gameOver = true;
    }
    else if(snakeHeadY === tileCount){
        gameOver = true
    }

    //body segment crash
    for(let i=0; i < snakeBodySegs.length; i++){
        let seg = snakeBodySegs[i];
        if(seg.x === snakeHeadX && seg.y === snakeHeadY){
            gameOver = true;
            break;
        }
    }


    //checks to see if user has crashed and returns game over message
    if (gameOver) {
        if (gameOver) {
          ctx.fillStyle = "white";
          ctx.font = "35px Georgia";
          ctx.fillText("Game Over!", canvas.width / 3.5, canvas.height / 2);

          //collecting users name and final score to present as object at end of game
          let finalScore = localStorage.getItem('Score');
          let finalPlayer = localStorage.getItem('PlayerName');
          let currentPlayer = {finalPlayer , finalScore};
          console.log(currentPlayer);
        }
    
        ctx.fillText("Game Over!", canvas.width / 3.5, canvas.height / 2);
      }
      localStorage.setItem('Score', JSON.stringify(score));      
      return gameOver;
}

//Keep Game score
function gameScore(){
    ctx.fillStyle = "white";
  ctx.font = "16px Georgia";
  ctx.fillText("Score: " + score, canvas.width - 70, 12);
}

//need to create the screen to run game and to reset when game starts again
function gameScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0 ,0 , canvas.width, canvas.height);
}

//snake function to draw the snake to canvas
function gameSnake(){
    //this controls drawing body to snake after food is eaten
    ctx.fillStyle = "lawngreen";
    for(let i = 0; i < snakeBodySegs.length; i++){
        let seg =   snakeBodySegs[i];
        ctx.fillRect(seg.x * tileCount, seg.y * tileCount, tileSize, tileSize);
    }

    snakeBodySegs.push(new snakeBodySeg(snakeHeadX, snakeHeadY));//adds item to end of the array near the snake head
    while(snakeBodySegs.length > snakeTail){
        snakeBodySegs.shift(); //removes the last item if it is greater than snake tail lenght
    }
    //draws snake head to canvas
    ctx.fillStyle = "darkolivegreen";
    ctx.fillRect(snakeHeadX * tileCount, snakeHeadY * tileCount, tileSize, tileSize);
        
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
    event.preventDefault();
    //if user presses up
    if(event.keyCode == 38){
        if(yVelocity == 1)
            return
        yVelocity = -1;
        xVelocity = 0;
    }
    //if user presses down
    if(event.keyCode == 40){
        if(yVelocity == -1)
            return
        yVelocity = 1;
        xVelocity = 0;
    }
    //if user presses left
    if(event.keyCode == 37){
        if(xVelocity == 1)
            return
        yVelocity = 0;
        xVelocity = -1;
    }
    //if user presses right
    if(event.keyCode == 39){
        if(xVelocity == -1)
            return
        yVelocity = 0;
        xVelocity = 1;
    }
}

//food function to add to canvas
function gameFood(){
    ctx.fillStyle = "orange";
    ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

//check if snake has eaten food and update positon
function eatFood(){
    if(foodX === snakeHeadX && foodY == snakeHeadY){
        //going to get a random number and assign to food using same rand num method as ilovemaths
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        snakeTail++;
        score++;
    }
}

snakeGame();

