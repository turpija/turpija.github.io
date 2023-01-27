const displayLine1 = document.querySelector("#line1");
const displayLine2 = document.querySelector("#line2");
let displayValue = displayLine2.innerText;
let num1 = "";
let num2 = "";
let numTemp = "";
let operatorCurrent;

document.querySelector(".buttons").addEventListener("click", onClick);

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
    displayValue = ""
    updateDisplay(displayValue);
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

// parse display and sets num2 variable
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
    result = calculate(operatorCurrent, parseFloat(num1), parseFloat(num2)).toFixed(2);
    result *= 1;
    displayValue = result.toString();
    num1 = displayValue;
    num2 = "";
    operatorCurrent = undefined;
    updateDisplay(displayValue);
}


function updateDisplay(str) {
    displayLine2.innerText = str;
}

// negative/postive button pressed
function pressedPolarity() {
    console.log("need to implement");
}


function onClick(e) {
    console.log("pressed: ", e.target.innerText);

    switch (e.target.innerText) {
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
            pressedEqual();
            break;

        default:
            break;
    }
}
