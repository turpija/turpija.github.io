const displayLine1 = document.querySelector("#line1");
const displayLine2 = document.querySelector("#line2");
let displayHistory = displayLine1.innerText = "";
let displayValue = displayLine2.innerText = "0";
let num1 = "";
let num2 = "";
let numTemp = "";
let operatorCurrent;

const allButtons = document.querySelectorAll("button");
allButtons.forEach(btn => {
    btn.addEventListener("click", onClick);
})

window.addEventListener("keydown", onClick);

//perform calculation
function calculate(operator, num1, num2) {
    // console.log("calculate->", typeof operator, typeof num1, typeof num2);
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        default:
            console.log("invalid operator");
            break;
    }
}


// clear last typed character
function clear() {
    console.log("del last char");
    let str = displayLine2.innerText;
    displayValue = displayValue.slice(0, displayValue.length - 1);
    updateDisplay(displayValue);
}

//clear display and all variables
function allClear() {
    console.log("all clear display");
    displayValue = "0"
    updateDisplay(displayValue);
    updateDisplayHistory("");
    num1 = null;
    num2 = null;
    operatorCurrent = undefined;
}

//is last character operation
function isLastCharOperation() {
    // console.log("isLastCharOperation: ", displayValue);
    let lastChar = displayValue.charAt(displayValue.length - 1);
    if (lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/") {
        return true;
    }
}

function isLastCharNum() {
    let lastChar = displayValue.charAt(displayValue.length - 1);
    if (typeof (lastChar) === "string") {
        return true;
    }
}

function isLastCharMinus() {
    let lastChar = displayValue.charAt(displayValue.length - 1);
    if (lastChar == "-") {
        return true;
    }
}

//if there is decimal point on display
function containDecimal() {
    // console.log("does number already contains a decimal ?");
    if (num1 && operatorCurrent) {
        // console.log("-->", num1, operatorCurrent)
        let str = displayValue.replace(num1, "");
        if (str.includes(".")) {
            // console.log("already a decimal in second number, return true");
            return true;
        }
    } else {
        if (displayValue.includes(".")) {
            // console.log("already a decimal in first number, return true");
            return true;
        }
    }
}

//updates displayValue varibale and display
function pressedNumber(str) {
    // console.log("displayValue",displayValue)
    if (displayValue == "0") {
        displayValue = str;
    } else if (isLastCharOperation() && operatorCurrent) {
        displayValue += str;
    } else if (num1) {
        displayValue += str;
    } else {
        displayValue += str;
    }
    updateDisplay(displayValue);

    // console.log(`num1: ${num1}, num2: ${num2}, oper: ${operatorCurrent}`)
    // console.log("displayValue:", displayValue);
}

//  toggle value +/- of num2value and update display
function toggleValueOfNum2() {
    // displayValue ... +/- num2
    let num2value = displayValue.replace(num1, "").replace(operatorCurrent, "");
    toggledNum2 = (num2value * -1).toString();
    //remove from display
    //add new in display
    displayValue = displayValue.slice(0, displayValue.length - num2value.length) + toggledNum2;
    updateDisplay(displayValue);
}

function setNum2() {
    let reducedStr = displayValue.replace(num1, "").replace(operatorCurrent, "");
    if (!num2) {
        num2 = reducedStr;
    } else {
        num2 += reducedStr;
    }
}

// some operation pressed 
function pressedOperation(oper) {
    if (!isLastCharOperation()) {
        if (!num1) {
            // console.log("num1 == null")
            num1 = displayValue;
            operatorCurrent = oper;
            displayValue += oper;
            updateDisplay(displayValue);
        } else if (!operatorCurrent) {
            operatorCurrent = oper;
            displayValue += oper;
            updateDisplay(displayValue);
        } else {
            setNum2();
            pressedEqual();
            operatorCurrent = oper;
            displayValue += oper;
            updateDisplay(displayValue);
        }
    }
}

// decimal point pressed
function pressedDecimal(str) {
    if (containDecimal()) {
        // console.log("decimal point already exist...");
    } else {
        if (displayValue == 0) {
            displayValue += str;
        } else if (isLastCharOperation())
            displayValue += "0.";
        else {
            displayValue += str;
        }
        updateDisplay(displayValue);
    }
}

// equal button pressed
function pressedEqual() {
    // console.log("pressedEqual()")
    if (!num2) {
        setNum2();
    }
    updateDisplayHistory(displayValue);
    result = calculate(operatorCurrent, parseFloat(num1), parseFloat(num2)).toFixed(2);
    result *= 1;
    displayValue = result.toString();
    num1 = displayValue;
    num2 = "";
    operatorCurrent = undefined;
    updateDisplay(displayValue);
}

// update Displays
function updateDisplay(str) {
    displayLine2.innerText = str;
}

function updateDisplayHistory(str) {
    displayLine1.innerText = str;
}

// negative/postive button pressed
function pressedPolarity() {
    // if 0 -> zamjeni s -
    // if number -> *-1
    // if operation -> dodaj predznak
    // if operation - -> makni predznak
    // if number+operation+number -> num2*-1

    if (displayValue === "0") {
        displayValue = "-";
    } else if (num1 && operatorCurrent && isLastCharNum()) {
        console.log("num1 && oper && lastCharNum");
        toggleValueOfNum2();
    } else if (isLastCharNum()) {
        console.log("last char is num");
        displayValue = (displayValue * -1).toString();
    } else if (isLastCharOperation()) {
        console.log("last char is operation");
        displayValue += "-";
    } else if (isLastCharMinus()) {
        console.log("last char is -");
        clear();
    }

    updateDisplay(displayValue);
    console.log("need to implement");
}

//buton is pressed
function onClick(e) {
    let value;
    if (e instanceof KeyboardEvent) {
        value = e.key;
    } else if (e instanceof PointerEvent) {
        value = e.target.innerText;
    }

    console.log("pressed:", value);

    switch (value) {
        case "1":
            pressedNumber("1");
            break;
        case "2":
            pressedNumber("2");
            break;
        case "3":
            pressedNumber("3");
            break;
        case "4":
            pressedNumber("4");
            break;
        case "5":
            pressedNumber("5");
            break;
        case "6":
            pressedNumber("6");
            break;
        case "7":
            pressedNumber("7");
            break;
        case "8":
            pressedNumber("8");
            break;
        case "9":
            pressedNumber("9");
            break;
        case "0":
            pressedNumber("0");
            break;
        case "+":
            pressedOperation("+");
            break;
        case "-":
            pressedOperation("-");
            break;
        case "*":
            pressedOperation("*");
            break;
        case "/":
            pressedOperation("/");
            break;
        case ".":
        case ",":
            pressedDecimal(".");
            break;
        case "C":
            clear();
            break;
        case "AC":
            allClear();
            break;
        case "+/-":
            pressedPolarity();
            break;
        case "=":
        case "Enter":
            pressedEqual();
            break;

        default:
            break;
    }
}