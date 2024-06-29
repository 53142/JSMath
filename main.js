// FIX BUG WITH GETTING INACCURATE ANSWERS WHEN MULTIPLYING FUNCTIONS TOGETHER


// Define operator precedence and functions
const ops = {
    '+': { precedence: 1, associativity: 'L', fn: (a, b) => a + b },
    '-': { precedence: 1, associativity: 'L', fn: (a, b) => a - b },
    '*': { precedence: 2, associativity: 'L', fn: (a, b) => a * b },
    '/': { precedence: 2, associativity: 'L', fn: (a, b) => a / b },
    '^': { precedence: 3, associativity: 'R', fn: (a, b) => Math.pow(a, b) }
};

const functions = {
    'log': { fn: (a) => Math.log10(a) },
    'ln': { fn: (a) => Math.ln(a) },
    'sin': { fn: (a) => Math.sin(a) },
    'cos': { fn: (a) => Math.cos(a) },
    'tan': { fn: (a) => Math.tan(a) },
    'csc': { fn: (a) => 1/Math.sin(a) },
    'sec': { fn: (a) => 1/Math.cos(a) },
    'cot': { fn: (a) => 1/Math.tan(a) },
    'asin': { fn: (a) => Math.asin(a) },
    'acos': { fn: (a) => Math.acos(a) },
    'atan': { fn: (a) => Math.atan(a) },
    'max': { fn: (a,b) => Math.max(a,b) },
    'min': { fn: (a,b) => Math.min(a,b) }
};

function tokenize(expression) {
    // Split the input string into tokens (numbers, operators, parentheses)
    console.log("tokenized: ", expression.match(/\d+\.?\d*|[+*\/()-^]|(log|ln|sin|cos|tan|csc|sec|cot|asin|acos|atan|max|min)/g));
    return expression.match(/\d+\.?\d*|[+*\/()-^]|(log|ln|sin|cos|tan|csc|sec|cot|asin|acos|atan|max|min)/g);
}

function infixToPostfix(tokens) {
    // Convert infix expression to postfix using the Shunting Yard algorithm

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
        }

        //DEBUG LOGGING
        console.log("time through loop: ", i)
        console.log("output: ", output);
        console.log("stack: ", stack);
    });
    
    // Add all remaining operators in the stack to the output
    while (stack.length) {
        output.push(stack.pop());
    }
    
    console.log("Final Output: ", output);
    return output;
}

function evaluatePostfix(postfixTokens) {
    // Evaluate the postfix expression using a stack
    let stack = [];
    
    postfixTokens.forEach(token => {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else if (functions[token]) {
            let a = stack.pop();
            if (functions[token].fn.length > 1) {
                let b = stack.pop();
                stack.unshift(functions[token].fn(a,b));
            } else {
                stack.unshift(functions[token].fn(a));
            }
        } else if (ops[token]) {
            let b = stack.pop();
            let a = stack.pop();
            stack.push(ops[token].fn(a,b));
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
const regex = /^[A-z,0-9,\(\),+,\*,\/,-,.]*$/

let input = document.querySelector('input');
let answer = document.querySelector('#answer');
let button = document.querySelector('#calculate');

input.addEventListener("keydown", function(event) {
    if (event.code === "Enter") {
        calculate();
    }
});

button.addEventListener('click', calculate);

function calculate() {
    let value = input.value;
    
    // If textbox contains number followed by math operation (+,-,*,/) followed by number
    if (input.value.match(regex)){

        let expression = value;
        let result = evaluateExpression(expression);
        answer.innerHTML = result;
        console.log(`The result of '${expression}' is ${result}`);
    }
    else {
        answer.innerHTML = 'Invalid input';
    }
};