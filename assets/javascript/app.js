//global variables 
var questionCounter = 0;
var answerSelected;
var clockCountdown;
var numberCorrect =0;
var numberIncorrect =0;
var numberNotAnswered = 0;
var counter = 45;
var openScreen;
var gameHTML;
//arrays for game
var questionArray = [];
var answerArray = [];
var imageArray = [];
var correctAnswers =[];
//begin game code
$(document).ready(function() {
//opening page
function openingPage() {
    openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='index.html' role='button'>Start Quiz</a></p>";
    $("#gameArea").append(openScreen);
}
openingPage();
// click event for start button
$("#gameArea").on("click", ".start-button", function(event){
    event.preventDefault(); 
    $('.jumbotron').hide();
    generateQuestions();
    timerWrapper();

});
//selected answer comparison
$("body").on("click", ".answer", function(event){
    answerSelected = $(this).text();
    if (answerSelected === correctAnswers[questionCounter]) {
        alert("correct");
        clearInterval(clockCountdown);
        generateWin();
        }
        else {
            alert("wrong answer!");
            clearInterval(clockCountdown);
            generateLoss();
        }
    });
//reseting game
    $("body").on("click", ".reset-button", function(event){
        resetGame();
    });
});
//time loss function
function timeoutLoss() {
    numberNotAnswered++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='#'>";
    $("#gameArea").html(gameHTML);
    setTimeout(wait, 4500);
}
// win function
function generateWin() {
    numberCorrect++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $("#gameArea").html(gameHTML);
    setTimeout(wait, 3000);
}
// loss function
function generateLoss() {
    numberIncorrect++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='#'>";
    $("#gameArea").html(gameHTML);
    setTimeout(wait, 3000); 
}
// generate questions function
function generateQuestions() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
    $("#gameArea").html(gameHTML);
};
// wait function
function wait() {
    if (questionCounter < 5) {
    questionCounter++,
    generateQuestions();
    counter = 45;
    timerWrapper();
    }
    else {
    finalScreen();
    }
}
// time function
function timerWrapper() {
    clockCountdown = setInterval(fourtyFiveSeconds, 1000);
    function fourtyFiveSeconds() {
        if (counter === 0) {
            clearInterval(clockCountdown);
            timeoutLoss();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}
//final screen function
function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + numberCorrect + "</p>" + "<p>Wrong Answers: " + numberIncorrect + "</p>" + "<p>Unanswered: " + numberNotAnswered + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $("#gameArea").html(gameHTML);
}
// reset function
function resetGame() {
    questionCounter = 0;
    numberCorrect = 0;
    numberIncorrect = 0;
    numberNotAnswered = 0;
    counter = 45;
    generateQuestions();
    timerWrapper();
}
