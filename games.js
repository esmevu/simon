var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;


//Determine when the game starts
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//How the game operates
function checkedAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    //Game over
    var gameOver = new Audio("sounds/wrong.mp3");
    gameOver.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over! Press Any Key to Restart");

    startOver();
  }
}

//Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


//playing sound for the buttons
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//make animate for buttons
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Set up the user interaction
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkedAnswer(userClickedPattern.length - 1);
});


//Game pattern
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}
