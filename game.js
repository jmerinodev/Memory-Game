var startBtn = document.getElementById('start');
var squares = document.getElementsByClassName('square');
var score = document.getElementsByClassName('score');
var userAnswers = [];
var sequence = [];
var sequenceLength = 2;

function startGame() {
    hideInstructions();
    sequence = randomSequence(sequenceLength);
    var previousIndex = null;
    sequence.forEach(function(obj, index) {
        setTimeout(function() {
            if (previousIndex != null) {
                squares[previousIndex].classList.remove('flashy');
                squares[previousIndex].offsetHeight; //force repaint to trigger animation
            }
            squares[obj].classList.add('flashy');
            squares[obj].setAttribute('data-id', obj);
            previousIndex = obj;
        }, 1000 * (index + 1));
    });
    setTimeout(function() {
        for (var i = 0; i < squares.length; i++) {
            squares[i].addEventListener('click', registerUserClick, false);
            squares[i].style.cursor = "pointer";
        }
    }, (sequenceLength + 1) * 1000);
}

function registerUserClick() {
    var squareId = this.getAttribute('data-id');
    squareId = (squareId == null) ? squareId = -1 : squareId;
    userAnswers.push(Number(squareId));
    if (userAnswers.length == sequence.length) {
        checkAnswers();
    }
}

function checkAnswers() {
    var correct = compareArrays(userAnswers, sequence);
    if (correct) {
        score[0].innerHTML = Number(score[0].innerHTML) + 1;
        userAnswers = [];
        for (var i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', registerUserClick, false);
            squares[i].style.cursor = "default";
            squares[i].classList.remove('flashy');
        }
        sequenceLength++;
        startGame();
    }
    else {
        var title = document.querySelector('.level');
        title.innerHTML = "GAME OVER";
        userAnswers = [];
        sequenceLength = 2;
        resetGame();
    }
}

//checks if user answers array is equal to the sequence array
function compareArrays(a, b) {
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function randomSequence(num) {
    let randomSequence = [];
    for (var i = 0; i < num; i++) {
        randomSequence.push(Math.floor(Math.random() * (6 - 0 + 0) + 0));
    }
    console.log(randomSequence);
    return randomSequence;
}

function hideInstructions() {
    var instructions = document.querySelector('.instructions');
    instructions.style.display = "none";
    var currentLevel = document.querySelector('.current-level');
    currentLevel.style.display = "inline";
}

function showInstructions() {
    var instructions = document.querySelector('.instructions');
    instructions.style.display = "block";
    var currentLevel = document.querySelector('.current-level');
    currentLevel.style.display = "none";
}

function resetLevelHeading() {
    var title = document.querySelector('.level');
    title.innerHTML = "Level <span class='score'>1</span>";
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
    setTimeout(function() {
        showInstructions();
        resetLevelHeading();
        resetSquares();
    }, 2000);
}

startBtn.addEventListener('click', startGame, false);