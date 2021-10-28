
const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

//clickButtonSound

function playClick(){
    var clickSound = document.querySelector('#clickSound')
    clickSound.play()
}

//soundOnOff
var btnSound = document.querySelector("#soundGame");
var musicGame = document.querySelector("#music");

btnSound.addEventListener('click', soundOffOn);
function soundOffOn(){
    playClick()
    
    if (btnSound.innerHTML === "Song: ON"){
        btnSound.innerHTML = "Song: OFF"
    } else{
        btnSound.innerHTML = "Song: ON"
    }
}


//playGame
let btnplayGame = document.querySelector('#playGame')
btnplayGame.addEventListener('click', playGame)
function playGame(){
    playClick()
    startNewGame()
    if (btnSound.innerHTML === "Song: ON"){
        musicGame.play()
    } else{
        return
    }
}

function startNewGame(){
    let newGame = document.querySelector('#newGame')
    newGame.style.display = 'none';
    startGame();
  
    let cardBackClass = document.querySelector('.card_back')
    let cardFrontClass = document.querySelector('.card_front')
    cardBackClass.style.display = 'flex';
    cardFrontClass.style.display = 'flex';
}

//will start the game
function startGame(){

    initializeCards(game.createCardsFromTechs());
}

//will create the cards in the JS to appear in the web
function initializeCards(cards){

    let gameBoard = document.querySelector('#gameBoard');
    gameBoard.innerHTML = ''
    game.cards.forEach(card => {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard);
        
        gameBoard.appendChild(cardElement);
    })

}

//creates the content of the card_front and card_back:
function createCardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

//creates each face of the card
function createCardFace(face, card, element){
    
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if(face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.src = "./images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
        if (window.matchMedia('(max-width: 420px)').matches){
            iconElement.style.width = '55px'
            iconElement.style.heigth = '85px'
        } else{
            iconElement.style.width = '90px'
            iconElement.style.heigth = '90px'
        }
    }else{
        let frontImg = document.createElement('img');
        frontImg.src = "./images/memory.png";
        cardElementFace.appendChild(frontImg);
            if (window.matchMedia('(max-width: 420px)').matches){
                frontImg.style.width = "50px"
            } else{
                frontImg.style.width = "120px"
            }
    }

    element.appendChild(cardElementFace);
}


//flip the card when clicked
function flipCard(){

    if (game.setCard(this.id)){

        this.classList.add('flip');
        if (game.secondCard){
            if(game.checkMatch()){
                game.clearCards();

                if (game.checkGameOver()){
                    let gameOverLayer = document.querySelector('#gameOver')
                    gameOverLayer.style.display = 'flex';

                }
            } else{
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
                
                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);
            }
        }
    }
    
}

//restart game after gameOver
function restart(){
    playClick()
    game.clearCards();
    startGame();
    let gameOverLayer = document.querySelector('#gameOver')
                    gameOverLayer.style.display = 'none';
}

