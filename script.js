//variables
//time && scores
var timeEl = document.querySelector(".show-timer");
var secondsLeft = 100;
var viewHighScore = document.querySelector("#view-score");

//Start
var introEl = document.querySelector(".intro");

//questions
var questionsEl = document.querySelector("#qusetions");
var questionEl = document.querySelector("#question");
let questionCount = 0;

var showResult = document.querySelector("#show-result");
let scoreList = [];

//buttons
var StartBtn = document.querySelector("#start");
var ansBtn = document.querySelector(".answers")
var ans1Btn = document.querySelector("#answer1");
var ans2Btn = document.querySelector("#answer2");
var ans3Btn = document.querySelector("#answer3");
var ans4Btn = document.querySelector("#answer4");

var SubmitBtn =document.querySelector("#submit");
var goBackBtn = document.querySelector("#go-back");
var clearBtn = document.querySelector("#clearscores");

//Objects for QUestions: True || False
const questions = [ // array of objects
    {
        // question 0
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"
    },
    {
        // question 1
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "1"
    },
    {
        // question 2
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        // question 3
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },
    {
        // question 4
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    }
];

//functions:
//timer
function setTime(){
    // Sets interval in variable
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if(secondsLeft === 0 || questionCount === questions.length){
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            

        }

    }, 1000);
}

//Start quiz with timer and set up questions:
function startQuiz(){
    introEl.style.display = "none";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);

}

console.log(questions.length);

//function to set questions: to count && show next questions
function setQuestion(id){
    if( id < questions.length){
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
        
    }
}

//function to check answer 
function checkAnswer(event){
    event.preventDefault();

    //append show-result
    showResult.style.display = "block";
    let show = document.createElement("show");
    show.appendChild(show);

    //time-out 
    setTimeOut(function(){
        showResult.style.display = "none";
    }, 1000);

    //answer checker
    if (questions[questionCount].correctAnswer === event.target.value){
        show.textContent = "Correct!";
    }else {
        show.textContent = "Wrong!";
    }
    //increament questions
    if (questionCount < questions.length){
        questionCount++;
    }
    //call
    setQuestion(questionCount);
}

//increment the questions
if (questionCount < questions.length){
    questionCount++;
}

//clear score
function clearScore(){

}

//Eventlisteners
//start quiz && timer && first question
StartBtn.addEventListener("click", startQuiz);

//check answer loop
ansBtn

//add score
SubmitBtn.addEventListener("click", addScore);

//go back button
goBackBtn.addEventListener("click", function(){

});

//clear score
clearBtn.addEventListener("click", clearScore);

//view high score button
viewHighScore.addEventListener("click", function(){

})

