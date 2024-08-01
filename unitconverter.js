"use strict";
let types = document.getElementById('types');

let fromLabel = document.getElementById('from');
let toLabel = document.getElementById('to');

let fromValue = document.getElementById('fromValue');
let toValue = document.getElementById('toValue');

let convertButton = document.getElementById('convert');



const values = {
    'distance': [['mm', .001], ['cm', .01], ['m', 1], ['km', 1000], ['in', .0254], ['ft', 0.3048], ['yd', 0.9144], ['mi', 1609.344], ['ly', 9460730472580.8]],
    'area': [['mm^2', .001], ['cm^2', .01], ['m^2', 1], ['km^2', 1000], ['ha', 10000], ['in^2', .0254], ['ft^2', 0.3048], ['yd^2', 0.9144], ['mi^2', 1609.344]],
    'mass': [['mg', 0.000001], ['g', .001], ['kg', 1], ['oz', 0.0283494925], ['lb', 0.453592909], ['ton', 907.185819]],
    'time': [['s', 1], ['min', 60], ['hr', 3600], ['day', 86400], ['week', 604800], ['month', 2630000], ['year', 31560000]],
    'speed': [['m/s', 1], ['m/h', 1/3600],['km/h', 5/18], ['knot', 900/463], ['ft/s', 0.3048], ['mi/h', 0.44704], ['ly/y', 299792458]]
}

getValues();

types.addEventListener('change', () => getValues());
convertButton.addEventListener('click', () => convert());

fromValue.addEventListener("keydown", function(event) {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
        convert();
    }
});

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
    if (!isNaN(fromValue.value)) {
        let from = fromLabel.value;
        let to = toLabel.value;
        let value = fromValue.value;

        let fromIndex = values[types.value].findIndex((element) => element[0] === from);
        let toIndex = values[types.value].findIndex((element) => element[0] === to);

        console.log("fromIndex: ", fromIndex);
        console.log("toIndex: ", toIndex);

        let fromIndexValue = values[types.value][fromIndex][1];
        let toIndexValue = values[types.value][toIndex][1];

        toValue.value = Math.round(value * fromIndexValue / toIndexValue * 100000) / 100000;

    } else {
        console.log("Invalid input!");
    }
}