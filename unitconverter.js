let types = document.getElementById('types');
let from = document.getElementById('from');
let to = document.getElementById('to');
let convertUnits = document.getElementById('convert');

const values = {
    'distance': ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mi'],
    'mass': ['mg', 'g', 'kg', 'oz', 'lb', 'ton'],
    'time': ['s', 'min', 'hr', 'day', 'week', 'month', 'year'],
}

getValues();

types.addEventListener('change', (event) => getValues());
convertUnits.addEventListener('click', (event) => convert());

function getValues() {
    let value = types.value;

    // Clear the existing options
    from.innerHTML = '';
    to.innerHTML = '';
    // Add the new options
    addValues(value);
}

function addValues(value) {
    console.log("value: ", value);
    for (let i = 0; i < values[value].length; i++) {
        let option = document.createElement('option');
        option.value = values[value][i];
        option.innerHTML = values[value][i];
        from.appendChild(option);
    }
    for (let i = 0; i < values[value].length; i++) {
        let option = document.createElement('option');
        option.value = values[value][i];
        option.innerHTML = values[value][i];
        to.appendChild(option);
    }
}

function convert() {
    alert();
}