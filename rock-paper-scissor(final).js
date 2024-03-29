let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
    playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r')
    {
        playGame('rock');
    }
    else if(event.key === 'p')
    {
        playGame('paper');
    }
    else if(event.key === 's')
    {
        playGame('scissors');
    }
});

function playGame(playerMove)
{
    let result;
    const computerMove = computerChoice();
    if(playerMove === 'scissors')
    {
        if(computerMove === 'rock')
            result = 'You lose.';
        else if(computerMove === 'paper')
            result = 'You win.';
        else    
            result = 'You tie.';
    }
    else if(playerMove === 'rock')
    {
        if(computerMove === 'rock')
            result = 'You tie.';
        else if(computerMove === 'paper')
            result = 'You lose.';
        else    
            result = 'You win.';
        
    }
    else
    {
        if(computerMove === 'rock')
            result = 'You win.';
        else if(computerMove === 'paper')
            result = 'You tie.';
        else    
            result = 'You lose.';
    }

    if(result === 'You win.')
        score.wins++;
    else if(result === 'You lose.')
        score.losses++;
    else    
        score.ties++;
    
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You 
        <img src="${playerMove}-emoji.png" class="move-icon"> 
        <img src="${computerMove}-emoji.png" class="move-icon">   
    Computer`;

    
}

function updateScoreElement()
{
    document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function computerChoice()
{   
    let computerMove;
    const randomNumber = Math.random();

    if(randomNumber >= 0 && randomNumber < 1 / 3)
        computerMove = 'rock';
    else if(randomNumber >= 1 / 3 && randomNumber < 2 / 3)
        computerMove = 'paper';
    else    
        computerMove = 'scissors';

    return computerMove;

}

let isAutoPlaying = false;
let intervalId;

function autoPlay()
{   
    if(!isAutoPlaying)
    {
        intervalId = setInterval(function(){
            const playerMove = computerChoice();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    }
    else
    {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }

    
}