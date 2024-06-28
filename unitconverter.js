let types = document.getElementById('types');

let fromLabel = document.getElementById('from');
let toLabel = document.getElementById('to');

let fromValue = document.getElementById('fromValue');
let toValue = document.getElementById('toValue');

let convertUnits = document.getElementById('convert');



const values = {
    'distance': [['mm', .001], ['cm', .01], ['m', 1], ['km', 1000], ['in', .0254], ['ft', 0.3048], ['yd', 0.9144], ['mi', 1609.344]],
    'mass': [['mg', 0.000001], ['g', .001], ['kg', 1], ['oz', 0.0283494925], ['lb', 0.453592909], ['ton', 907.185819]],
    'time': [['s', 1], ['min', 60], ['hr', 3600], ['day', 8640], ['week', 604800], ['month', 2630000], ['year', 31560000]],
}

getValues();

types.addEventListener('change', () => getValues());
convertUnits.addEventListener('click', () => convert());

function getValues() {
    let value = types.value;

    // Clear the existing options
    fromLabel.innerHTML = '';
    toLabel.innerHTML = '';
    // Add the new options
    addValues(value);
}

function addValues(value) {
    console.log("value: ", value);
    for (let i = 0; i < values[value].length; i++) {
        let option = document.createElement('option');
        option.value = values[value][i][0];
        option.innerHTML = values[value][i][0];
        fromLabel.appendChild(option);
    }
    for (let i = 0; i < values[value].length; i++) {
        let option = document.createElement('option');
        option.value = values[value][i][0];
        option.innerHTML = values[value][i][0];
        toLabel.appendChild(option);
    }
}

function convert() {
    console.log("fromValue: ", fromValue.value);

    // Check if the value of from is a number
    if (from.value !== NaN) {
        let from = fromLabel.value;
        let to = toLabel.value;
        let value = fromValue.value;

        let fromIndex = values[types.value].findIndex((element) => element[0] === from);
        let toIndex = values[types.value].findIndex((element) => element[0] === to);

        console.log("fromIndex: ", fromIndex);
        console.log("toIndex: ", toIndex);

        let fromIndexValue = values[types.value][fromIndex][1];
        let toIndexValue = values[types.value][toIndex][1];

        toValue.value = value * fromIndexValue / toIndexValue;

    } else {
        alert("Please enter a valid number to convert")
    }
}