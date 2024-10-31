"use strict";

// 5000 Digits of E
// For use in the calculator
const E = '2.71828182845904523536028747135266249775724709369995957496696762772407663035354759457138217852516642742746639193200305992181741359662904357290033429526059563073813232862794349076323382988075319525101901157383418793070215408914993488416750924476146066808226480016847741185374234544243710753907774499206955170276183860626133138458300075204493382656029760673711320070932870912744374704723069697720931014169283681902551510865746377211125238978442505695369677078544996996794686445490598793163688923009879312773617821542499922957635148220826989519366803318252886939849646510582093923982948879332036250944311730123819706841614039701983767932068328237646480429531180232878250981945581530175671736133206981125099618188159304169035159888851934580727386673858942287922849989208680582574927961048419844436346324496848756023362482704197862320900216099023530436994184914631409343173814364054625315209618369088870701676839642437814059271456354906130310720851038375051011574770417189861068739696552126715468895703503540212340784981933432106817012100562788023519303322474501585390473041995777709350366041699732972508868769664035557071622684471625607988265178713419512466520103059212366771943252786753985589448969709640975459185695638023637016211204774272283648961342251644507818244235294863637214174023889344124796357437026375529444833799801612549227850925778256209262264832627793338656648162772516401910590049164499828931505660472580277863186415519565324425869829469593080191529872117255634754639644791014590409058629849679128740687050489585867174798546677575732056812884592054133405392200011378630094556068816674001698420558040336379537645203040243225661352783695117788386387443966253224985065499588623428189970773327617178392803494650143455889707194258639877275471096295374152111513683506275260232648472870392076431005958411661205452970302364725492966693811513732275364509888903136020572481765851180630364428123149655070475102544650117272115551948668508003685322818315219600373562527944951582841882947876108526398139559900673764829224437528718462457803619298197139914756448826260390338144182326251509748279877799643730899703888677822713836057729788241256119071766394650706330452795466185509666618566470971134447401607046262156807174818778443714369882185596709591025968620023537185887485696522000503117343920732113908032936344797273559552773490717837934216370120500545132638354400018632399149070547977805669785335804896690629511943247309958765523681285904138324116072260299833053537087613893963917795745401613722361878936526053815584158718692553860616477983402543512843961294603529133259427949043372990857315802909586313826832914771163963370924003168945863606064584592512699465572483918656420975268508230754425459937691704197778008536273094171016343490769642372229435236612557250881477922315197477806056967253801718077636034624592787784658506560507808442115296975218908740196609066518035165017925046195013665854366327125496399085491442000145747608193022120660243300964127048943903971771951806990869986066365832322787093765022601492910115171776359446020232493002804018677239102880978666056511832600436885088171572386698422422010249505518816948032210025154264946398128736776589276881635983124778865201411741109136011649950766290779436460058519419985601626479076153210387275571269925182756879893027617611461625493564959037980458381823233686120162437365698467037858533052758333379399075216606923805336988795651372855938834998947074161815501253970646481719467083481972144888987906765037959036696724949925452790337296361626589760394985767413973594410237443297093554779826296145914429364514286171585873397467918975712119561873857836447584484235555810500256114923915188930994634284139360803830916628188115037152849670597416256282360921680751501777253874025642534708790891372917228286115159156837252416307722544063378759310598267609442032619242853170187817729602354130606721360460003896610936470951414171857770141806064436368154644400533160877831431744408119494229755993140118886833148328027065538330046932901157441475631399972217038046170928945790962716622607407187499753592127560844147378233032703301682371936480021732857349359475643341299430248502357322145978432826414216848787216733670106150942434569844018733128101079451272237378861260581656680537143961278887325273738903928905068653241380627960259303877276977837928684093253658807339884572187460210053114833513238500478271693762180049047955979592905916554705057775143081751126989851884087185640260353055837378324229241856256442550226721559802740126179719280471396006891638286652770097527670697770364392602243728418408832518487704726384403795301669054659374616193238403638931313643271376888410268112198912752230562567562547017250863497653672886059667527408686274079128565769963137897530346606166698042182677245605306607738996242183408598820718646826232150802882863597468396543588566855037731312965879758105012149162076567699506597153447634703208532156036748286083786568030730626576334697742956346437167093971930608769634953288468336130388294310408002968738691170666661468';

// Regular expression to match calculator inputs
const regexMatch = /\d+\.?\d*|[+*\/()-^]|(log|ln|sin|cos|tan|csc|sec|cot|asin|acos|atan|max|min|÷|×|x|x|sqrt|√|π|pi|e|𝜏|tau|!|cPi)/g;

let settingsShown = false;

let darkModeSetting = document.getElementById("darkModeSetting");

// Set dark mode based on device theme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toggleDarkMode();
}

let input = document.querySelector('input');
let answer = document.querySelector('#answer');
let button = document.querySelector('#calculate');


// Precision

let precisionSetting = document.getElementById("precisionSetting");

// Set default value for precision
let precision = 20;

// Populate precision setting value with default precision value
precisionSetting.value = precision;

// Set Decimal.js configuration options
Decimal.set({ precision: precision, defaults: true });

function adjustPrecision() {
    let precisionValue = parseFloat(precisionSetting.value)
    if (isNaN(precisionValue)) {
        precisionValue = 20
    } else {
        if (precisionValue > 100000) {
            precisionValue = 100000
        } else if (precisionValue < 1) {
            precisionValue = 1
        }
    }
    precisionSetting.value = precisionValue;

    // Set Decimal.js configuration options
    Decimal.set({ precision: precisionValue, defaults: true });
}

// BEGIN CALCULATOR CODE

// For use in Chudnovsky algorithm in Cpi Function
function factorialCache() {
    const cache = { 0: new Decimal(1) }; // Initialize cache with 0! = 1
    return function factorial(n) {       // Define and return the cached factorial function
        if (!cache[n]) {
            cache[n] = new Decimal(n).times(factorial(n - 1));
        }
        return cache[n];
    };
}

const factorial = factorialCache(); // Create a cached factorial function

// Define operator precedence
const ops = {
    '+': { precedence: 1, associativity: 'L', fn: (a, b) => Decimal.add(a, b) },
    '-': { precedence: 1, associativity: 'L', fn: (a, b) => Decimal.sub(a, b) },
    '*': { precedence: 2, associativity: 'L', fn: (a, b) => Decimal(a).times(b) },
    '×': { precedence: 2, associativity: 'L', fn: (a, b) => Decimal(a).times(b) },
    'x': { precedence: 2, associativity: 'L', fn: (a, b) => Decimal(a).times(b) },
    'x': { precedence: 2, associativity: 'L', fn: (a, b) => Decimal(a).times(b) },
    '/': { precedence: 2, associativity: 'L', fn: (a, b) => {
        if (b === "0" || b === Decimal(0)) {
            return "Error: Division by zero"; // super sketchy
        } else {
            return Decimal(a).div(b);
        }
    } },
    '÷': { precedence: 2, associativity: 'L', fn: (a, b) => {
        if (b === "0" || b === Decimal(0)) {
            return "Error: Division by zero"; // super sketchy  
        } else {
            return Decimal(a).div(b);
        }
    } },
    '^': { precedence: 3, associativity: 'R', fn: (a, b) => Decimal.pow(a, b) }
};

// Define functions
const functions = {
    'log': { fn: (a) => Decimal.log10(a) },
    'ln': { fn: (a) => Decimal.ln(a) },
    'sin': { fn: (a) => {
        // Deal with sin(pi)
        
        // Will technically decrease precision to 1e-300 for sin in this scenario but it is probably worth it
        if (Decimal.sin(a).mod(Decimal.acos(-1)) < 1e-300) {
            return Decimal(0);
        } else {
            return Decimal.sin(a);
        }
    } },
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
    'min': { fn: (a, b) => Decimal.min(a, b) },
    'cPi': { fn: (a) => { 
        // Initialize constants for Chudnovsky algorithm
        const C = new Decimal(426880).times(Decimal.sqrt(new Decimal(10005)));
        const M1 = new Decimal(545140134);
        const M2 = new Decimal(13591409);
        const M3 = new Decimal(640320);

        let factorial6i = new Decimal(1);
        let factorial3i = new Decimal(1);
        let factoriali3 = new Decimal(1);
        let summationResult = new Decimal(0);

        for (let i = 0; i <= a; i++) {
            console.log("i: ", i);
            if (i > 0) {
                factorial6i = factorial6i.times(new Decimal(6 * i));
                factorial3i = factorial3i.times(new Decimal(3 * i));
                factoriali3 = factoriali3.times(new Decimal(i));
            }
            
            let termNumerator = new Decimal(-1).pow(i).times(factorial6i).times(M1.times(i).add(M2));
            let termDenominator = factorial3i.times(factoriali3.pow(3)).times(M3.pow(3 * i));

            summationResult = summationResult.add(termNumerator.div(termDenominator));
        }

        // Calculate and return the approximate value of Pi
        return C.div(summationResult);
    } },
};

// Split the input string into tokens (numbers, operators, parentheses)
function tokenize(expression) {
    console.log("expression: ", expression);

    // Deal with √ as sqrt
    if (expression.match(/√/g)) {
        expression = expression.replace(/√/g, 'sqrt(');
    }
    console.log("tokenized: ", expression.match(regexMatch));
    return expression.match(regexMatch);
}

// Convert infix expression to postfix using the Shunting Yard algorithm
function infixToPostfix(tokens) {
    let output = [];
    let stack = [];

    let unary = false;
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        // If token is number, add to output
        if (!isNaN(token)) {
            if (unary) {
                output.push('0');
                unary = false;
            }
            output.push(token);            
        } else if (functions[token]) { // If token is function
            stack.push(token);
        } else if (ops[token]) { // If token is operator
            // Check if there is negation Ex: -(x+y), -x, (-x+y)
            if (token === '-' && (i === 0 || tokens[i-1] === '(' || ops[tokens[i-1]])) {
                unary = true;
                stack.push(token);
                continue;
            }

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
            output.push(Decimal(E));
        } else if (token === '𝜏' || token === 'tau') {
            output.push(Decimal.acos(-1).times(2));
        } else if (token === '!') { // Factorial
            let a = output.pop();
            output.push(factorialfunction(a));
            
        } else {
            console.log("Invalid token: ", token);
        }
    }
    
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
    
    for (let i = 0; i < postfixTokens.length; i++) {
        let token = postfixTokens[i];
        if (!isNaN(token)) {    // If token is a number
            stack.push(token);
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

            stack.push(ops[token].fn(a,b));
        }
        console.log("stack: ", stack);
    }
    
    return stack[0];
}

function evaluateExpression(expression) {
    // Tokenize, convert to postfix, and evaluate
    let tokens = tokenize(expression);
    let postfixTokens = infixToPostfix(tokens);
    let result = evaluatePostfix(postfixTokens);
    return result;
}

// Calculate the result of the expression when the 'Enter' or 'NumpadEnter' keys are pressed
input.addEventListener("keydown", function(event) {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
        calculate();
    }
});

// Calculate the result of the expression when the 'Calculate' button is clicked
button.addEventListener('click', calculate);

function calculate() {
    let value = input.value;
    
    if (input.value === '') {
        answer.innerHTML = '';
    } else if (input.value.match(regexMatch)){ // Validate input
        let expression = value;
        let result = evaluateExpression(expression);
        answer.innerHTML = result;
        console.log(`The result of '${expression}' is ${result}`);
    } else {
        answer.innerHTML = 'Invalid input';
    }
};

// Calculate the factorial for argument 'a'
function factorialfunction(a) {
    let result = Decimal(1);
    for (let i = 0; i < a; i++) {
        result = result.times(Decimal(a - i));
    }
    return(result);
}

// END CALCULATOR CODE


// Used to toggle the visibility of the settings page
document.getElementById("settingsButton").addEventListener('click', toggleSettings);

function toggleSettings() {
    // Toggle settings
    settingsShown = !settingsShown;

    if (settingsShown) {
        document.getElementById("settingsPage").style = "visibility: visible";
    } else {
        // Update the precision
        adjustPrecision();
        document.getElementById("settingsPage").style = "visibility: hidden";
    }
}

// Toggle dark mode
darkModeSetting.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
    // Change darkmode switch icon
    darkModeSetting.setAttribute("src", "images/darkmode" + (darkModeSetting.classList.contains("darkMode") ? "off" : "on") + ".svg");
    
    // Add darkMode class to every element
    document.querySelectorAll("*").forEach(element => {
        element.classList.toggle("darkMode");
    });
}

document.getElementById("backButton").addEventListener('click', () => {
    window.location.href = "index.html";
});