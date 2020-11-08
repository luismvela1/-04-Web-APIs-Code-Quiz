    
var questions = [{
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["script", "scripting", "js", "javascript"],
    answer: "script"
},
{
    question: "How to write an IF statement in JavaScript?",
    choices: ["if (i == 5)", "if i = 5", "if i == 5 then", "if i = 5 then"],
    answer: "if (i == 5)"
},
{
    question: "How do you call a function named myFunction?",
    choices: ["myFunction() ", "call myFunction()", "call function myFunction()"],
    answer: "myFunction() "
},
{
    question: "How can you add a comment in a JavaScript?",
    choices: ["'This is a comment", "//This is a comment ", "!--This is a comment--"],
    answer: "//This is a comment "
},
{
    question: "How do you round the number 7.25, to the nearest integer?",
    choices: ["round(7.25)", "rnd(7.25)", "Math.round(7.25)", "Math.rnd(7.25)"],
    answer: "Math.round(7.25)"
}
]


var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;


function start() {

timeLeft = 75;
document.getElementById("timeremaining").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeremaining").innerHTML = timeLeft;
  
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}


function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizprompt").innerHTML = quizContent;
}

function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizprompt").innerHTML = quizContent;
}


function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}


function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeremaining").innerHTML = timeLeft;

var quizContent = `
<h1>
Coding Quiz Challange
</h1>
<p> Try to answer the following code-realated questions within the time limit.<p>
<p> in mind that incorrect answers will penalize your scoretimeby ten seconds!</p>

<button onclick="start()">Start!</button>`;

document.getElementById("quizprompt").innerHTML = quizContent;
}

function incorrect() {   
timeLeft -= 15;
next();
}


function correct() {
score += 20;
next();
}

 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].question + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizprompt").innerHTML = quizContent;
}
