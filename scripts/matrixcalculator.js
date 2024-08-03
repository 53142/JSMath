let rowsA = document.getElementById('rowsValueA');
let columnsA = document.getElementById('columnsValueA');

let rowsB = document.getElementById('rowsValueB');
let columnsB = document.getElementById('columnsValueB');

let matrixA = document.getElementById('matrixA');
let matrixB = document.getElementById('matrixB');


function updateRowsColumns(table, rows, columns) {
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