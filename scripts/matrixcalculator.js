let rowsA = document.getElementById('rowsValueA');
let columnsA = document.getElementById('columnsValueA');

let rowsB = document.getElementById('rowsValueB');
let columnsB = document.getElementById('columnsValueB');

let matrixA = document.getElementById('matrixA');
let matrixB = document.getElementById('matrixB');

let addButton = document.getElementById('addButton');
let subtractButton = document.getElementById('subtractButton');


let matrixAValue = [];

let matrixBValue = [];

function updateRowsColumns(table, rows, columns) {
    // Reset matrix values in UI
    table.innerHTML = '';
    
    for (let i = 0; i < rows; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < columns; j++) {
            let column = document.createElement('td');
            let input = document.createElement('input');
            input.setAttribute('type', 'number');
            input.setAttribute('value', 1);
            column.appendChild(input);
            row.appendChild(column);
        }
        table.appendChild(row);
    }
}

function updateMatrixAValue() {
    for (let i = 0; i < rowsA.value; i++) {
        matrixAValue[i] = [];
        for (let j = 0; j < columnsA.value; j++) {
            matrixAValue[i][j] = parseInt(matrixA.rows[i].cells[j].children[0].value);
        }
    }
}

function updateMatrixBValue() {
    for (let i = 0; i < rowsB.value; i++) {
        matrixBValue[i] = [];
        for (let j = 0; j < columnsB.value; j++) {
            matrixBValue[i][j] = parseInt(matrixB.rows[i].cells[j].children[0].value);
        }
    }
}

rowsA.addEventListener('change', function() {
    updateRowsColumns(matrixA, rowsA.value, columnsA.value);
});

columnsA.addEventListener('change', function() {
    updateRowsColumns(matrixA, rowsA.value, columnsA.value);
});


rowsB.addEventListener('change', function() {
    updateRowsColumns(matrixB, rowsB.value, columnsB.value);
});

columnsB.addEventListener('change', function() {
    updateRowsColumns(matrixB, rowsB.value, columnsB.value);
});



addButton.addEventListener('click', function() {
    updateMatrixAValue();
    updateMatrixBValue();
    
    let matrixC = document.getElementById('matrixC');

    // Make sure matrices have the same dimensions
    if (rowsA.value != rowsB.value || columnsA.value != columnsB.value) {
        alert('Matrices must have the same dimensions');
        return;
    }

    let rowsC = rowsA.value;
    let columnsC = columnsA.value;
    matrixC.innerHTML = '';
    for (let i = 0; i < rowsC; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < columnsC; j++) {
            let column = document.createElement('td');
            let input = document.createElement('input');
            input.setAttribute('type', 'number');
            let value = matrixAValue[i][j] + matrixBValue[i][j];
            input.setAttribute('value', value);
            column.appendChild(input);
            row.appendChild(column);
        }
        matrixC.appendChild(row);
    }
});

subtractButton.addEventListener('click', function() {
    updateMatrixAValue();
    updateMatrixBValue();
    
    let matrixC = document.getElementById('matrixC');

    // Make sure matrices have the same dimensions
    if (rowsA.value != rowsB.value || columnsA.value != columnsB.value) {
        alert('Matrices must have the same dimensions');
        return;
    }

    let rowsC = rowsA.value;
    let columnsC = columnsA.value;
    matrixC.innerHTML = '';
    for (let i = 0; i < rowsC; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < columnsC; j++) {
            let column = document.createElement('td');
            let input = document.createElement('input');
            input.setAttribute('type', 'number');
            let value = matrixAValue[i][j] - matrixBValue[i][j];
            input.setAttribute('value', value);
            column.appendChild(input);
            row.appendChild(column);
        }
        matrixC.appendChild(row);
    }
});