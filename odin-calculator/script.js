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
// not working correctly, num1,num2, operatorCurrent is not updated 
function clear() {
    console.log("del last char");
    let str = displayLine2.innerText;
    displayValue = displayValue.slice(0, displayValue.length - 1);
    updateDisplay(displayValue);
}

function allClear() {
    console.log("all clear display");
    displayValue = ""
    updateDisplay(displayValue);
    num1 = null;
    num2 = null;
    operatorCurrent = undefined;
}

function concat(a, b) {
    if (a == null) {
        return b
    } else {
        return a.toString() + b.toString();
    }


}

function isLastCharOperation() {
    // console.log("isLastCharOperation: ", displayValue);
    let lastChar = displayValue.charAt(displayValue.length - 1);
    if (lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/") {
        return true;
    }
}

function containDecimal() {
    // console.log("does number already contains a decimal ?");
    if (num1 && operatorCurrent) {
        console.log("-->", num1, operatorCurrent)
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
    } else if (isLastCharOperation()) {
        displayValue += str;
    } else if (operatorCurrent) {
        displayValue += str;
        let reducedStr = displayValue.replace(num1, "").replace(operatorCurrent, "");
        num2 += reducedStr;
    } else {
        displayValue += str;
    }
    updateDisplay(displayValue);

    console.log(`num1: ${num1}, num2: ${num2}, oper: ${operatorCurrent}`)
    console.log("displayValue:", displayValue);
}

function pressedOperation(oper) {
    if (!isLastCharOperation()) {
        if (!num1) {
            // console.log("num1 == null")
            num1 = displayValue;
            operatorCurrent = oper;
            displayValue += oper;
            updateDisplay(displayValue);
        } else {
            pressedEqual();
            operatorCurrent = oper;
            displayValue += oper;
            updateDisplay(displayValue);
        }
    } else {
        console.log("do nothing");
    }
}

function pressedDecimal(str) {
    if (containDecimal()) {
        console.log("decimal point already exist...");
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

function pressedEqual() {
    console.log("pressedEqual()")
    if (num1 && operatorCurrent && num2) {
        displayValue = calculate(operatorCurrent, parseFloat(num1), parseFloat(num2)).toFixed(2).toString();
        num1 = displayValue;
        num2 = "";
        operatorCurrent = undefined;
        updateDisplay(displayValue);
    }

}

function updateDisplay(str) {
    // displayLine1.innerText = displayLine2.innerText;
    displayLine2.innerText = str;
}


function changePolarity() {
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

const displayLine1 = document.querySelector("#line1");
const displayLine2 = document.querySelector("#line2");
let displayValue = displayLine2.innerText;
let num1 = "";
let num2 = "";
let numTemp = "";
let operatorCurrent;

document.querySelector(".buttons").addEventListener("click", onClick);

// console.log("add 2+4=6,", operate("add", 2, 4));
// console.log("subtract 7-9=-2,", operate("subtract", 7, 9));
// console.log("multiply 3*4=12,", operate("multiply", 3, 4));
// console.log("divide 8/2=4,", operate("divide", 8, 2));