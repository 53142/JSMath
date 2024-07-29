Question = document.getElementById("question");
Input = document.getElementById("inputbox");
Score = document.getElementById("score");
Timer = document.getElementById("timer");
Start = document.getElementById("start");
DifficultySelector = document.getElementById("difficultyselector");

const modes = ["easy", "medium", "hard"];

const simple_operations = ["+", "-", "*", "/"];
let gameStarted = false;

let question = null;
let answer = null;

let sec = 30;
let timerID = null;
let correctanswer = null;

// Event listeners
Start.addEventListener("click", function() {
    // If game is not already started
    if (!gameStarted) {
        gameStarted = true;
        score.innerHTML = "0";
        Input.value = "";

        // Start timer
        sec = 30;
        timerID = setInterval(() =>{
            Timer.innerHTML=sec;
            sec--;
            if (sec < 0) {
                timeUp();
                return;
            }
        }, 1000);

        let QuestionAnswer = getQuestion(DifficultySelector.selectedIndex);
        // Set question/answer variables
        question = QuestionAnswer[0];
        answer = QuestionAnswer[1];
        
        console.log(QuestionAnswer);

        // Display question
        Question.innerHTML = question;
    }
})

Input.addEventListener("keyup", function(event) {
    if (gameStarted && (Input.value == answer)) {
        score.innerHTML = parseInt(score.innerHTML) + 1;
        Input.value = "";
        correctanswer = true;
    }
})


// Game Functions
function getQuestion(mode) {
    let answer = null;
    let num1 = null;
    let num2 = null;
    let operation = null;

    switch (mode) {
        case 0: // Easy
            // Choose random operation
            operation = simple_operations[Math.floor(Math.random() * simple_operations.length)];

            // Choose random number
            num1 = Math.floor(Math.random() * 13);

            // If division, prevent division by zero and decimal points
            if (operation == "/") {
                do {
                    num2 = Math.floor(Math.random() * 12) + 1;
                } while (num1 % num2 != 0);
            } else {
                num2 = Math.floor(Math.random() * 13);
            }
            // Get answer
            switch(operation) {
                case "+":
                    answer = num1 + num2;
                    break;
                case "-":
                    answer = num1 - num2;
                    break;
                case "*":
                    answer = num1 * num2;
                    break;
                case "/":
                    answer = num1 / num2;
                    break;
            }
            break;
        case 1: // Medium
            break;

        case 2: // Hard
            break;
    }
    return [`What is ${num1} ${operation} ${num2}?`, answer];
}

function timeUp() {
    clearInterval(timerID);
    timerID = null;

    gameStarted = false;
    Timer.innerHTML = "0";
    Question.innerHTML = "";

    if (parseInt(score.innerHTML) > parseInt(highscore.innerHTML)) {
        highscore.innerHTML = score.innerHTML;
    }
    return;
}