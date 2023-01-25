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

console.log("add 2+4=6,", operate("add", 2, 4));
console.log("subtract 7-9=-2,", operate("subtract", 7, 9));
console.log("multiply 3*4=12,", operate("multiply", 3, 4));
console.log("divide 8/2=4,", operate("divide", 8, 2));