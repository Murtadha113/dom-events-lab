/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/

let input = '';        
let operator = '';        
let prevInput = '';       

/*------------------------ Cached Element References ------------------------*/

const display = document.querySelector('.display');       
const calculator = document.querySelector('#calculator'); 

/*----------------------------- Event Listeners -----------------------------*/

calculator.addEventListener('click', handleButtonClick);

/*-------------------------------- Functions --------------------------------*/

function handleButtonClick(event) {
  const buttonValue = event.target.innerText;
  if (event.target.classList.contains('number')) {
    input += buttonValue;
  } else if (event.target.classList.contains('operator')) {
    if (buttonValue === 'C') clearCalculator();
    else if (input) store(buttonValue);
  } else if (event.target.classList.contains('equals')) {
    Operation();
  }
  updateDisplay();
}


function clearCalculator() {
  input = '';
  operator = '';
  prevInput = '';
  display.innerText = '0';
}

function Operation() {
  if (!input || !prevInput) {
    display.innerText = 'Error';
    return;
  }

  const num1 = parseFloat(prevInput);
  const num2 = parseFloat(input);
  let result;

  if (operator === '+') {
    result = num1 + num2;
  } else if (operator === '-') {
    result = num1 - num2;
  } else if (operator === '*') {
    result = num1 * num2;
  } else if (operator === '/') {
    if (num2 !== 0) {
      result = num1 / num2;
    } else {
      display.innerText = 'Error';
      return;
    }
  } else {
    return;
  }

  display.innerText = result;
  prevInput = result.toString();
  input = '';
  operator = '';
}


function store(buttonValue) {
  if (prevInput && input) Operation();
  prevInput = input;
  operator = buttonValue;
  input = '';
}


function updateDisplay() {
  display.innerText = prevInput + (operator ? ` ${operator} ` : '') + input || '0';
}

display.innerText = '0';
