$(document).ready(function () {
    console.log("Document is ready and jQuery is available.");
});

var buttonColors = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var gameOver = false;
var level = 0;
var gamePattern = [];
var userClickedPattern = [];

$(document).on("keydown", function () {
    if (isStarted()) {
        showWrongKey();
    } else {
        startGame();
        showTitle();
        setTimeout(function () { showNextColor() }, 1000);
    }
});

$("#green").on("click", function () {
    if (isStarted()) {
        showClickEffect("green");
        userClickedPattern.push("green");
        checkAnswer();
    }

});

$("#red").on("click", function () {
    if (isStarted()) {
        showClickEffect("red");
        userClickedPattern.push("red");
        checkAnswer();
    }
});

$("#blue").on("click", function () {
    if (isStarted()) {
        showClickEffect("blue");
        userClickedPattern.push("blue");
        checkAnswer();
    }
});

$("#yellow").on("click", function () {
    if (isStarted()) {
        showClickEffect("yellow");
        userClickedPattern.push("yellow");
        checkAnswer();
    }
});

function isStarted() {
    if (gameStarted) {
        return true;
    } else {
        return false;
    }
}

function isGameOver() {
    if (gameOver) {
        return true;
    } else {
        return false;
    }
}

function startGame() {
    gameStarted = true;
    gameOver = false;
    level = 1;
    gamePattern = [];
    userClickedPattern = [];
}

function endGame() {
    gameStarted = false;
    gameOver = true;
}

function showTitle() {
    if (isStarted()) {
        $("#title").text("Level " + level);;
    } else if (isGameOver()) {
        $("#title").text("Game Over, Press A Key to Restart");
    } else {
        $("#title").text("Press A Key to Start");
    }
}

function showNextColor() {
    if (isStarted()) {
        clearUserClickedPattern();
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        showSystemClickEffect(randomChosenColor);
    }
}

function showClickEffect(color) {
    $("#" + color).addClass("clicked");
    setTimeout(function () {
        $("#" + color).removeClass("clicked");
    }, 200);
    var audio = new Audio('sounds/' + color + '.mp3');
    audio.play();
}

function showSystemClickEffect(color) {
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio('sounds/' + color + '.mp3');
    audio.play();
}

function checkAnswer() {
    for (var i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            showWrongKey();
            endGame();
            showTitle();
            return;
        }
    }
    if (gamePattern.length === userClickedPattern.length) {
        levelUp();
        clearUserClickedPattern();
        setTimeout(function () { showTitle() }, 500);
        setTimeout(function () { showNextColor() }, 1000);
        return;
    }
}

function showWrongKey() {
    $("body").addClass("wrong");
    setTimeout(function () {
        $("body").removeClass("wrong");
    }, 200);
    var audio = new Audio('sounds/wrong_key.mp3');
    audio.play();
}

function levelUp() {
    level++;
}

function clearUserClickedPattern() {
    userClickedPattern = [];
}

