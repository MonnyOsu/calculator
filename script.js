let operand1 = '';
let operand2 = '';
let currentOperator = null;
let newEquation = true;

// create variables for interface
const numbersButton = document.querySelectorAll('[data-number]');
const operatorsButton = document.querySelectorAll('[data-operator]');
const decimalButton = document.getElementById('decimal');
const equalButton = document.getElementById('equalBtn');
const clearButton = document.getElementById('clearBtn');
const deleteButton = document.getElementById('deleteBtn');
const secondaryDisplay = document.getElementById('display-secondary')
const primaryDisplay = document.getElementById('display-primary')

// add event listeners to buttons

numbersButton.forEach((button) => {
    button.addEventListener('click', () => appendNumber(button.textContent))
});
operatorsButton.forEach((button) => {
    button.addEventListener('click', () => appendOperator(button.textContent))
});
decimalButton.addEventListener('click', () => appendDecimal())
equalButton.addEventListener('click', () => equate());
deleteButton.addEventListener('click', () => deleteFunction());
clearButton.addEventListener('click', () => clearFunction());

// Keyboard functionality

window.addEventListener('keydown', (e) => {
    console.log(e.keyCode)
    if (e.keyCode === 48 || e.keyCode === 96) appendNumber('0');
    if (e.keyCode === 49 || e.keyCode === 97) appendNumber('1');
    if (e.keyCode === 50 || e.keyCode === 98) appendNumber('2');
    if (e.keyCode === 51 || e.keyCode === 99) appendNumber('3');
    if (e.keyCode === 52 || e.keyCode === 100) appendNumber('4');
    if (e.keyCode === 53 || e.keyCode === 101) appendNumber('5');
    if (e.keyCode === 54 || e.keyCode === 102) appendNumber('6');
    if (e.keyCode === 55 || e.keyCode === 103) appendNumber('7');
    if (e.keyCode === 56 || e.keyCode === 104) appendNumber('8');
    if (e.keyCode === 57 || e.keyCode === 105) appendNumber('9');
    if (e.keyCode === 190 || e.keyCode === 110) appendDecimal();
    if (e.keyCode === 8) deleteFunction();
    if (e.keyCode === 27) clearFunction();
    if (e.keyCode === 107) appendOperator('+');
    if (e.keyCode === 109 || e.keyCode === 189) appendOperator('-');
    if (e.keyCode === 106 || e.keyCode === 88) appendOperator('x');
    if (e.keyCode === 111 || e.keyCode === 191) appendOperator('÷');
    if (e.keyCode === 13 || e.keyCode === 187) equate();
})


// function to append number so more than one number can be input at a time

function appendNumber(num) {
    if (newEquation) {
        primaryDisplay.textContent = num;
        newEquation = false;
    } else {
        primaryDisplay.textContent += num;
    }
}

function appendDecimal() {
    if (primaryDisplay.textContent === '') {
        primaryDisplay.textContent = '0';
    }
    if (primaryDisplay.textContent.includes('.')) return;
    primaryDisplay.textContent += '.';
    newEquation = false;
}

function appendOperator(operator) {
    if (primaryDisplay.textContent === '') return;
    if (newEquation === true) return;
    if (currentOperator === null) {
        operand1 = primaryDisplay.textContent;
        currentOperator = operator;
        secondaryDisplay.textContent = `${operand1} ${currentOperator}`;
        primaryDisplay.textContent = '';
    } else {
        operand2 = primaryDisplay.textContent;
        operand1 = round(operate(currentOperator, operand1, operand2));
        primaryDisplay.textContent = operand1;
        secondaryDisplay.textContent = `${operand1} ${operator}`;
        currentOperator = operator;
        newEquation = true;
    }
}

// Delete function

function deleteFunction() {
    primaryDisplay.textContent = primaryDisplay.textContent
        .toString()
        .slice(0, -1);
}

// Clear function

function clearFunction() {
    operand1 = '';
    operand2 = '';
    currentOperator = null;
    primaryDisplay.textContent = '';
    secondaryDisplay.textContent = '';
    newEquation = true;
}

// round function
function round(number) {
    return parseFloat(number.toFixed(3));
}

// Equals function
function equate() {
    if (currentOperator === null) return;
    if (currentOperator === '÷' && primaryDisplay.textContent === '0') {
        alert('Error! You can\'t divide by 0.')
        return
    }
    operand2 = primaryDisplay.textContent;
    secondaryDisplay.textContent = `${operand1} ${currentOperator} ${operand2} =`;
    primaryDisplay.textContent = round(operate(currentOperator, operand1, operand2));
    newEquation = true;
    currentOperator = null;
}



// Calculator functions
// sum
function sum(a, b) {
    return a + b;
}

// subtract
function subtract(a, b) {
    return a - b;
}

// multiply
function multiply(a, b) {
    return a * b;
}

// divide
function divide(a, b) {
    return a / b;
}

// operate
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return sum(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case 'x':
            return multiply(a, b);
            break;
        case '÷':
            return divide(a, b);
            break;
    }
}

// BUGS that need fixing: keyboard functionality
