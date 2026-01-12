// Calculator State
const calculator = {
    currentOperand: '0',
    previousOperand: '',
    operation: undefined,
    resetScreen: false,
    darkMode: false
};

// DOM Elements
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const actionButtons = document.querySelectorAll('[data-action]');
const equalsButton = document.querySelector('[data-action="equals"]');
const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const decimalButton = document.querySelector('[data-action="decimal"]');
const percentageButton = document.querySelector('[data-action="percentage"]');
const themeSwitch = document.getElementById('theme-switch');
const themeIcon = themeSwitch.querySelector('i');


function initCalculator() {
    updateDisplay();
    setupEventListeners();
    setupKeyboardSupport();
    loadThemePreference();
}


function updateDisplay() {
    currentOperandElement.textContent = formatDisplayNumber(calculator.currentOperand);
    
    if (calculator.operation != null) {
        previousOperandElement.textContent = 
            `${formatDisplayNumber(calculator.previousOperand)} ${calculator.operation}`;
    } else {
        previousOperandElement.textContent = calculator.previousOperand;
    }
}


function formatDisplayNumber(number) {
    const stringNumber = number.toString();

    if (stringNumber === 'Error') return 'Error';
    

    const [integerPart, decimalPart] = stringNumber.split('.');
    

    let formattedInteger = '';
    if (integerPart) {
        formattedInteger = parseFloat(integerPart).toLocaleString('en-US', {
            maximumFractionDigits: 0
        });
    }
   
    if (decimalPart != null) {
   
        const limitedDecimal = decimalPart.length > 8 ? decimalPart.substring(0, 8) : decimalPart;
        return `${formattedInteger}.${limitedDecimal}`;
    }
    
    return formattedInteger;
}


function appendNumber(number) {
    
    if (calculator.resetScreen) {
        calculator.currentOperand = number;
        calculator.resetScreen = false;
    } else {
       
        if (number === '0' && calculator.currentOperand === '0') return;
        
        
        if (calculator.currentOperand === '0' && number !== '.') {
            calculator.currentOperand = number;
        } else {
           
            if (calculator.currentOperand.length >= 15) return;
            calculator.currentOperand += number;
        }
    }
    
    updateDisplay();
}


function chooseOperation(operation) {
    
    if (calculator.currentOperand === '') return;
    
   
    if (calculator.previousOperand !== '' && calculator.operation && !calculator.resetScreen) {
        compute();
    }
    
    calculator.operation = operation;
    calculator.previousOperand = calculator.currentOperand;
    calculator.resetScreen = true;
    
    updateDisplay();
}


function compute() {
    let computation;
    const prev = parseFloat(calculator.previousOperand);
    const current = parseFloat(calculator.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;
    

    switch (calculator.operation) {
        case '+':
            computation = prev + current;
            break;
        case '−':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
        
            if (current === 0) {
                calculator.currentOperand = 'Error';
                calculator.previousOperand = '';
                calculator.operation = undefined;
                updateDisplay();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    

    computation = Math.round(computation * 100000000) / 100000000;
    
    calculator.currentOperand = computation.toString();
    calculator.operation = undefined;
    calculator.previousOperand = '';
    calculator.resetScreen = true;
    
    updateDisplay();
}


function clearCalculator() {
    calculator.currentOperand = '0';
    calculator.previousOperand = '';
    calculator.operation = undefined;
    calculator.resetScreen = false;
    
    updateDisplay();
}


function deleteLast() {
    
    if (calculator.resetScreen || calculator.currentOperand === 'Error') {
        clearCalculator();
        return;
    }
    
  
    if (calculator.currentOperand.length > 1) {
        calculator.currentOperand = calculator.currentOperand.slice(0, -1);
    } else {
        calculator.currentOperand = '0';
    }
    
    updateDisplay();
}

function addDecimal() {

    if (calculator.resetScreen) {
        calculator.currentOperand = '0.';
        calculator.resetScreen = false;
        updateDisplay();
        return;
    }
    
  
    if (calculator.currentOperand.includes('.')) return;
    
    // Prevent overflow
    if (calculator.currentOperand.length >= 15) return;
    
    calculator.currentOperand += '.';
    updateDisplay();
}


function calculatePercentage() {
    const current = parseFloat(calculator.currentOperand);
    
    if (isNaN(current)) return;
    
    calculator.currentOperand = (current / 100).toString();
    updateDisplay();
}


function toggleDarkMode() {
    calculator.darkMode = !calculator.darkMode;
    
    if (calculator.darkMode) {
        document.body.classList.add('dark-mode');
        themeIcon.className = 'fas fa-sun';
        themeSwitch.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        localStorage.setItem('calculatorDarkMode', 'true');
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.className = 'fas fa-moon';
        themeSwitch.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        localStorage.setItem('calculatorDarkMode', 'false');
    }
}


function loadThemePreference() {
    const darkModePreference = localStorage.getItem('calculatorDarkMode');
    
    if (darkModePreference === 'true') {
        calculator.darkMode = true;
        document.body.classList.add('dark-mode');
        themeIcon.className = 'fas fa-sun';
        themeSwitch.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }
}


function animateButton(button) {
    button.classList.add('pressed');
    setTimeout(() => {
        button.classList.remove('pressed');
    }, 100);
}

// Setup event listeners for buttons
function setupEventListeners() {
   
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            animateButton(button);
            appendNumber(button.getAttribute('data-number'));
        });
    });
    
    // Operation buttons
    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            animateButton(button);
            chooseOperation(button.getAttribute('data-operation'));
        });
    });
    

    equalsButton.addEventListener('click', () => {
        animateButton(equalsButton);
        compute();
    });
    
    
    clearButton.addEventListener('click', () => {
        animateButton(clearButton);
        clearCalculator();
    });
    
 
    deleteButton.addEventListener('click', () => {
        animateButton(deleteButton);
        deleteLast();
    });
    
   
    decimalButton.addEventListener('click', () => {
        animateButton(decimalButton);
        addDecimal();
    });
  
    percentageButton.addEventListener('click', () => {
        animateButton(percentageButton);
        calculatePercentage();
    });
    
   
    themeSwitch.addEventListener('click', () => {
        animateButton(themeSwitch);
        toggleDarkMode();
    });
}


function setupKeyboardSupport() {
    document.addEventListener('keydown', event => {
     
        if (/[\d+\-*/.=]|Enter|Escape|Backspace|Delete/.test(event.key)) {
            event.preventDefault();
        }
        
     
        let buttonToAnimate = null;
        
      
        switch (event.key) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                buttonToAnimate = document.querySelector(`[data-number="${event.key}"]`);
                appendNumber(event.key);
                break;
                
            case '+':
                buttonToAnimate = document.querySelector('[data-operation="+"]');
                chooseOperation('+');
                break;
                
            case '-':
                buttonToAnimate = document.querySelector('[data-operation="−"]');
                chooseOperation('−');
                break;
                
            case '*':
                buttonToAnimate = document.querySelector('[data-operation="×"]');
                chooseOperation('×');
                break;
                
            case '/':
                buttonToAnimate = document.querySelector('[data-operation="÷"]');
                chooseOperation('÷');
                break;
                
            case '.':
            case ',':
                buttonToAnimate = decimalButton;
                addDecimal();
                break;
                
            case '=':
            case 'Enter':
                buttonToAnimate = equalsButton;
                compute();
                break;
                
            case 'Escape':
            case 'Delete':
                buttonToAnimate = clearButton;
                clearCalculator();
                break;
                
            case 'Backspace':
                buttonToAnimate = deleteButton;
                deleteLast();
                break;
                
            case '%':
                buttonToAnimate = percentageButton;
                calculatePercentage();
                break;
        }
        
        
        if (buttonToAnimate) {
            animateButton(buttonToAnimate);
        }
    });
}

document.addEventListener('DOMContentLoaded', initCalculator);