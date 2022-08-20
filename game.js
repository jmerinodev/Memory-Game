var startBtn = document.getElementById('start');
var squares = document.getElementsByClassName('square');
var score = document.getElementsByClassName('score');
var timeBetweenAnimations = 600;
var userAnswers = [];
var sequence = [];
var sequenceLength = 1;
var levelUserClickCount = 0;

startBtn.addEventListener('click', startGame, false);

function startGame() {
    hideInstructions();
    sequence = randomSequence(sequenceLength);
    levelUserClickCount = 0;
    sequence.forEach(function(obj, index) {
        setTimeout(function() {
            squares[obj].classList.remove('flashy');
            squares[obj].offsetHeight; //force repaint to trigger animation on next code line
            squares[obj].classList.add('flashy');
            squares[obj].setAttribute('data-id', obj);
        }, timeBetweenAnimations * (index + 1));
    });
    setTimeout(function() {
        for (var i = 0; i < squares.length; i++) {
            squares[i].addEventListener('click', registerUserClick, false);
            squares[i].style.cursor = "pointer";
        }
    }, (sequenceLength + 1) * timeBetweenAnimations);
}

function registerUserClick() {
    var squareId = this.getAttribute('data-id');
    if (squareId == null || sequence[levelUserClickCount] != squareId) {
        resetGame();
    }
    else {
        levelUserClickCount++;
        userAnswers.push(Number(squareId));
        this.classList.remove('flashy');
        this.offsetHeight; //force repaint to trigger animation
        this.classList.add('flashy');
    }

    setTimeout(function() {
        if (userAnswers.length == sequence.length) {
            advanceLevel();
        }
    }, 1000);
}

function advanceLevel() {
    score[0].innerHTML = Number(score[0].innerHTML) + 1;
    userAnswers = [];
    sequenceLength++;
    resetSquares();
    startGame();
}

function randomSequence(num) {
    let sequence = [];
    for (var i = 0; i < num; i++) {
        sequence.push(Math.floor(Math.random() * (6 - 0 + 0) + 0));
    }
    return sequence;
}

function hideInstructions() {
    document.querySelector('.instructions').style.display = "none";
    document.querySelector('.current-level').style.display = "inline";
}

function showInstructions() {
    document.querySelector('.instructions').style.display = "block";
    document.querySelector('.current-level').style.display = "none";
}

function resetLevelHeading() {
    document.querySelector('.level').innerHTML = "Level <span class='score'>1</span>";
}

function resetSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('click', registerUserClick, false);
        squares[i].classList.remove('flashy');
        squares[i].removeAttribute('data-id');
        squares[i].style.cursor = "default";
    }
}

function resetGame() {
    document.querySelector('.level').innerHTML = "GAME OVER";
    userAnswers = [];
    sequenceLength = 1;
    setTimeout(function() {
        showInstructions();
        resetLevelHeading();
        resetSquares();
    }, 2000);
}