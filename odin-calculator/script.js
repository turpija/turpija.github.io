function calculate(operator, num1, num2) {
    console.log("calculate->",typeof operator, typeof num1, typeof num2);
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

function concat(a,b){
    if (a == null) {
        return b
    } else {
        return a.toString()+b.toString();
    }
    

}

//updates displayValue varibale and display
function updateValue(num) {

    if (!operatorCurrent) {
        num1 = concat(num1, num);
        displayValue = num1;
    } else {
        num2 = concat(num2, num);
        displayValue = num1 + operatorCurrent + num2
    }
    console.log(`num1: ${num1}, num2: ${num2}, oper: ${operatorCurrent}`)
    console.log("displayValue:", displayValue);
    updateDisplay(displayValue);
}

function storeOperator(oper) {
    displayValue = displayLine2.innerText;
    // store num1
    // if !operator, store operator
    let lastChar = displayValue.charAt(displayValue.length - 1);
    console.log("lastChar", lastChar)
    if (!lastChar) {
        console.log("not adding", oper);
    } else if (lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/" || lastChar == ".") {
        // console.log("change oper,lastChar",lastChar);
        // console.log(displayValue.charAt(displayValue.length-1),">>", oper);
        clear()
        displayValue += oper;
        updateDisplay(displayValue);
    } else {
        // console.log("zadnji znak nije operator", lastChar);
        if (!operatorCurrent) {
            // console.log("!operatorCurrent");
            operatorCurrent = oper;
            displayValue += oper;
            updateDisplay(displayValue);
            // updateValue(oper);
        } else {
            // console.log("operatorCurrent ... else");
            // console.log(displayValue.split(operatorCurrent));
            // console.log(`num1: ${num1}, num2: ${num2}, oper: ${operatorCurrent}`)
            let result = calculate(operatorCurrent, parseInt(num1), parseInt(num2));
            // console.log("res",result);
            num1 = result;
            num2 = null;
            operatorCurrent = oper;
            displayValue = result + oper;
            updateDisplay(displayValue);
        }
    }
    // if operator, store num2, calculate, set num1 to res, store new operator

}

function updateDisplay(str) {
    // displayLine1.innerText = displayLine2.innerText;
    displayLine2.innerText = str;
}



function changePolarity() {
    console.log("need to implement");
}


function onClick(e) {
    console.log("pressed: ",e.target.innerText);

    switch (e.target.innerText) {
        case "1":
            updateValue(1);
            break;
        case "2":
            updateValue(2);
            break;
        case "3":
            updateValue(3);
            break;
        case "4":
            updateValue(4);
            break;
        case "5":
            updateValue(5);
            break;
        case "6":
            updateValue(6);
            break;
        case "7":
            updateValue(7);
            break;
        case "8":
            updateValue(8);
            break;
        case "9":
            updateValue(9);
            break;
        case "0":
            updateValue(0);
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
let displayValue = displayLine2.innerText;
let num1 = null;
let num2 = null;
let operatorCurrent;

document.querySelector(".buttons").addEventListener("click", onClick);

// console.log("add 2+4=6,", operate("add", 2, 4));
// console.log("subtract 7-9=-2,", operate("subtract", 7, 9));
// console.log("multiply 3*4=12,", operate("multiply", 3, 4));
// console.log("divide 8/2=4,", operate("divide", 8, 2));