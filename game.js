
var userClickedPattern = [];
var gamePattern = [];
var level = 0
var buttonColours = ["red", "blue", "green", "yellow"];


//Generates the next button that lights up and is added the game sequence
function nextSequence(){

  userClickedPattern = []

  level += 1
  $("h1").text("Level "+ level)

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
};


//When user clicks any of the html buttons the sound for that button is pressed
//and the pressing action is animated and finally checked to see if its the right answer
$(".btn").on('click', function (){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


//audio generator
function playSound(name){
  var audio = new Audio("sounds/" + name + '.mp3');
  audio.play();
}


//this function when activated adds the pressed animation and removes it after
// 100 miliseconds to give the flashing action
function animatePress(currentColour){
  var pressedButton = $('#'+ currentColour);

  $(pressedButton).addClass('pressed');

  setTimeout(function (){$(pressedButton).removeClass('pressed')}, 100);
};



//Game start control, when gameStarted is false if any button is pressed the first
// level/sequence is intiated and gameStarted is set to true.
var gameStarted = false

$(document).keypress(function(){
  if (!gameStarted){
    nextSequence();
    gameStarted = true;
  }
});


//This function checks the input of the player at every step of the sequence.
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver()
    }
}


//Game Restart
function startOver(){
  userClickedPattern = [];
  gamePattern = [];
  gameStarted = false;
  level = 0;
}
