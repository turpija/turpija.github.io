function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "add":
            return add(num1, num2)
        case "subtract":
            return subtract(num1, num2)
        case "multiply":
            return multiply(num1, num2)
        case "divide":
            return divide(num1, num2)
        default:
            console.log("invalid operator");
            break;
    }
}

function clear() {
    console.log("del last char");
    let str = displayLine2.innerText;
    displayLine2.innerText = str.slice(0, str.length - 1);
}

function allClear() {
    console.log("all clear display");
    displayLine2.innerText = "";
    num1 = null;
    num2 = null;
}

function storeNumber(num) {
    displayLine2.innerText += num;
    // console.log(displayLine2.innerText);
}

function storeOperator(oper) {
    let dispStr  = displayLine2.innerText;
    // store num1
    num1 = dispStr;
    // if !operator, store operator
    if (!operatorCurrent) {
        operatorCurrent = oper;
        storeNumber(oper);
    } else {
        console.log(dispStr.split(oper)[1]);
    }
    // if operator, store num2, calculate, set num1 to res, store new operator


}


function storeOperator1(operator) {
    let str = displayLine2.innerText;
    let lastChar = str.charAt(str.length - 1);
    if (!num2) {
        if (lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/" || lastChar == ".") {
            console.log("not adding", operator);
        } else {
            storeNumber(operator);
            operatorCurrent = operator;
            if (!num1) {
                num1 = str;
                console.log("num1:", num1);
            } else {
                num2 = str;
                console.log("num2:", num2);
                console.log("calculate...", num1, num2, operatorCurrent);
                calculate();
            }
        }
    } else {
        console.log("num2 je definiran:", num2)
    }
}

function changePolarity() {
    console.log("need to implement");
}

function calculate() {

}

function onClick(e) {
    // console.log(e.target.innerText);

    switch (e.target.innerText) {
        case "1":
            storeNumber(1);
            break;
        case "2":
            storeNumber(2);
            break;
        case "3":
            storeNumber(3);
            break;
        case "4":
            storeNumber(4);
            break;
        case "5":
            storeNumber(5);
            break;
        case "6":
            storeNumber(6);
            break;
        case "7":
            storeNumber(7);
            break;
        case "8":
            storeNumber(8);
            break;
        case "9":
            storeNumber(9);
            break;
        case "0":
            storeNumber(0);
            break;
        case "+":
            storeOperator("+");
            break;
        case "-":
            storeOperator("-");
            break;
        case "*":
            storeOperator("*");
            break;
        case "/":
            storeOperator("/");
            break;
        case ".":
            storeOperator(".");
            break;
        case "C":
            clear();
            break;
        case "AC":
            allClear();
            break;
        case "+/-":
            changePolarity();
            break;
        case "=":
            calculate();
            break;

        default:
            break;
    }
}

const displayLine1 = document.querySelector("#line1");
const displayLine2 = document.querySelector("#line2");
let displayValue;
let num1 = null;
let num2 = null;
let operatorCurrent;

document.querySelector(".buttons").addEventListener("click", onClick);



// console.log("add 2+4=6,", operate("add", 2, 4));
// console.log("subtract 7-9=-2,", operate("subtract", 7, 9));
// console.log("multiply 3*4=12,", operate("multiply", 3, 4));
// console.log("divide 8/2=4,", operate("divide", 8, 2));