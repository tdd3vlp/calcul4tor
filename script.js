'use strict';

// Variables

const buttons = document.querySelector('.keyboard');
const display = document.querySelector('.input-field');
const decimalBtn = document.getElementById('decimal');
const clearEsc = document.getElementById('clear-all');
const clearBtn = document.querySelectorAll('.clear');
const upperField = document.querySelector('.upper-field');

let currentNumber = 0;
let upperCurrentNumber = '';
let newNumber = false;
let pendingOperation = '';

// FUNCTIONS

// Display number

function inputNumber(value) {
  if (newNumber) {
    upperField.value += pendingOperation;
    display.value = value;
    newNumber = false;
  } else {
    if (display.value === '0') {
      display.value = value;
    } else {
      display.value += value;
    }
  }
}

// Display operator

function inputOperation(operation) {
  let localNumber = +display.value;

  if (newNumber && pendingOperation !== '=') {
    upperField.value = currentNumber;
    display.value = operation;
  } else {
    newNumber = true;
    if (pendingOperation === '+') {
      currentNumber += +localNumber;
    } else if (pendingOperation === '-') {
      currentNumber -= +localNumber;
    } else if (pendingOperation === '*') {
      currentNumber *= +localNumber;
    } else if (pendingOperation === '/') {
      currentNumber /= +localNumber;
    } else {
      currentNumber = localNumber;
    }
    if (
      upperField.value.endsWith('+') ||
      upperField.value.endsWith('-') ||
      upperField.value.endsWith('*') ||
      upperField.value.endsWith('/')
    ) {
      upperField.value += localNumber;
      display.value = currentNumber;
      pendingOperation = operation;
    } else {
      upperField.value = currentNumber;
      if (operation === '=') {
        display.value = currentNumber;
        upperField.value = '';
      } else {
        display.value = operation;
      }
      pendingOperation = operation;
    }
  }
}

/*

function inputOperation(operation) {
  let localNumber = +display.value;

  if (newNumber && pendingOperation !== '=') {
    display.value = currentNumber;
  } else {
    newNumber = true;
    if (pendingOperation === '+') {
      currentNumber += +localNumber;
    } else if (pendingOperation === '-') {
      currentNumber -= +localNumber;
    } else if (pendingOperation === '*') {
      currentNumber *= +localNumber;
    } else if (pendingOperation === '/') {
      currentNumber /= +localNumber;
    } else {
      currentNumber = localNumber;
    }

    display.value = currentNumber;
    pendingOperation = operation;
  }
}

*/

// Decimal

function decimal() {
  let localDecimal = display.value;

  if (newNumber) {
    localDecimal = '0.';
    newNumber = false;
  } else {
    if (localDecimal.indexOf('.') === -1) {
      localDecimal += '.';
    }
  }
  display.value = localDecimal;
}

// Clear

function clear(id) {
  if (id === 'clear') {
    display.value = '0';
    upperField.value = '';
    newNumber = true;
  } else if (id === 'clear-all') {
    display.value = '0';
    newNumber = true;
    currentNumber = 0;
    upperField.value = '';
    pendingOperation = '';
  }
}

// EVENTS

buttons.addEventListener('click', function (e) {
  if (e.target.classList.contains('number')) {
    inputNumber(e.target.textContent);
  }
});

document.addEventListener('keydown', function (e) {
  if (isFinite(e.key)) {
    inputNumber(e.key);
  } else if (
    e.key === '*' ||
    e.key === '/' ||
    e.key === '+' ||
    e.key === '-' ||
    e.key === '='
  ) {
    inputOperation(e.key);
  } else if (e.key === '.') {
    decimal();
  } else if (e.key === 'Backspace') {
    clear('clear-all');
  } else if (e.key === 'Enter') {
    e.key === '=';
    inputOperation('=');
  }
});

buttons.addEventListener('click', function (e) {
  if (e.target.classList.contains('operator')) {
    inputOperation(e.target.textContent);
  }
});

buttons.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('clear')) {
    clear(e.srcElement.id);
  }
});

decimalBtn.addEventListener('click', decimal);
