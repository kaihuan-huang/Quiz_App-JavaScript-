//variables
//time && scores
var timeEl = document.getElementById("show-timer");
var secondsLeft = 100;
var timer;
var viewHighScoreBtn = document.getElementById("view-score");

//Start
var introEl = document.querySelector("#intro");

//questions
var questionsEl = document.querySelector("#questions");
var questionEl = document.getElementById("question");
let questionCount = 0;

var showResult = document.getElementById("show-result");

//Initial score
var score = 0;
var scoreEl = document.getElementById("score");
var initialInput = document.getElementById("initials");


//scores-list array
var scoreListEl = document.getElementById("scores-list");
var clearScoreEl = document.getElementById("clearscores");
var scoreList = [];

//final section
var finalEl = document.querySelector("#final");
var viewHighScoreEl = document.querySelector("#high-scores");


//buttons
var startBtn = document.getElementById("start");
var ansBtn = document.querySelectorAll(".ansBtn");
var ans1Btn = document.getElementById("answer1");
var ans2Btn = document.getElementById("answer2");
var ans3Btn = document.getElementById("answer3");
var ans4Btn = document.getElementById("answer4");

var SubmitBtn =document.getElementById("submit");
var goBackBtn = document.getElementById("go-back");
var clearBtn = document.getElementById("clearscores");



//Objects for QUestions: True || False
const questions = [ // array of objects
    {
        // question 0
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "3"
    },
    {
        // question 1
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "3"
    },
    {
        // question 2
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "4"
    },
    {
        // question 3
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "3"
    },
    {
        // question 4
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "4"
    }
];

//functions:
//timer
function setTime() {
        timer = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time: "+secondsLeft;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timer);
            introEl.setAttribute("class","hide");
            questionsEl.setAttribute("class","hide");
            finalEl.setAttribute("class","show");
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}


//Start quiz with timer and set up questions:
function startQuiz() {
    introEl.setAttribute("class","hide");
    finalEl.setAttribute("class","hide");
    viewHighScoreEl.setAttribute("class","hide");
    questionsEl.setAttribute("class","show");
    questionCount = 0;

    setTime();
    setQuestions(questionCount);
}

console.log(questions.length);

//function to set questions: to count && show next questions
function setQuestions(id){
    if (id < questions.length-1 ){
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

    console.log(event.target.getAttribute("data-value"));
    //append show-result
    
    showResult.setAttribute("class","show");
    let result = document.createElement("div");
    
    console.log(questionCount);
    //answer checker
    if (questions[questionCount].correctAnswer ===  event.target.getAttribute("data-value")){
        result.textContent = "Correct!";
    }else {
        result.textContent = "Wrong!";
        secondsLeft -= 10;
    }
    showResult.appendChild(result);
    

    //increament questions
    if (questionCount < questions.length){
        questionCount++;
    }else{
        //stop timer
        clearInterval(timer);
        score = secondsLeft;
        scoreEl.textContent = score;
        return;
    }

    //call function to bring any ansBtn is cliked
    setQuestions(questionCount);
}

function addScore(event){
    event.preventDefault();

    finalEl.setAttribute("class","hide");
    viewHighScoreEl.setAttribute("class", "shows");

    var init = initialInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

        //sort max scores
    scoreList.sort((a , b)=>{
        if (a.score < b.score){
            return 1;
        }else{
            return -1;
        }
    });

    scoreList.innerHTML = "";
    for (var i = 0; i < scoreList.length; i++ ){
        var li = document.createElement("li");
        li.textContent = `${scoreList[i].initials} : ${ scoreList[i].score}`;
        scoreListEl.append(li);
    }

    //Add to local storage
    storeScores();
}

function storeScores(){
    //Array for store high score from local storage
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScore(){
    //Get stored scores from localStorage
    //Parsing the JSON 
    var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    //If the score were retrived from localStorage, update the scoreList array to it 
    if (storedScoreList !== null){
        scoreList = storedScoreList;
    }
}

//Eventlisteners
//start quiz && timer && first question
startBtn.addEventListener("click", startQuiz);

//ansBtn
ansBtn.forEach( item =>{
    item.addEventListener('click',checkAnswer);
});

//add score
SubmitBtn.addEventListener("click", addScore);

//go back button
goBackBtn.addEventListener("click", function(){

    viewHighScoreEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 100;
    timeEl.textContent =  "Time: " + secondsLeft;

});

//clear score
// clearBtn.addEventListener("click", clearScoreEl);
clearBtn.addEventListener("click", function(){
    localStorage.removeItem("scoreList");
    scoreListEl.innerHTML = "";
    console.log('abc');
});

//view high score button
viewHighScoreBtn.addEventListener("click", function(){
    viewHighScoreEl.setAttribute("class","show");
})

