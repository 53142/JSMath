"use strict";


Decimal.set({ precision: 500, toExpNeg: -999, defaults: true });

// Define operator precedence
const ops = {
    '+': { precedence: 1, associativity: 'L', fn: (a, b) => a + b },
    '-': { precedence: 1, associativity: 'L', fn: (a, b) => a - b },
    '*': { precedence: 2, associativity: 'L', fn: (a, b) => a * b },
    '×': { precedence: 2, associativity: 'L', fn: (a, b) => a * b },
    'x': { precedence: 2, associativity: 'L', fn: (a, b) => a * b }, 
    '/': { precedence: 2, associativity: 'L', fn: (a, b) => a / b },
    '÷': { precedence: 2, associativity: 'L', fn: (a, b) => a / b },   
    '^': { precedence: 3, associativity: 'R', fn: (a, b) => Math.pow(a, b) }
};

// Define functions
const functions = {
    'log': { fn: (a) => Decimal.log10(a) },
    'sin': { fn: (a) => Decimal.sin(a) },
    'cos': { fn: (a) => Decimal.cos(a) },
    'tan': { fn: (a) => Decimal.tan(a) },
    'csc': { fn: (a) => Decimal.div(1, Decimal.sin(a)) },
    'sec': { fn: (a) => Decimal.div(1, Decimal.cos(a)) },
    'cot': { fn: (a) => Decimal.div(1, Decimal.tan(a)) },
    'asin': { fn: (a) => Decimal.asin(a) },
    'acos': { fn: (a) => Decimal.acos(a) },
    'atan': { fn: (a) => Decimal.atan(a) },
    'sqrt': { fn: (a) => Decimal.sqrt(a) },
    'max': { fn: (a, b) => Decimal.max(a, b) },
    'min': { fn: (a, b) => Decimal.min(a, b) }
};

// Split the input string into tokens (numbers, operators, parentheses)
function tokenize(expression) {
    console.log("expression: ", expression);
    if (expression.match(/\(.*-\d.*\)*/g)) {
        // replace all instances of - with (0-
        expression = expression.replace(/-/g, '(0-');

        // add closing parentheses
        //expression = expression.replace(/\(0\-\d.*/g, '$&)');
    }
    if (expression.match(/√/g)) {
        expression = expression.replace(/√/g, 'sqrt(');
    }
    console.log("tokenized: ", expression.match(/\d+\.?\d*|[+*\/()-^]|(log|sin|cos|tan|csc|sec|cot|asin|acos|atan|max|min|÷|×|x|sqrt|√|π|pi|e|𝜏|tau)/g));
    return expression.match(/\d+\.?\d*|[+*\/()-^]|(log|sin|cos|tan|csc|sec|cot|asin|acos|atan|max|min|÷|×|x|sqrt|√|π|pi|e|𝜏|tau)/g);
}

// Convert infix expression to postfix using the Shunting Yard algorithm
function infixToPostfix(tokens) {
    let output = [];
    let stack = [];
    
    let i=0
    tokens.forEach(token => {
        i++

        // If token is number, add to output
        if (!isNaN(token)) {
            output.push(token);
        } else if (functions[token]) { // If token is function
            stack.push(token);
        } else if (ops[token]) { // If token is operator
            // While there are items in the stack and the top item in the stack is an operator
            while (stack.length && ops[stack[stack.length - 1]] && (
                (ops[stack[stack.length - 1]].precedence > ops[token].precedence) ||
                (ops[stack[stack.length - 1]].precedence == ops[token].precedence && ops[token].associativity === 'L')
            )) {
                output.push(stack.pop());
            }
            stack.push(token);
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            if (stack[stack.length - 1] === '(') {
                stack.pop();
            }
            if (functions[stack[stack.length - 1]]) {
                output.push(stack.pop());
            }
        } else if (token === 'π' || token === 'pi') {
            output.push(Decimal.acos(-1));
        } else if (token === 'e') {
            output.push(Math.E);
        } else if (token === '𝜏' || token === 'tau') {
            output.push(Math.PI / 2);
        } else {
            console.log("Invalid token: ", token);
        }

        //DEBUG LOGGING
        //console.log("time through loop: ", i)
        //console.log("output: ", output);
        //console.log("stack: ", stack);
    });
    
    // Add all remaining operators in the stack to the output
    while (stack.length) {
        output.push(stack.pop());
    }
    
    console.log("Postfix Output: ", output);
    return output;
}

function evaluatePostfix(postfixTokens) {
    // Evaluate the postfix expression using a stack
    let stack = [];
    
    postfixTokens.forEach(token => {
        if (!isNaN(token)) {    // If token is a number
            stack.push(token);
        } else if (token === 'pi') {
            stack.push(Decimal.PI);
        
        } else if (functions[token]) {  // If token is a function
            let a = stack.pop();
            if (functions[token].fn.length > 1) {
                let b = stack.pop();
                stack.unshift(functions[token].fn(a,b));
            } else {
                stack.unshift(functions[token].fn(a));
            }
        } else if (ops[token]) { // If token is an operator
            let b = stack.pop();
            let a = stack.pop();
            
            // Deal with negative numbers
            if (token === '-' && a === undefined) {
                stack.push(-b);
            } else {
                stack.push(ops[token].fn(a,b));
            }
        }
        console.log("stack: ", stack);
    });
    
    return stack[0];
}

function evaluateExpression(expression) {
    // Tokenize, convert to postfix, and evaluate
    let tokens = tokenize(expression);
    let postfixTokens = infixToPostfix(tokens);
    let result = evaluatePostfix(postfixTokens);
    return result;
}

//const regex = /^[0-9,\(,\)]+([+,-,*,\/,\(,\)]+[0-9,\(,\)]+)+$/gm;
const regex = /^[A-z0-9,\(\)+\*\/\-.÷×xπ√𝜏tau]*$/

let input = document.querySelector('input');
let answer = document.querySelector('#answer');
let button = document.querySelector('#calculate');

input.addEventListener("keydown", function(event) {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
        calculate();
    }
});

button.addEventListener('click', calculate);

function calculate() {
    let value = input.value;
    
    // If textbox contains number followed by math operation (+,-,*,/) followed by number
    if (input.value === '') {
        answer.innerHTML = '';
    }
    else if (input.value.match(regex)){
        console.log("here")
        let expression = value;
        let result = evaluateExpression(expression);
        answer.innerHTML = result;
        console.log(`The result of '${expression}' is ${result}`);
    }
    else {
        answer.innerHTML = 'Invalid input';
    }
};