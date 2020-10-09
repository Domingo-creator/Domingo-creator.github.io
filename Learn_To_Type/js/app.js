document.addEventListener('DOMContentLoaded', () => {
  const gameScreen = document.querySelector('.word-display');
  const gameStats = document.querySelector('.game-stats');
  const timer = document.querySelector('.timer');
  const healthBar = document.querySelector('.health-bar');
  const charToGo = document.querySelector('.characters-left');
  const charToGoDisplay = document.querySelector('.characters-left-wrapper');
  const gameType = document.querySelector('.game-type');
  const keyboard = document.querySelectorAll('.keyboard .key');
  const toggleHint = document.querySelector('.keyboard-hints-toggle input');
  const hintDisplay = document.querySelector('.keyboard-hints-display');
  const hintKeyboard = document.querySelectorAll('.keyboard-hints-display .key');

  /**********************  Game Data *******************************/
  const numGames = 5;
  const paragraphs = [
    {
        type: 1,        //short sentences
        paragraph: [
            {wordString: "Have you seen my cat?"},
            {wordString: "Benjy has a poopy butt."},
            {wordString: "My favorite food is broccoli"},
            {wordString: "I love catwoman!"},
            {wordString: "I am a Brony for life!"},
            {wordString: "The Raiders are the worst!"},
            {wordString: "One fish, two fish, red fish, blue fish"},
            {wordString: "I have to go to the store."},
            {wordString: "There can be only one!"},
            {wordString: "Don't try it Anakin, I have the high ground."},
            {wordString: "A wizard is never late..."},
            {wordString: "See you at the crossroads"},
            {wordString: "We all live on a yellow submarine"},
            {wordString: "My spoon is too big."},
            {wordString: "I am a banana"},
            {wordString: "It's peanut-butter jelly time!"},
            {wordString: "Typing is so amazingly fun!"},
        ]
    },
    {
        type: 2,       //Paragraphs
        paragraph: [
            {wordString: "This is the first line of a paragraph.  Now we are on the second sentence. There really doesn't seem to be any point to this entire paragraph. Let's just finish up with this last sentence."},
            {wordString: "The itsy bitsy spider went up the water spout. Down came the rain and washed the spider out.  Out came the sun and dried up all the rain, and the itsy bitsy spider went up the spout again."},
            {wordString: "Master of puppets, I'm pulling your strings. Twisting your mind and smashing your dreams. Blinded by me, you can't see a thing.  Just call my name 'cause i'll hear you scream: Master! Master!"},
            {wordString:"Give me your answer, fill in a form. Mine for evermore. Will you still need me, will you still feed me, when I'm sixty-four?"},
            {wordString:"This body holding me, reminds me of my own mortality. Embrace this moment. Remember, we are eternal, all this pain is an illusion"},
            {wordString:"It's close to midnight. Something evil's lurkin'in the dark. Under the moonlight, you see a sight that almost stops your heart. You try to scream, but terror takes the sound before you make it."},
            {wordString:"So crucify the ego, before it's far too late. And leave behind this place - so negative and blind and cynical. And you will come to find that we are all one mind. Capable of all that's imagined and all conceivable."},
        ]

    },
    {   
        level: 3,      //words
        paragraph: [
            {wordString: "cat"},
            {wordString:"dog"},
            {wordString:"fish"},
            {wordString:"poop"},
            {wordString:"tiger"},
            {wordString:"cow"},
            {wordString:"egg"},
            {wordString:"steak"},
            {wordString:"ball"},
            {wordString:"bike"},
            {wordString:"keys"},
            {wordString:"sink"},
            {wordString:"food"},
            {wordString:"apple"},
            {wordString:"game"},
            {wordString:"plane"},
            {wordString:"Texas"},
            {wordString:"tacos"},
            {wordString:"such"},
            {wordString:"and"},
            {wordString:"tall"},
            {wordString:"short"},
            {wordString:"bowl"},
            {wordString:"shark"},
            {wordString:"water"},
            {wordString:"sky"},
            {wordString:"bird"},
            {wordString:"ant"},
            {wordString:"mom"},
            {wordString:"dad"},
            {wordString:"bed"},
            {wordString:"clean"},
            {wordString:"wash"},
            {wordString:"run"},
            {wordString:"write"},
            {wordString:"trash"},
            {wordString:"can"},
            {wordString:"India"},
            {wordString:"China"},
            {wordString:"Hawaii"},
            {wordString:"Idaho"},
            {wordString:"Maine"},
            {wordString:"Iowa"},
            {wordString:"France"},
            {wordString:"Spain"},
            {wordString:"Brazil"},
            {wordString:"Chile"},
            {wordString:"Japan"},
            {wordString:"Congo"},
            {wordString:"Sudan"},
            {wordString:"Iraq"},
            {wordString:"Iran"},
            {wordString:"cars"},
            {wordString:"have"},
            {wordString:"will"},
            {wordString:"live"},
            {wordString:"try"},
            {wordString:"white"},
            {wordString:"ride"},
            {wordString:"run"},
            {wordString:"lay"},
            {wordString:"lie"},
            {wordString:"while"},
            {wordString:"style"},

        ]
    },
  ];
  /*************************************** Game Object***********************************************/
  class Game {
      constructor() {
          this.displayText;
          this.onScreenChars;
          this.paragraphType;
          this.currentCharIndex;
          this.showHints = true;
          this.timer;
          this.maxTimer = 60;
          this.healthOn = 'ON';
          this.currentHealth;
          this.maxHealth = 20;
          this.phrasesLeft;
          this.usedPhrases = [];
          this.inMenuScreen;
          this.menuPointer;
          this.menuPointerIndex;
          this.subMenuPointer;
          this.subMenuType;
          this.gameCode = 0;  // 0 = randomized games
          this.lastGameCode = 0;

      }

      /************************ Menu Functions ************************/
      // Start Screen
      runStartScreen() {
          gameType.textContent = "";
          gameStats.classList.add('hidden');
          let gameCodeString;
          switch (this.gameCode) {
              case 0:
                gameCodeString = "Random Game Type";
                break;
              case 1:
                gameCodeString = "Short Sentence Scramble";
                break;
              case 2:
                gameCodeString = "The Long Type";
                break;
              case 3:
                gameCodeString = "Key Attack";
                break;
              case 4:
                gameCodeString = "Word Blitz";
                break;    
          }
          gameScreen.innerHTML =   `<div class='game-title'>Learn To Type</div>
                                    <ul class='start-screen-menu'>
                                        <li>Start Game</li>
                                        <li>Select Game Type</li>
                                        <li>Options</li>
                                    </ul>

                                    <div class='current-game-options'>
                                        <div>Game Type: ${gameCodeString}</div>
                                        <div>Health: ${this.healthOn}</div>
                                        <div>Timer: ${this.maxTimer}</div>
                                    `
            this.menuPointer = document.querySelector('.start-screen-menu');
            this.menuPointerIndex = 0;
            this.inMenuScreen = true;
            this.menuPointer.children[this.menuPointerIndex].classList.add('highlight');
      }

      changeMenuPointer( keyValue ) {
        if ( keyValue === 'ArrowUp') {
            if (this.subMenuType === 'Health') {
                if(this.subMenuPointer.textContent === 'ON') {
                    this.subMenuPointer.textContent = 'OFF'
                } else {
                    this.subMenuPointer.textContent = 'ON'
                }
                this.healthOn = this.subMenuPointer.textContent;
            } else if(this.subMenuType === 'Timer') {
                if(this.subMenuPointer.textContent < 90) { 
                    this.subMenuPointer.textContent = parseInt(this.subMenuPointer.textContent) + 10;
                    
                } else {
                    this.subMenuPointer.textContent = '\u221e'; //infinity
                }
                this.maxTimer = this.subMenuPointer.textContent;
            }    
            else {
                this.menuPointer.children[this.menuPointerIndex].classList.remove('highlight');
                if (this.menuPointerIndex === 0) {
                    this.menuPointerIndex = this.menuPointer.children.length - 1;
                } else {
                    this.menuPointerIndex--;
                }
                this.menuPointer.children[this.menuPointerIndex].classList.add('highlight');
            }
        } 

        if ( keyValue === 'ArrowDown') {
            if (this.subMenuType === 'Health') {
                if(this.subMenuPointer.textContent === 'ON') {
                    this.subMenuPointer.textContent = 'OFF'
                } else {
                    this.subMenuPointer.textContent = 'ON'
                }
                this.healthOn = this.subMenuPointer.textContent;
            } else if(this.subMenuType === 'Timer') {
                if(this.subMenuPointer.textContent > 30) { 
                    this.subMenuPointer.textContent = parseInt(this.subMenuPointer.textContent) - 10;
                }
                this.maxTimer = this.subMenuPointer.textContent;
            }    
            else {
                this.menuPointer.children[this.menuPointerIndex].classList.remove('highlight');
                if (this.menuPointerIndex === this.menuPointer.children.length - 1) {
                    this.menuPointerIndex = 0;
                } else {
                    this.menuPointerIndex++;
                }
                this.menuPointer.children[this.menuPointerIndex].classList.add('highlight');
            }
        }

        if ( keyValue === 'Enter') {
            switch (this.menuPointer.children[this.menuPointerIndex].textContent) {
                case 'Start Game':
                case 'Try Again':
                    this.inMenuScreen = false;
                    this.startRound()
                    break;
                case 'End Game':
                case 'Back':
                    this.runStartScreen();
                    break;
                case 'Select Game Type':
                    this.selectGameType();
                    break;
                case 'Options': 
                    this.options();
                    break;
                case 'Random Game Type':
                    this.gameCode = 0;
                    this.runStartScreen();
                    break;
                case 'Short Sentence Scramble':
                    this.gameCode = 1;
                    this.runStartScreen();
                    break;
                case 'The Long Type':
                    this.gameCode = 2;
                    this.runStartScreen();
                    break;
                case 'Key Attack':
                    this.gameCode = 3;
                    this.runStartScreen();
                    break;
                case 'Word Blitz':
                    this.gameCode = 4;
                    this.runStartScreen();
                    break;
                case `Health: ${this.healthOn}`:
                    if (this.subMenuType) {
                        this.subMenuPointer.classList.remove('highlight-2');
                        this.subMenuType = null;
                    }  else {
                        this.adjustHealth();
                    }
                    break;
                case `Timer: ${this.maxTimer}`:
                    if (this.subMenuType) {
                        this.subMenuPointer.classList.remove('highlight-2');
                        this.subMenuType = null;
                    }  else {
                        this.adjustTimer();
                    }
                    break;
            }

        }
      }

      selectGameType() {
        gameScreen.innerHTML =  `<div class='game-title'>Learn To Type</div>
                                <label for='select-game-type-menu' class="select-game-type">Select your game type:</label>
                                <ul class='select-game-type-menu'>
                                    <li>Random Game Type</li>
                                    <li>Short Sentence Scramble</li>
                                    <li>The Long Type</li>
                                    <li>Key Attack</li>
                                    <li>Word Blitz</li>
                                </ul>
                                `                  
        this.menuPointer = document.querySelector('.select-game-type-menu');     
        this.menuPointerIndex = 0;
        this.menuPointer.children[this.menuPointerIndex].classList.add('highlight');
      }

      options() {
        gameScreen.innerHTML =  `<div class='game-title'>Learn To Type</div>
                                <label for='game-options-menu' class="game-options">Game Options:</label>
                                <ul class='game-options-menu'>
                                    <li>Health: <span class="health-value">${this.healthOn}<span></li>
                                    <li>Timer: <span class="timer-value">${this.maxTimer}</span></li>
                                    <li>Back</li>
                                </ul>
                                `
        this.menuPointer = document.querySelector('.game-options-menu');     
        this.menuPointerIndex = 0;
        this.menuPointer.children[this.menuPointerIndex].classList.add('highlight');             
      }

      adjustHealth() {
        this.subMenuPointer = document.querySelector('.health-value');
        this.subMenuPointer.classList.add('highlight-2');
        this.subMenuType = 'Health';
      }

      adjustTimer() {
        this.subMenuPointer = document.querySelector('.timer-value');
        this.subMenuPointer.classList.add('highlight-2');
        this.subMenuType = 'Timer';
      }

      /******************* In Game Functions ************************/
      //Start Round
      startRound() {
        // get new game code from previous one if not first round  
        let newGameCode =  Math.ceil(Math.random() * (numGames - 1));
        if (this.gameCode === 0) {
            if(this.lastGameCode === 0  || this.lastGameCode === newGameCode) {
                while (this.lastGameCode === newGameCode){
                    newGameCode =  Math.ceil(Math.random() * (numGames - 1));
                }
            }
            this.lastGameCode = newGameCode;
        }
        if (this.gameCode !== 0) {
        this.lastGameCode = this.gameCode;
        }
        gameStats.classList.remove('hidden');
        charToGoDisplay.classList.remove('hidden');
        this.usedPhrases = [];
        this.startTimer(this.maxTimer);
        this.resetHealth();
        switch(this.lastGameCode) {
            case 1:             // Short Sentences
                gameType.textContent = 'Short Sentence Scramble'
                this.paragraphType = 0;
                this.phrasesLeft = 5;
                this.nextParagraph()
                break;
            case 2:             // Long Paragraph
                gameType.textContent = 'The Long Type'
                charToGoDisplay.classList.add('hidden');
                this.paragraphType = 1;
                this.phrasesLeft = 1;
                this.nextParagraph()
                break;
            case 3:             // Key Attack
                gameType.textContent = 'Key Attack'
                this.phrasesLeft = 30;
                this.getRandomKey();
                break;
            case 4:             // words
                gameType.textContent = 'Word Blitz'
                this.paragraphType = 2;
                this.phrasesLeft = 10;
                this.nextParagraph();
                break;
        }
      }

      /*********** Key Attack Game *********/
      getRandomKey() {
        // return number between 33 and 126 and use number to represent ascii code
        let randomCode = Math.floor(Math.random() * 94) + 33;
        this.displayText = String.fromCharCode(randomCode);
        charToGo.textContent = this.phrasesLeft;
        this.phrasesLeft--;
        this.currentCharIndex = 0;
        this.nextHint();
        this.printParagraph();   
      }

      /********* Sentence Typing Functions **********/
      nextParagraph() {
        this.getParagraph();
        this.printParagraph();
        this.currentCharIndex = 0;
        this.onScreenChars[this.currentCharIndex].classList.add('highlight');
        this.nextHint();
        charToGo.textContent = this.phrasesLeft;
        this.phrasesLeft--;
    }

      getParagraph() {
        let nextPhraseIndex;
        let needNewPhrase = true;
        //find phrase that has not already been used this round
        while ( needNewPhrase === true ) { 
            nextPhraseIndex = Math.floor(Math.random() * (paragraphs[this.paragraphType].paragraph.length));
            needNewPhrase = false;
            for (let i = 0; i < this.usedPhrases.length; i++){
                if (nextPhraseIndex === this.usedPhrases[i] ) {
                    needNewPhrase = true;
                    break;
                }
            }
        }
        //print phrase to screen
        this.displayText = paragraphs[this.paragraphType]
                        .paragraph[nextPhraseIndex]
                        .wordString;
        this.usedPhrases.push(nextPhraseIndex);
      }
    

      

      /******************* Used by All Games ********************************/
      //create <span> item for each character in this.displayText
      printParagraph() {
        gameScreen.innerHTML = "";
        for ( let i = 0; i <  this.displayText.length; i++) {
            switch (this.lastGameCode) {
                case 3:
                    gameScreen.innerHTML = `<div class="game-screen-large-character">${this.displayText}</div>`;
                    break;
                case 4:
                    gameScreen.innerHTML += `<span class="game-screen-letter large">${this.displayText[i]}</span>`;
                    break;
                
                default:
                    gameScreen.innerHTML += `<span class="game-screen-letter">${this.displayText[i]}</span>`;
                    break;
            }
        }
        this.onScreenChars = document.querySelectorAll(".game-screen-letter"); 
      }

      // check if entered 'keyValue' matches the current character on the display. if matches, go to next char.
      // If doesnt match and entry was anything but shift, reduce health
      checkCurrentChar( keyValue ) {
          if ( keyValue === this.displayText[this.currentCharIndex] ) {
            //Sentence typing
            if ( this.lastGameCode === 1 || this.lastGameCode === 2 || this.lastGameCode === 4) { 
                this.iterateChar();
                this.nextHint;
            } 
            //Key attack
            if ( this.lastGameCode === 3) {
                if (this.phrasesLeft > 0) {
                    this.getRandomKey();
                } else {
                    charToGo.textContent = this.phrasesLeft;
                    this.endRound('win');
                }
            }
          } else if (keyValue !== 'Shift') {
              if (this.healthOn === 'ON') {
                this.decrementHealth();
              }
          }
      }

      //move the focused character to the next character.  if at end of string, call endPhrase()
      iterateChar() {
          this.onScreenChars[this.currentCharIndex].classList.add('greyout');
          this.onScreenChars[this.currentCharIndex].classList.remove('highlight');
          if ( this.currentCharIndex + 1 < this.displayText.length) {
            this.currentCharIndex++;
            this.onScreenChars[this.currentCharIndex].classList.add('highlight');
            if (this.showHints) {
                this.nextHint();
            }
          } else {
            this.removeHint();  
            this.endPhrase();
          }
      }

      //if more phrases remain, get next phrase.  else, end round
      endPhrase() {
        if (this.phrasesLeft > 0) {
            this.nextParagraph();
        } else {
            charToGo.textContent = this.phrasesLeft;
            this.endRound( 'win');
        }
      }

      endRound( winOrLose ) {   
        this.stopTimer();
        if ( winOrLose === 'win' ) {
            gameScreen.innerHTML =   `<div class='game-result'>You Win!</div>`;
        }
        if ( winOrLose === 'lose') {
            gameScreen.innerHTML =   `<div class='game-result'>You Win!</div>`;
        }
        // open roundEnd window
        gameScreen.innerHTML +=   `  <ul class='round-end-menu'>
                                        <li>Try Again</li>
                                        <li>End Game</li>
                                    </ul>
                                    `;
        this.menuPointer = document.querySelector('.round-end-menu');
        this.menuPointerIndex = 0;
        this.inMenuScreen = true;
        this.menuPointer.children[this.menuPointerIndex].classList.add('highlight');

      }

      /************************ Process Input *************************/
      // Handle the keyboard inputs.  call function to mirror keys on screen.  if round is in process, pass key to 
      // checkCurrentChar() for processing.  If between rounds, listen for 'Enter key to start round.
      processInput(keyValue) {
          if ( this.inMenuScreen) {  
            this.changeMenuPointer ( keyValue);
          } else {
            this.keyDownResponse(keyValue);
            this.checkCurrentChar ( keyValue );
          }
      }


      //match keyValue to corresponding key on virtual keyboard
      matchKeyIndex ( keyValue) {
        if ( keyValue == 'Backspace') {
            return 13;  
        } else if ( keyValue === 'Tab') {
            return 14; 
        } else if ( keyValue === 'Enter') {  
            return 40;
        } else if ( keyValue === 'Shift') {
            return [52,41];
        } else if ( keyValue === 'Control') {
            return [53,57]
        }  else if ( keyValue === 'CapsLock') {
            return 28; 
        } else if ( keyValue === 'Alt') {
            return [54,56];
        } else if ( keyValue === ' ') {
            return 55;
        } else {
            for (let i = 0; i < keyboard.length ;i++) {
                if (keyboard[i].textContent.length === 2 && keyValue.length === 1) {
                    if (keyValue === keyboard[i].textContent[0] || keyValue === keyboard[i].textContent[1]) {
                        return i;
                    }
                } else if ( keyValue.toUpperCase() === keyboard[i].textContent) {
                    return i;
                }
            }
        }            
      }
      
      ///// On screen keyboard keydown visual response
      keyDownResponse (keyValue) {
        let matchingKeyIndex = this.matchKeyIndex(keyValue);
        if ( keyValue === 28) {
            if ( keyboard[28].className.includes('key-down')){
                keyboard[28].classList.remove('key-down');
            } else {
                keyboard[28].classList.add('key-down');
            }
        } else {
            if ( matchingKeyIndex.length === 2) {
                keyboard[matchingKeyIndex[0]].classList.add('key-down');
                keyboard[matchingKeyIndex[1]].classList.add('key-down');
            } else {
                keyboard[matchingKeyIndex].classList.add('key-down');
            }
        }  
      }

      ///// On screen keyboard keyup visual response
      keyUpResponse (keyValue) {  
        let matchingKeyIndex = this.matchKeyIndex(keyValue);
            if ( matchingKeyIndex.length === 2) {
                keyboard[matchingKeyIndex[0]].classList.remove('key-down');
                keyboard[matchingKeyIndex[1]].classList.remove('key-down');
            } else {
                keyboard[matchingKeyIndex].classList.remove('key-down');
            }
      }

      /****************** Show Hint ***********************/
      //show next hint on the hint keyboard
      nextHint() {
        let currentChar = this.displayText[this.currentCharIndex]
        let matchingKeyIndex = this.matchKeyIndex(currentChar);
        this.removeHint();
        if ( currentChar.length === 1 && currentChar.match(/[^a-z0-9\\\[\]\;\'\,\.\/\=\`\]\-\ ]/g) ) {
            hintKeyboard[matchingKeyIndex].classList.add('key-down');
            hintKeyboard[41].classList.add('key-down');
        } else {
            hintKeyboard[matchingKeyIndex].classList.add('key-down');
        }
      }

      //remove all hints.  used at end of round
      removeHint () {
        let currentHint = document.querySelectorAll('.keyboard-hints-display .key-down');
        for ( let i = 0; i < currentHint.length; i++) {
            currentHint[i].classList.remove('key-down');
        }
      }

      /*************** Game Stats  ********************/
      //start the timer at startTime
      startTimer() {
        if ( this.maxTimer !== '\u221e') {
            timer.textContent = this.maxTimer;
            this.timer = setInterval( udateTimer => {
                if (timer.textContent !== '0') {
                    timer.textContent = parseInt(timer.textContent) - 1;
                } else {
                    this.endRound('lose');
                }
            }, 1000);
        } else {
            timer.textContent = '\u221e';
        }
      }

      stopTimer() {
          if (this.maxTimer !== '\u221e'){
            clearInterval(this.timer);
          }
        }

      resetHealth() {
        healthBar.textContent = "";
        for ( let i = 0; i < this.maxHealth; i++) {
            healthBar.innerHTML += `<span class="health-tick">&nbsp;</span>`;
        }
      }

      decrementHealth() {
          healthBar.removeChild(healthBar.childNodes[healthBar.children.length - 1]);
          if ( !healthBar.hasChildNodes() ) {
            this.endRound('lose');
          } 
      }

      ////////////////////////////////////////
     
      ////// Testing:   
      

      //End Game
      endGame() {
        //testing
        alert('Game Ended');
      }
  }

  /***************************************************************************************************************/
  // Helper functions

  function handleToggleHint(e) {
    e.preventDefault();
    if (!e.key || e.key === 0 ) {
        if (hintDisplay.className.includes('hidden')) {
            hintDisplay.classList.remove('hidden');
            gameSession.showHints = true;    
        } else {
            hintDisplay.classList.add('hidden');
            gameSession.showHints = false;
        }    
    }    
  }


  /************************************************************************/
  /************************Start game session******************************/
  /************************************************************************/
  const gameSession = new Game();
  
  //testing
  gameSession.runStartScreen();

  /*********Event Listeners*********/
  //physical keyboard listener
  document.addEventListener ('keydown', (event) => {
    gameSession.processInput(event.key);
  });

  document.addEventListener ('keyup', (event) => {
    if (!gameSession.inMenuScreen) {
        gameSession.keyUpResponse(event.key);
    }    
  });

  //toggle keyboard-hint listener
  toggleHint.addEventListener ('keyup', handleToggleHint, true);
  toggleHint.addEventListener ('change', handleToggleHint, true);
  
});