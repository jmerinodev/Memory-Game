var startBtn = document.getElementById('start');
var squares = document.getElementsByClassName('square');
var score = document.getElementsByClassName('score');
var timeBetweenAnimations = 600;
var userAnswers = [];
var sequence = [];
var sequenceLength = 1;

startBtn.addEventListener('click', startGame, false);

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
    (squareId == null) ? resetGame() : userAnswers.push(Number(squareId));

    if (userAnswers.length == sequence.length) {
        checkAnswers();
    }
}

function checkAnswers() {
    if (compareArrays(userAnswers, sequence)) {
        score[0].innerHTML = Number(score[0].innerHTML) + 1;
        userAnswers = [];
        sequenceLength++;
        resetSquares();
        startGame();
    }
    else {
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