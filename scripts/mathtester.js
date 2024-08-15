"use strict";
let Question = document.getElementById("question");
let Input = document.getElementById("inputbox");
let Score = document.getElementById("score");
let Timer = document.getElementById("timer");
let Start = document.getElementById("start");
let DifficultySelector = document.getElementById("difficultyselector");

let mode = 0;
let gameStarted = false;

let operations = null;
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
        mode = DifficultySelector.selectedIndex;

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

        getQuestion();
    }
})

Input.addEventListener("keyup", function(event) {
    if (gameStarted && (Input.value == answer)) {
        score.innerHTML = parseInt(score.innerHTML) + 1;
        Input.value = "";
        getQuestion();
    }
})


// Game Functions
function getQuestion() {
    let num1 = null;
    let num2 = null;
    let operation = null;

    switch (mode) {
        case 0: // Easy
            // Choose random operation
            operations = ["+", "-"];
            operation = operations[Math.floor(Math.random() * operations.length)];

            // Choose random number
            num1 = Math.floor(Math.random() * 13);

            num2 = Math.floor(Math.random() * 13);
            
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
            // Choose random operation
            operations = ["+", "-", "*", "/"];
            operation = operations[Math.floor(Math.random() * operations.length)];

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

        case 2: // Hard
            // Choose random operation
            operations = ["+", "-", "*", "/"];
            operation = operations[Math.floor(Math.random() * operations.length)];

            // Choose random number
            num1 = Math.floor(Math.random() * 21);

            // If division, prevent division by zero and decimal points
            if (operation == "/") {
                do {
                    num2 = Math.floor(Math.random() * 20) + 1;
                } while (num1 % num2 != 0);
            } else {
                num2 = Math.floor(Math.random() * 21);
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
        case 3: // Extremely Hard
            // Choose random operation
            operations = ["+", "-", "*", "/"];
            operation = operations[Math.floor(Math.random() * operations.length)];

            // Choose random number
            num1 = Math.floor(Math.random() * 51);

            // If division, prevent division by zero and decimal points
            if (operation == "/") {
                do {
                    num2 = Math.floor(Math.random() * 50) + 1;
                } while (num1 % num2 != 0);
            } else {
                num2 = Math.floor(Math.random() * 51);
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
        case 4: // Insane
            // Choose random operation
            operations = ["+", "-", "*", "/"];
            operation = operations[Math.floor(Math.random() * operations.length)];

            // Choose random number
            num1 = Math.floor(Math.random() * 101);

            // If division, prevent division by zero and decimal points
            if (operation == "/") {
                num2 = Math.floor(Math.random() * 100) + 1;
            } else {
                num2 = Math.floor(Math.random() * 101);
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
                    // Round to nearest hundredth
                    answer = Math.round(num1 / num2 * 100) / 100;
                    break;
            }
            break;
        case 5: // Super Insane
            // Choose random operation
            operations = ["+", "-", "*", "/"];
            operation = operations[Math.floor(Math.random() * operations.length)];

            // Choose random number
            num1 = Math.floor(Math.random() * 101);

            // If division, prevent division by zero and decimal points
            if (operation == "/") {
                num2 = Math.floor(Math.random() * 100) + 1;
            } else {
                num2 = Math.floor(Math.random() * 101);
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
                    // Round to nearest ten thousandth
                    answer = Math.round(num1 / num2 * 10000) / 10000;
                    break;
            }
            break;
    }
    
    // Display question
    Question.innerHTML = `What is ${num1} ${operation} ${num2}?`;
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

document.getElementById("backButton").addEventListener('click', () => {
    window.location.href = "index.html";
});