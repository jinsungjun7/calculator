function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1*n2;
}

function divide(n1, n2) {
    return (n1/n2);
}

function mod(n1, n2) {
    return n1%n2;
}

function operate(operator, n1, n2) {
    switch (operator) {
        case '+':
            return add(n1, n2);
            break;
        case '-':
            return subtract(n1, n2);
            break;
        case '*':
        case 'x':
            return multiply(n1, n2);
            break;
        case '/':
            return divide(n1, n2);
            break;
        case '%':
            return mod(n1, n2);
            break;
        default:
            break;

    }
}

function addDigit(digit) {
    if (isNewNum && !isEqualed) {
        botScreen.textContent = '';
        isNewNum = false;
    } else if (digit == '.' && botScreen.textContent.search(/[.]/) >= 0) { //checks if there is a period, special syntax for that; can't just use '.'
        console.log(botScreen.textContent.search('.'));
        return;
    } else if (isEqualed) {
        allClear();
    }

    botScreen.textContent += `${digit}`;
}

function addFunction(func) {
    if (!isValid(func)) {
        allClear();
        return;
    }

    isNewNum = true; //for use when entering digits

    if (func == '=' && isEqualed == false) {
        if (operator == '/' && Number(botScreen.textContent) === 0) {
            alert("You can't divide my zero! Please enter a new value.");
            return;
        }
        if (operator == "") {
            runningNum = Number(botScreen.textContent);
            topScreen.textContent += ` ${botScreen.textContent} ${func}`;
        } else {
            topScreen.textContent += ` ${botScreen.textContent} ${func}`;
            runningNum = operate(operator, runningNum, Number(botScreen.textContent));
        }
        botScreen.textContent = round3Dec(runningNum);     
        isEqualed = true;   
        return;

    } else if (func == '=' && isEqualed == true) {
        return;
    } 

    if (isEqualed) {
        topScreen.textContent = `${runningNum} ${func}`;
        isEqualed = false;
        operator = func;
        return;
    }

    if (topScreen.textContent.length === 0) {
        operator = func;
        runningNum = Number(botScreen.textContent);
        topScreen.textContent = `${botScreen.textContent} ${operator}`;        
    } else {
        runningNum = operate(operator, runningNum, Number(botScreen.textContent));
        topScreen.textContent += ` ${botScreen.textContent} ${func}`;
        botScreen.textContent = round3Dec(runningNum);
        operator = func;

    }
}

function keyInput(e) {
    if (e.keyCode == 16) {
        shiftKey = true;
    }

    if (!shiftKey && (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode == 190 || e.keyCode == 110)) {
        addDigit(e.key);
        shiftKey = false;
    } else if (e.key == '+' || e.key == '-' || e.key == '=' || e.key == '/' || e.key == '%' || e.key == '*' || e.key == 'Enter') {
        if (e.key == 'Enter') {
            addFunction('=');
        } else {
            addFunction(e.key);
        }
        shiftKey = false; 
    } else if (e.key == 'Backspace') {
        backspace();
    } else {
        return;
    }
}

function allClear() {
    topScreen.textContent = '';
    botScreen.textContent = '';
    isNewNum = false;
    runningNum = 0;
    operator = '';
    isEqualed = false;
}

function isValid(func) {
    if (topScreen.textContent.length === 0 && botScreen.textContent.length === 0) {
        alert("Please enter a value first.")
        return false;
    }

    return true;
}

function round3Dec(value) {
    return Math.round(1000*(value))/1000;
}

function backspace() {
    if (!isEqualed && !isNewNum) {
        botScreen.textContent = botScreen.textContent.substring(0,botScreen.textContent.length-1);
    } else {
        return;
    }
}


const topScreen = document.querySelector('.topScreen');
const botScreen = document.querySelector('.botScreen');
let isNewNum = false;
let operator = '';
let runningNum = 0;
let isEqualed = false;
let shiftKey = false;
let readyEqual = false;

const digits = document.querySelectorAll('.btn.digit');
digits.forEach(digit => digit.addEventListener('click', (e) => {
    addDigit(digit.value);
    readyEqual = true;

}));

const functions = document.querySelectorAll('.btn.function');
functions.forEach(func => func.addEventListener('click', (e) => {
    addFunction(func.value);
    readyEqual = false;

}));

const AC = document.querySelector('.btn.AC');
AC.addEventListener('click', (e) => {
    allClear();
});

const C = document.querySelector('.btn.C');
C.addEventListener('click', (e) => {
    backspace();
})

window.addEventListener('keydown', keyInput);