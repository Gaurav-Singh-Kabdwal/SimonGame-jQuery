let lvl = 0;
let index = 0;
let onStart = true;
let gamePattern = [];
let userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
    lvl++;
    $("#level-title").text("Level " + lvl);
    index = 0;
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function handler() {
    const userChosenColour = this.id;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (gamePattern[index] == userChosenColour) {
        userClickedPattern.push(userChosenColour);
        index++;
    }
    else {
        gameOver();
        return;
    }
    if (userClickedPattern.length == gamePattern.length) {
        userClickedPattern.length = 0;
        index = 0;
        setTimeout(nextSequence, 1000);
    }
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    const btn = $("#" + currentColour);
    btn.addClass("pressed");
    setTimeout(function () { btn.removeClass("pressed") }, 100);
}

function gameOver() {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Play to restart.");
    const screen = $("body");
    screen.addClass("game-over");
    setTimeout(function () { screen.removeClass("game-over") }, 200);
    userClickedPattern.length = 0;
    gamePattern.length = 0;
    lvl = 0;
    onStart = true;
}


$(".btn").click(handler);


$(".play-btn").click(
    function () {
        if (onStart) {
            nextSequence();
            onStart = false;
        }
    });

$("h1").click(hacked);

function hacked() {
    setInterval(function () {
        $(".play-btn").click();
        $("#" + gamePattern[index]).click();
    }, 500);
}
