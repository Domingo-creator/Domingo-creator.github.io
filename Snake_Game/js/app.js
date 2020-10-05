document.addEventListener('DOMContentLoaded', () => {
    const gameScreen = document.querySelector('.game-grid');
    const score = document.querySelector('.score');
    const level = document.querySelector('.level');
    const newGameWindow = document.querySelector('.new-game-window');
    const gameResult = document.querySelector('.game-result');
    const newGameButton = document.querySelector('.new-game-button');
    const pauseWindow = document.querySelector('.pause-window');

    /***** Speed of Level 1 snake ******/
    const baseSpeed = 520;
    /*********************************/

    class Game {
        constructor() {
            this.level;
            this.score;
            this.snakeBody;
            this.hasFruit;
            this.currentDirection;
            this.isAlive;
            this.gameTicker;
            this.isPaused = false;
            this.createBoard();
        }

        createBoard() {
            for(let i=0; i < 17; i++) {
                for(let j=0; j < 17; j++){
                    gameScreen.innerHTML += `<li class="game-grid-space" />`;
                }
            }
        }

        /************ Reset Game *************/
        resetGame() {
            this.level = 1;
            level.textContent = 1;
            this.snakeBody = [];
            this.score = 0;
            score.textContent = 0;
            //delete previous game snake and fruit
            let occupiedSpaces = document.querySelectorAll('.occupied')
            let hasFruit = document.querySelector('.has-fruit');
            if (hasFruit) {
                hasFruit.classList.remove('has-fruit');
            }
            occupiedSpaces.forEach( occupiedSpace => occupiedSpace.classList.remove('occupied'))
            
            //start snake on row 9, column 3.  make 3 spaces long --> index 139-141.
            for (let i = 0; i < 3; i++) {
                gameScreen.children[139+i].classList.add('occupied');
                this.snakeBody.push(139+i);
            }
            //Put intial fruit on board at row 9 column 14 - [8,13]
            this.placeFruit(150);
        }

        /******* Start Game ********/
        startGame() {
            // Delete Late TESTING 
            this.moveRight();
            // Start the movement interval
            this.isAlive = true;
            this.gameTicker = setInterval(this.advanceSnake , baseSpeed);
        }
        
        //************** Advance Snake ****************/
        // Advance the snake in the direction of 
        // this.currentDirection. Check for collision
        //**********************************************/
        advanceSnake() {
            let nextHeadIndex = (gameSession.snakeBody[gameSession.snakeBody.length - 1] + gameSession.direction);
            //check for pause game.  if no pause, advance snake
            if ( gameSession.isPaused) {
                gameSession.pauseGame();
            } else {
                // Pop off the tail of the snake and push new head at the old head + this.direction
                // Unless next move aquires fruit
                if (nextHeadIndex !== gameSession.hasFruit) {
                    gameScreen.children[gameSession.snakeBody[0]].classList.remove('occupied');
                    gameSession.snakeBody.shift();
                }
                gameSession.snakeBody.push(nextHeadIndex);
                gameSession.checkCollision();
                if (gameSession.isAlive) {
                    gameScreen.children[nextHeadIndex].classList.add('occupied');
                }
            }
            
        }

        checkCollision() {
            let snakeHead = this.snakeBody[this.snakeBody.length - 1];
            let leftOutOfBounds = new Set([-1,16,33,50,67,84,101,118,135,152,169,186,203,220,237,254,271]);
            let rightOutOfBounds = new Set([17,34,51,68,85,102,119,136,153,170,187,204,221,238,255,272,289]);
            //check for collision with wall
            switch(this.direction) {
                case -17:
                    if (snakeHead < 0 ) {
                        gameSession.endGame()
                    }
                    break;
                case -1:
                    if (leftOutOfBounds.has(snakeHead)) {
                        this.endGame();
                    }
                    break;
                case 1:
                    if (rightOutOfBounds.has(snakeHead)) {
                        this.endGame();
                    }
                    break;
                case 17:
                    if ( snakeHead > 288) {
                        this.endGame();
                    }
                    break;
            }
            //check for collsion with self
            for (let i = 0; i < this.snakeBody.length - 1; i++) {
                if (snakeHead === this.snakeBody[i]) {
                    this.endGame();
                }  
            }

            //check for collision with fruit.  if found, increment score and place new fruit
            if (snakeHead === this.hasFruit) {
                this.incrementScore();
                gameScreen.children[this.hasFruit].classList.remove('has-fruit');
                this.placeFruit();
            }

        }
        

        /******* Move Functions ********/
        moveUp() {
            //confirm currently not moving down
            if ( this.snakeBody[this.snakeBody.length - 2]  - this.snakeBody[this.snakeBody.length - 1] !== -17) {
                this.direction = -17;
            } 
           
        }
        
        moveLeft() {
            //confirm currently not moving right
            if ( this.snakeBody[this.snakeBody.length - 2]  - this.snakeBody[this.snakeBody.length - 1] !== -1) {
                this.direction = -1;
            }
        }

        moveDown() {
            //confrim currently not moving up
            if ( this.snakeBody[this.snakeBody.length - 2]  - this.snakeBody[this.snakeBody.length - 1] !== 17) {
                this.direction = 17;
            }
        }

        moveRight() {
            //confirm currently not moving left
            if ( this.snakeBody[this.snakeBody.length - 2]  - this.snakeBody[this.snakeBody.length - 1] !== 1) {
                this.direction = 1
            }
        }
        
        /******* Game functions *************/
        //place fruit in random space if index is not defined
        placeFruit( index = Math.floor(Math.random() * gameScreen.children.length) ) {
            /**** Check to make sure fruit is not placed on snake body ******/
            gameScreen.children[index].classList.add('has-fruit'); 
            this.hasFruit = index;
        }

        incrementScore() {
            this.score++;
            if (this.score % 3 === 0) {
                this.levelUp();
            }
            score.textContent = this.score;
        }

        levelUp() {
            this.level++;
            level.textContent = this.level;
            clearInterval(this.gameTicker);
            this.gameTicker = setInterval( this.advanceSnake , [baseSpeed - (50*(this.level - 1))]); 
        }

        /************** End Game ****************/
        endGame() {
            this.isAlive = false;
            clearInterval(this.gameTicker);
            newGameWindow.classList.remove('hidden');
            gameResult.textContent = 'Game Over';
            
        }

        /*********** PAUSE/UNPAUSE THE GAME *************/   
        pauseGame() {
            clearInterval(this.gameTicker);
            pauseWindow.classList.remove('hidden');
            this.isPaused = true;
        }

        unPauseGame() {
            this.isPaused = false;
            this.gameTicker = setInterval( this.advanceSnake , [baseSpeed - (50*(this.level - 1))]);
            pauseWindow.classList.add('hidden');
        }

    }

    /********** Start Game Session ***********/
    const gameSession = new Game();
    gameSession.resetGame();


    /*****************************************/
    /********** Event Listeners **************/
    /*****************************************/

    /**** Keyboard Listener ****/
    document.addEventListener('keydown', (event) => {
        //if game isRunning, listen for directional inputs
        if(gameSession.isAlive){
            switch(event.key) {
                case "ArrowUp": 
                case "w": 
                case "W":
                    gameSession.moveUp();
                    break;
                case "ArrowLeft":
                case "a":
                case "A":
                    gameSession.moveLeft();
                    break;
                case "ArrowDown":
                case "s":
                case "S":
                    gameSession.moveDown();
                    break;
                case "ArrowRight":
                case "d":
                case "D":    
                    gameSession.moveRight();
                    break;
                case "Enter":
                    if (gameSession.isPaused) {
                        gameSession.unPauseGame();
                    }
                    else {
                        gameSession.pauseGame();
                    }
                    break;
                case "default":
                    break;
            }
        } else {  // if !gameSession.isAlive, listen for 'Enter' to start game
            if (event.key === 'Enter') {
                newGameWindow.classList.add('hidden');
                gameSession.resetGame();
                gameSession.startGame();
            }
        }    
    })

    //New Game Button Listener
    newGameButton.addEventListener('click', (event) => {
        newGameWindow.classList.add('hidden');
        gameSession.resetGame();
        gameSession.startGame(); 
    })
})


