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
    //Keeps track and displays gamescore
    gameScore();
    //set game loop and time/speed
    setTimeout(snakeGame, 1000/speed);
    //adding difficulty to the game. speed doubles when user hits 10 or more score.
    score >= 10 ? speed = 8 : speed = 5;
    }
    
    //control whether game is over due to head impacting body or walls
    function gameStatus(){
    let gameOver = false;
    //has game started. This will make sure GameOver doesn't log at game start
    //if snake has no velocity then game has not started
    if(yVelocity === 0 && xVelocity ===0){
        return false;
    }
    //Gameover if collision detected
    
    //Walls
    //for x axis right to left
    if(snakeHeadX < 0){
        gameOver = true;
    }
    else if(snakeHeadX === tileCount){
        gameOver = true;
    }
    //same for y axis up and down
    if(snakeHeadY < 0){
        gameOver = true;
    }
    else if(snakeHeadY === tileCount){
        gameOver = true;
    }
    
    //Body segment crash
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
            //collecting users name and final score to present as object at end of game
            let finalScore = sessionStorage.getItem('Score');
            let finalPlayer = sessionStorage.getItem('PlayerName');
            let currentPlayer = {finalPlayer , finalScore};
            let winners = [];
            winners.push(currentPlayer);
            let winnersList = localStorage.setItem('Winners', JSON.stringify(winners));
    
            ctx.fillStyle = 'white';
            ctx.font = '20px Georgia';
            ctx.fillText(`Unlucky ${JSON.parse(finalPlayer)}, final score was ${finalScore}`, canvas.width / 8, canvas.height / 2);    
        }
        }
        sessionStorage.setItem('Score', JSON.stringify(score));      
        return gameOver;
    }
    
    //Keep Game score
    function gameScore(){
    ctx.fillStyle = 'white';
    ctx.font = '16px Georgia';
    ctx.fillText("Score: " + score, canvas.width - 70, 12);  
    }
    
    //Screen to run game on, draws black canvas in light mode and 'green in dark mode' 
    //and to draw to canvas again when game is refreshed
    function gameScreen(){
    const currentTheme = localStorage.getItem('Theme');
    if(currentTheme === 'dark'){
        ctx.fillStyle = 'rgb(151,197,2)';
            ctx.fillRect(0 ,0 , canvas.width, canvas.height);
        
        }
        else{
            ctx.fillStyle = 'black';
            ctx.fillRect(0 ,0 , canvas.width, canvas.height);
        }
        }
    
    //Function to draw the snake to canvas and adds new seg if food collision occurs. Set to green in light mode and black in darkmode
    function gameSnake(){
    const currentTheme = localStorage.getItem('Theme');
    if(currentTheme === 'dark'){
        //this controls drawing body to snake after food is eaten in dark mode
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        for(let i = 0; i < snakeBodySegs.length; i++){
            let seg =   snakeBodySegs[i];
            ctx.fillRect(seg.x * tileCount, seg.y * tileCount, tileSize, tileSize);
        }
    
        snakeBodySegs.push(new snakeBodySeg(snakeHeadX, snakeHeadY));//adds item to end of the array near the snake head
        while(snakeBodySegs.length > snakeTail){
            snakeBodySegs.shift(); //removes the last item if it is greater than snake tail length
        }
        //draws snake head to canvas in dark mode
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(snakeHeadX * tileCount, snakeHeadY * tileCount, tileSize, tileSize);

    }
    else{
	
        //this controls drawing body to snake after food is eaten
        ctx.fillStyle = 'lawngreen';
        for(let i = 0; i < snakeBodySegs.length; i++){
            let seg =   snakeBodySegs[i];
            ctx.fillRect(seg.x * tileCount, seg.y * tileCount, tileSize, tileSize);
        }
    
        snakeBodySegs.push(new snakeBodySeg(snakeHeadX, snakeHeadY));//adds item to end of the array near the snake head
        while(snakeBodySegs.length > snakeTail){
            snakeBodySegs.shift(); //removes the last item if it is greater than snake tail length
        }
        //draws snake head to canvas
        ctx.fillStyle = 'darkolivegreen';
        ctx.fillRect(snakeHeadX * tileCount, snakeHeadY * tileCount, tileSize, tileSize);

    }
    }

    
    //Handles snakes moves around screen and lets user control direction by updating the snake head on X and Y axis.
    function updateSnakeLocation(){
    snakeHeadX = snakeHeadX + xVelocity;
    snakeHeadY = snakeHeadY + yVelocity;
    }

    //functions control velocity direction
    //moves snake in up direction on grid
    function snakeUp(){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
        return;
    }
    //moves snake in down direction on grid
    function snakeDown(){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
        return
    }
    //moves snake in left direction on grid
    function snakeLeft(){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
        return
    }
    //moves snake in right direction on grid
    function snakeRight(){
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
        return
    }
    
    //add event listener for keys that user presses and set direction
    document.body.addEventListener('keydown', keyDown);

    //event listener for the up font awesome icon to be pressed
    document.getElementById('up-arrow').addEventListener('click', function clicked(){
        snakeUp();
    });
    //event listener for the left font awesome icon to be pressed
    document.getElementById('left-arrow').addEventListener('click', function clicked(){
        snakeLeft();
    });
    //event listener for the down font awesome icon to be pressed
    document.getElementById('down-arrow').addEventListener('click', function clicked(){
        snakeDown();
    });
    //event listener for the right font awesome icon to be pressed
    document.getElementById('right-arrow').addEventListener('click', function clicked(){
        snakeRight();
    });
    
    // Swtich case to handle when user presses buttons
    // left arrow - 37
    // up arrow - 38
    // right arrow - 39
    // down arrow - 40
    function keyDown(event){
    event.preventDefault();
    switch(true){
    //if user presses up button to move snake up
    case(event.keyCode === 38):
        snakeUp();
        break;
    //if user presses down button to move snake down
    case(event.keyCode === 40):
        snakeDown();
        break;
    //if user presses left button to turn snake left
    case(event.keyCode === 37):
        snakeLeft();
        break;
    //if user presses right button to turn snake right
    case(event.keyCode === 39):
        snakeRight();
        break;
    //if user presses r button to refresh the canvas by reloading page. Will trigger overlay message.
    case(event.keyCode === 82):
    location.reload();
    break;
    }    
    }
        
    //Draws food to canvas. Set to orange in light mode and to black in darkmode
    function gameFood(){
    
    const currentTheme = localStorage.getItem('Theme');
    if(currentTheme === 'dark'){
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
            
        }
        else{
        ctx.fillStyle = 'orange';
          ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
        }
        }
    
    //Handles if snake has eaten food and update positon. Adds to tail by triggering segment function. Also increments score
    function eatFood(){
    if(foodX === snakeHeadX && foodY == snakeHeadY){
        //going to get a random number and assign to food using same random num method as ilovemaths
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        snakeTail++;
        score++;
    }
}
snakeGame();
