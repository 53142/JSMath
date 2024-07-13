Question = document.getElementById("question");
Input = document.getElementById("inputbox");
Score = document.getElementById("score");
Timer = document.getElementById("timer");
Start = document.getElementById("start");

const operations = ["+", "-", "*", "/"];
let QuestionAnswer = null;
let gameStarted = false;


function getQuestionAnswer() {
    let operation = operations[Math.floor(Math.random() * operations.length)];
    let num1 = Math.floor(Math.random() * 13);
    let num2 = null;

    if (operation == "/") {
        // Prevent division by zero
        num2 = Math.floor(Math.random() * 12) + 1;
    } else {
        num2 = Math.floor(Math.random() * 13);
    }
    let answer = getAnswer(num1, operation, num2);
    console.log("Answer: " + answer);
    return [`What is ${num1} ${operation} ${num2}?`, answer];
}

function getAnswer(num1, operation, num2) {
    switch (operation) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
    }
}

function makeQuestion() {
    QuestionAnswer = getQuestionAnswer();
    
    // If there is a decimal point, discard question and make a new one
    if (QuestionAnswer[1] % 1 != 0) {
        makeQuestion();
    }

    Question.innerHTML = QuestionAnswer[0];
}

function startTimer() {
    var sec = 30;
    setInterval(function(){
        Timer.innerHTML=sec;
        sec--;
        if (sec < 0) {
            timeUp();
            return;
        }
    }, 1000);
}

function timeUp() {
    gameStarted = false;
    clearInterval(timer);
    Timer.innerHTML = "0";
    Question.innerHTML = "";
    if (parseInt(score.innerHTML) > parseInt(highscore.innerHTML)) {
        highscore.innerHTML = score.innerHTML;
    }
    return;
}

Input.addEventListener("keyup", function(event) {
    if (gameStarted && (Input.value == QuestionAnswer[1])) {
        score.innerHTML = parseInt(score.innerHTML) + 1;
        makeQuestion();
        Input.value = "";
    }
})

Start.addEventListener("click", function() { 
    if (gameStarted) {
        return;
    }
    gameStarted = true;
    score.innerHTML = "0";
    Input.value = "";
    makeQuestion();
    startTimer();
})